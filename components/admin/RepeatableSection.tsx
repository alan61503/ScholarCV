'use client';

import React from 'react';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { SectionConfig } from './schema';

interface RepeatableSectionProps {
  config: SectionConfig;
  items: Record<string, unknown>[];
  onChange: (items: Record<string, unknown>[]) => void;
}

export default function RepeatableSection({ config, items, onChange }: RepeatableSectionProps) {
  const [open, setOpen] = React.useState(true);

  const updateItem = (index: number, key: string, value: string) => {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    onChange(next);
  };

  const addItem = () => {
    onChange([...items, { ...config.emptyItem, id: `${config.key}-${Date.now()}` }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{config.title}</h3>
          {config.description && (
            <p className="text-xs text-slate-400 mt-0.5">{config.description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">{items.length} item{items.length !== 1 ? 's' : ''}</span>
          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((item, index) => (
            <div key={(item.id as string) || index} className="p-5 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="grid sm:grid-cols-2 gap-3 pr-8">
                {config.fields.map((field) => (
                  <div
                    key={field.key}
                    className={field.type === 'textarea' ? 'sm:col-span-2' : ''}
                  >
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={(item[field.key] as string) ?? ''}
                        onChange={(e) => updateItem(index, field.key, e.target.value)}
                        rows={2}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-400"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={(item[field.key] as string) ?? field.options?.[0]}
                        onChange={(e) => updateItem(index, field.key, e.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-400"
                      >
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type === 'number' ? 'number' : 'text'}
                        value={(item[field.key] as string) ?? ''}
                        onChange={(e) => updateItem(index, field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-400"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="p-4">
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add {config.title.replace(/s$/, '')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
