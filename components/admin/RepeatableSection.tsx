'use client';

import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, Check, Sparkles, ListFilter } from 'lucide-react';
import { SectionConfig } from './schema';

interface RepeatableSectionProps {
  config: SectionConfig;
  items: Record<string, unknown>[];
  onChange: (items: Record<string, unknown>[]) => void;
}

export default function RepeatableSection({ config, items, onChange }: RepeatableSectionProps) {
  const [activeTab, setActiveTab] = useState<'add' | 'list'>(items.length === 0 ? 'add' : 'add');
  const [newItem, setNewItem] = useState<Record<string, unknown>>(() => ({
    ...config.emptyItem,
    id: `${config.key}-${Date.now()}`,
  }));
  const [justAdded, setJustAdded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleUpdateNewField = (key: string, value: string) => {
    setNewItem((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    const itemToAdd = {
      ...newItem,
      id: (newItem.id as string) || `${config.key}-${Date.now()}`,
    };
    onChange([itemToAdd, ...items]); // Prepend newly added item so it shows at the top
    
    // Reset form for next entry
    setNewItem({
      ...config.emptyItem,
      id: `${config.key}-${Date.now() + Math.floor(Math.random() * 1000)}`,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  const updateItem = (index: number, key: string, value: string) => {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-xl border border-border-subtle bg-surface shadow-sm overflow-hidden transition-all duration-200">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border-subtle bg-gradient-to-r from-accent-900/5 via-transparent to-transparent flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-serif font-bold text-foreground">{config.title}</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-accent-500/10 text-accent-700 dark:text-accent-400 text-xs font-semibold">
              {items.length} {items.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>
          {config.description && (
            <p className="text-xs text-foreground-muted mt-1 leading-relaxed">{config.description}</p>
          )}
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex items-center p-1 rounded-lg bg-surface-muted border border-border-subtle text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'add'
                ? 'bg-accent-700 dark:bg-accent-600 text-white shadow-sm font-semibold'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add New</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'list'
                ? 'bg-accent-700 dark:bg-accent-600 text-white shadow-sm font-semibold'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            <ListFilter className="h-3.5 w-3.5" />
            <span>Existing ({items.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Add New Entry Form */}
      {activeTab === 'add' && (
        <form onSubmit={handleAddNewItem} className="p-6 space-y-5 bg-surface-muted/30">
          <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
              <Sparkles className="h-4 w-4" />
              <span>Fill details to add new {config.title.replace(/s$/, '').toLowerCase()}</span>
            </div>
            {justAdded && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-pulse">
                <Check className="h-3.5 w-3.5" /> Entry added successfully!
              </span>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {config.fields.map((field) => (
              <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-medium text-foreground-muted mb-1.5">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={(newItem[field.key] as string) ?? ''}
                    onChange={(e) => handleUpdateNewField(field.key, e.target.value)}
                    rows={2}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    className="w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={(newItem[field.key] as string) ?? field.options?.[0]}
                    onChange={(e) => handleUpdateNewField(field.key, e.target.value)}
                    className="w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type === 'number' ? 'number' : 'text'}
                    value={(newItem[field.key] as string) ?? ''}
                    onChange={(e) => handleUpdateNewField(field.key, e.target.value)}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    className="w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 flex items-center gap-3 justify-end border-t border-border-subtle">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-700 dark:bg-accent-600 text-white font-medium text-sm hover:bg-accent-800 dark:hover:bg-accent-500 transition-all shadow-sm active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Add Entry</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Existing Entries List */}
      {activeTab === 'list' && (
        <div className="divide-y divide-border-subtle">
          {items.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-medium text-foreground-muted">No entries added yet.</p>
              <button
                type="button"
                onClick={() => setActiveTab('add')}
                className="text-xs text-accent-600 dark:text-accent-400 font-semibold hover:underline"
              >
                + Click here to add your first entry
              </button>
            </div>
          ) : (
            items.map((item, index) => {
              const isExpanded = expandedIndex === index;
              const previewTitle =
                (item.title as string) ||
                (item.degree as string) ||
                (item.role as string) ||
                (item.scholarName as string) ||
                (item.category as string) ||
                `Entry #${index + 1}`;

              return (
                <div key={(item.id as string) || index} className="transition-colors hover:bg-surface-muted/40">
                  <div
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="px-6 py-4 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-accent-500/10 text-accent-700 dark:text-accent-400 text-xs font-semibold shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-foreground truncate">{previewTitle}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(index);
                        }}
                        className="p-1.5 rounded-lg text-foreground-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Remove entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <ChevronDown
                        className={`h-4 w-4 text-foreground-muted transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-border-subtle bg-surface-muted/20">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {config.fields.map((field) => (
                          <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                            <label className="block text-xs font-medium text-foreground-muted mb-1">
                              {field.label}
                            </label>
                            {field.type === 'textarea' ? (
                              <textarea
                                value={(item[field.key] as string) ?? ''}
                                onChange={(e) => updateItem(index, field.key, e.target.value)}
                                rows={2}
                                className="w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500"
                              />
                            ) : field.type === 'select' ? (
                              <select
                                value={(item[field.key] as string) ?? field.options?.[0]}
                                onChange={(e) => updateItem(index, field.key, e.target.value)}
                                className="w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500"
                              >
                                {field.options?.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={field.type === 'number' ? 'number' : 'text'}
                                value={(item[field.key] as string) ?? ''}
                                onChange={(e) => updateItem(index, field.key, e.target.value)}
                                className="w-full rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
