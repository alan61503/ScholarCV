'use client';

import React from 'react';
import { Plus, Trash2, ChevronDown, UploadCloud } from 'lucide-react';
import { Publication, PublicationAuthor, IndexingEntry } from '../../types/faculty';

interface PublicationsFormProps {
  items: Publication[];
  onChange: (items: Publication[]) => void;
}

const inputClass =
  'w-full rounded-md border border-border-subtle bg-surface-muted px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-400';
const labelClass = 'block text-xs font-medium text-foreground-muted mb-1';
const sectionBandClass =
  'px-4 py-2 -mx-5 sm:-mx-6 bg-surface-muted border-y border-border-subtle text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground-muted';

const emptyAuthor = (position: number): PublicationAuthor => ({
  id: `author-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  position,
  name: '',
  isCorresponding: false,
  isStudent: false,
  email: '',
  country: '',
  affiliation: '',
  institutionType: '',
});

const emptyIndexing = (): IndexingEntry => ({
  id: `idx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  agency: '',
  quartileOrCategory: '',
  percentile: '',
  publicationUrl: '',
  scopusWosLink: '',
});

const emptyPublication = (): Publication => ({
  id: `pub-${Date.now()}`,
  title: '',
  authors: [],
  journalName: '',
  year: '',
  type: 'Journal',
  articleKeywords: [],
  subjectAreas: [],
  abstract: '',
  sdgCategory: '',
  language: '',
  medium: 'Print Only',
  volume: '',
  issue: '',
  pageFrom: '',
  pageTo: '',
  authorship: 'Sole Authored',
  authorDetails: [emptyAuthor(1)],
  dateOfSubmission: '',
  dateOfRevision: '',
  dateOfPublication: '',
  issn: '',
  publisherName: '',
  publisherAddress: '',
  indexingEntries: [emptyIndexing()],
  peerReviewStatus: 'Peer-reviewed',
  scope: 'International',
  journalUrl: '',
  documentProofName: '',
});

function ChipInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = React.useState('');

  const commit = () => {
    const v = draft.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft('');
  };

  return (
    <div className={`${inputClass} flex flex-wrap items-center gap-1.5 py-1.5`}>
      {values.map((v, i) => (
        <span
          key={`${v}-${i}`}
          className="flex items-center gap-1 rounded bg-accent-50 dark:bg-accent-950/50 text-accent-700 dark:text-accent-400 text-xs font-medium pl-2 pr-1 py-1"
        >
          {v}
          <button
            type="button"
            onClick={() => onChange(values.filter((_, idx) => idx !== i))}
            className="hover:text-red-500"
            aria-label={`Remove ${v}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
            if (draft.trim()) e.preventDefault();
            commit();
          }
        }}
        onBlur={commit}
        placeholder={values.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[8rem] bg-transparent text-sm focus:outline-none py-0.5"
      />
    </div>
  );
}

export default function PublicationsForm({ items, onChange }: PublicationsFormProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(items.length ? 0 : null);

  const updateItem = (index: number, patch: Partial<Publication>) => {
    onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  };

  const addPublication = () => {
    onChange([...items, emptyPublication()]);
    setOpenIndex(items.length);
  };

  const removePublication = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
    setOpenIndex(null);
  };

  // --- authors sub-table helpers ---
  const updateAuthor = (pubIndex: number, authorIndex: number, patch: Partial<PublicationAuthor>) => {
    const pub = items[pubIndex];
    const authors = (pub.authorDetails || []).map((a, i) => (i === authorIndex ? { ...a, ...patch } : a));
    const names = authors.map((a) => a.name).filter(Boolean);
    updateItem(pubIndex, { authorDetails: authors, authors: names });
  };
  const addAuthor = (pubIndex: number) => {
    const pub = items[pubIndex];
    const authors = [...(pub.authorDetails || []), emptyAuthor((pub.authorDetails?.length || 0) + 1)];
    updateItem(pubIndex, { authorDetails: authors });
  };
  const removeAuthor = (pubIndex: number, authorIndex: number) => {
    const pub = items[pubIndex];
    const authors = (pub.authorDetails || []).filter((_, i) => i !== authorIndex);
    updateItem(pubIndex, { authorDetails: authors, authors: authors.map((a) => a.name).filter(Boolean) });
  };

  // --- indexing sub-table helpers ---
  const updateIndexing = (pubIndex: number, idx: number, patch: Partial<IndexingEntry>) => {
    const pub = items[pubIndex];
    const entries = (pub.indexingEntries || []).map((e, i) => (i === idx ? { ...e, ...patch } : e));
    updateItem(pubIndex, { indexingEntries: entries });
  };
  const addIndexing = (pubIndex: number) => {
    const pub = items[pubIndex];
    updateItem(pubIndex, { indexingEntries: [...(pub.indexingEntries || []), emptyIndexing()] });
  };
  const removeIndexing = (pubIndex: number, idx: number) => {
    const pub = items[pubIndex];
    updateItem(pubIndex, { indexingEntries: (pub.indexingEntries || []).filter((_, i) => i !== idx) });
  };

  const [activeTab, setActiveTab] = React.useState<'add' | 'list'>('add');

  return (
    <div className="rounded-xl border border-border-subtle bg-surface shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-border-subtle bg-gradient-to-r from-accent-900/5 via-transparent to-transparent flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-serif font-bold text-foreground">Article in Research Journals</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-accent-500/10 text-accent-700 dark:text-accent-400 text-xs font-semibold">
              {items.length} {items.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
          <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
            Full record: article details, per-author information, and journal-level metadata.
          </p>
        </div>

        <div className="flex items-center p-1 rounded-lg bg-surface-muted border border-border-subtle text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              addPublication();
              setActiveTab('list');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent-700 dark:bg-accent-600 text-white font-semibold shadow-sm hover:bg-accent-800 transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+ Add New Article</span>
          </button>
        </div>
      </div>

      <div className="border-t border-border-subtle divide-y divide-border-subtle">
        {items.map((pub, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={pub.id || index}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-5 py-3.5 text-left hover:bg-surface-muted/60 transition-colors"
              >
                <span className="text-sm text-foreground truncate">
                  {pub.title || <span className="text-foreground-muted italic">Untitled article</span>}
                  {pub.year ? <span className="text-foreground-muted"> · {pub.year}</span> : null}
                </span>
                <ChevronDown className={`h-4 w-4 text-foreground-muted shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 space-y-5">
                  {/* Article Related */}
                  <div className={sectionBandClass}>Article Related</div>

                  <div>
                    <label className={labelClass}>Title of Article *</label>
                    <textarea
                      rows={2}
                      value={pub.title}
                      onChange={(e) => updateItem(index, { title: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Article Specific Keywords</label>
                      <ChipInput
                        values={pub.articleKeywords || []}
                        onChange={(v) => updateItem(index, { articleKeywords: v })}
                        placeholder="Type and press Enter"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Subject Area</label>
                      <ChipInput
                        values={pub.subjectAreas || []}
                        onChange={(v) => updateItem(index, { subjectAreas: v })}
                        placeholder="Type and press Enter"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Full Abstract</label>
                    <textarea
                      rows={3}
                      value={pub.abstract || ''}
                      onChange={(e) => updateItem(index, { abstract: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>SDG Category *</label>
                      <input
                        value={pub.sdgCategory || ''}
                        onChange={(e) => updateItem(index, { sdgCategory: e.target.value })}
                        className={inputClass}
                        placeholder="e.g. SDG 4 – Quality Education"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Language</label>
                      <input
                        value={pub.language || ''}
                        onChange={(e) => updateItem(index, { language: e.target.value })}
                        className={inputClass}
                        placeholder="English"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Medium of Publication *</label>
                      <select
                        value={pub.medium || 'Print Only'}
                        onChange={(e) => updateItem(index, { medium: e.target.value as Publication['medium'] })}
                        className={inputClass}
                      >
                        <option>Print Only</option>
                        <option>Print and Online</option>
                        <option>E Journal</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>DOI</label>
                      <input
                        value={pub.doi || ''}
                        onChange={(e) => updateItem(index, { doi: e.target.value })}
                        placeholder="https://www.doi.org/"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Volume No.</label>
                      <input
                        value={pub.volume || ''}
                        onChange={(e) => updateItem(index, { volume: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>Issue No.</label>
                      <input
                        value={pub.issue || ''}
                        onChange={(e) => updateItem(index, { issue: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Page From</label>
                      <input
                        value={pub.pageFrom || ''}
                        onChange={(e) => updateItem(index, { pageFrom: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Page To</label>
                      <input
                        value={pub.pageTo || ''}
                        onChange={(e) => updateItem(index, { pageTo: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Publication Type</label>
                      <select
                        value={pub.type}
                        onChange={(e) => updateItem(index, { type: e.target.value as Publication['type'] })}
                        className={inputClass}
                      >
                        <option>Journal</option>
                        <option>Conference</option>
                        <option>Book</option>
                        <option>Book Chapter</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Publication Year *</label>
                      <input
                        value={pub.year}
                        onChange={(e) => updateItem(index, { year: e.target.value })}
                        placeholder="2026"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Author Level Information */}
                  <div className={sectionBandClass}>Author Level Information</div>

                  <div className="flex items-center gap-6">
                    <span className={labelClass + ' mb-0'}>Authorship *</span>
                    {(['Sole Authored', 'Co-Authored'] as const).map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <input
                          type="radio"
                          name={`authorship-${index}`}
                          checked={pub.authorship === opt}
                          onChange={() => updateItem(index, { authorship: opt })}
                          className="accent-accent-600"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>

                  <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
                    <table className="w-full min-w-[860px] text-sm border-separate border-spacing-y-2">
                      <thead>
                        <tr className="text-left text-xs font-medium text-foreground-muted">
                          <th className="w-14 font-medium">Pos.</th>
                          <th className="font-medium">Author Name</th>
                          <th className="w-16 font-medium text-center">Corr.</th>
                          <th className="w-16 font-medium text-center">Student</th>
                          <th className="font-medium">Email</th>
                          <th className="font-medium">Country</th>
                          <th className="font-medium">Affiliation</th>
                          <th className="font-medium">Institution Type</th>
                          <th className="w-8" />
                        </tr>
                      </thead>
                      <tbody>
                        {(pub.authorDetails || []).map((author, aIdx) => (
                          <tr key={author.id} className="align-top">
                            <td className="pr-2">
                              <input
                                type="number"
                                value={author.position}
                                onChange={(e) => updateAuthor(index, aIdx, { position: Number(e.target.value) })}
                                className={inputClass + ' text-center'}
                              />
                            </td>
                            <td className="pr-2">
                              <input
                                value={author.name}
                                onChange={(e) => updateAuthor(index, aIdx, { name: e.target.value })}
                                placeholder="Select or type name"
                                className={inputClass}
                              />
                            </td>
                            <td className="pr-2 text-center">
                              <input
                                type="checkbox"
                                checked={author.isCorresponding}
                                onChange={(e) => updateAuthor(index, aIdx, { isCorresponding: e.target.checked })}
                                className="accent-accent-600 h-4 w-4"
                              />
                            </td>
                            <td className="pr-2 text-center">
                              <input
                                type="checkbox"
                                checked={author.isStudent}
                                onChange={(e) => updateAuthor(index, aIdx, { isStudent: e.target.checked })}
                                className="accent-accent-600 h-4 w-4"
                              />
                            </td>
                            <td className="pr-2">
                              <input
                                value={author.email || ''}
                                onChange={(e) => updateAuthor(index, aIdx, { email: e.target.value })}
                                className={inputClass}
                              />
                            </td>
                            <td className="pr-2">
                              <input
                                value={author.country || ''}
                                onChange={(e) => updateAuthor(index, aIdx, { country: e.target.value })}
                                className={inputClass}
                              />
                            </td>
                            <td className="pr-2">
                              <input
                                value={author.affiliation || ''}
                                onChange={(e) => updateAuthor(index, aIdx, { affiliation: e.target.value })}
                                className={inputClass}
                              />
                            </td>
                            <td className="pr-2">
                              <input
                                value={author.institutionType || ''}
                                onChange={(e) => updateAuthor(index, aIdx, { institutionType: e.target.value })}
                                placeholder="Home / Other"
                                className={inputClass}
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => removeAuthor(index, aIdx)}
                                className="p-1.5 rounded text-foreground-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                                aria-label="Remove author"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() => addAuthor(index)}
                    className="flex items-center gap-2 text-sm font-medium text-accent-700 dark:text-accent-400 hover:bg-surface-muted px-3 py-2 rounded-md transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Author
                  </button>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>Date of Submission</label>
                      <input
                        type="date"
                        value={pub.dateOfSubmission || ''}
                        onChange={(e) => updateItem(index, { dateOfSubmission: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Date of Revision</label>
                      <input
                        type="date"
                        value={pub.dateOfRevision || ''}
                        onChange={(e) => updateItem(index, { dateOfRevision: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Date of Publication *</label>
                      <input
                        type="date"
                        value={pub.dateOfPublication || ''}
                        onChange={(e) => updateItem(index, { dateOfPublication: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Journal Level Information */}
                  <div className={sectionBandClass}>Journal Level Information</div>

                  <div>
                    <label className={labelClass}>Name of Journal *</label>
                    <input
                      value={pub.journalName}
                      onChange={(e) => updateItem(index, { journalName: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>ISSN *</label>
                      <input
                        value={pub.issn || ''}
                        onChange={(e) => updateItem(index, { issn: e.target.value })}
                        placeholder="1234-5678-9874-5689"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Publisher Name *</label>
                      <input
                        value={pub.publisherName || ''}
                        onChange={(e) => updateItem(index, { publisherName: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Publisher Address</label>
                    <input
                      value={pub.publisherAddress || ''}
                      onChange={(e) => updateItem(index, { publisherAddress: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
                    <table className="w-full min-w-[760px] text-sm border-separate border-spacing-y-2">
                      <thead>
                        <tr className="text-left text-xs font-medium text-foreground-muted">
                          <th className="font-medium">Indexing Agency</th>
                          <th className="font-medium">Quartile / ABDC / IF Category</th>
                          <th className="font-medium">Journal Percentile</th>
                          <th className="font-medium">Publication URL</th>
                          <th className="font-medium">Scopus / WoS Link</th>
                          <th className="w-8" />
                        </tr>
                      </thead>
                      <tbody>
                        {(pub.indexingEntries || []).map((entry, eIdx) => (
                          <tr key={entry.id} className="align-top">
                            <td className="pr-2">
                              <select
                                value={entry.agency}
                                onChange={(e) => updateIndexing(index, eIdx, { agency: e.target.value })}
                                className={inputClass}
                              >
                                <option value="">Select Agency</option>
                                <option>ABDC</option>
                                <option>FT-50</option>
                                <option>Indian Citation Index</option>
                                <option>Not Indexed</option>
                                <option>Scopus</option>
                                <option>Web of Science</option>
                                <option>Others</option>
                              </select>
                            </td>
                            <td className="pr-2">
                              <input
                                value={entry.quartileOrCategory || ''}
                                onChange={(e) => updateIndexing(index, eIdx, { quartileOrCategory: e.target.value })}
                                className={inputClass}
                              />
                            </td>
                            <td className="pr-2">
                              <input
                                value={entry.percentile || ''}
                                onChange={(e) => updateIndexing(index, eIdx, { percentile: e.target.value })}
                                className={inputClass}
                              />
                            </td>
                            <td className="pr-2">
                              <input
                                value={entry.publicationUrl || ''}
                                onChange={(e) => updateIndexing(index, eIdx, { publicationUrl: e.target.value })}
                                placeholder="Enter publication URL"
                                className={inputClass}
                              />
                            </td>
                            <td className="pr-2">
                              <input
                                value={entry.scopusWosLink || ''}
                                onChange={(e) => updateIndexing(index, eIdx, { scopusWosLink: e.target.value })}
                                placeholder="Enter link to Scopus/WoS enlistment"
                                className={inputClass}
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => removeIndexing(index, eIdx)}
                                className="p-1.5 rounded text-foreground-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                                aria-label="Remove indexing entry"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() => addIndexing(index)}
                    className="flex items-center gap-2 text-sm font-medium text-accent-700 dark:text-accent-400 hover:bg-surface-muted px-3 py-2 rounded-md transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Indexing Agency
                  </button>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>Peer-review Status *</label>
                      <select
                        value={pub.peerReviewStatus || 'Peer-reviewed'}
                        onChange={(e) => updateItem(index, { peerReviewStatus: e.target.value as Publication['peerReviewStatus'] })}
                        className={inputClass}
                      >
                        <option>Peer-reviewed</option>
                        <option>Not reviewed</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Scope</label>
                      <select
                        value={pub.scope || 'International'}
                        onChange={(e) => updateItem(index, { scope: e.target.value as Publication['scope'] })}
                        className={inputClass}
                      >
                        <option>International</option>
                        <option>National</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>URL of the Journal *</label>
                      <input
                        value={pub.journalUrl || ''}
                        onChange={(e) => updateItem(index, { journalUrl: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Document Proof</label>
                    <div className="flex items-center gap-3">
                      <input
                        value={pub.documentProofName || ''}
                        onChange={(e) => updateItem(index, { documentProofName: e.target.value })}
                        placeholder="File name or link to supporting document"
                        className={inputClass}
                      />
                      <span className="shrink-0 inline-flex items-center gap-1.5 text-xs text-foreground-muted">
                        <UploadCloud className="h-4 w-4" /> optional
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removePublication(index)}
                      className="flex items-center gap-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 px-3 py-2 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" /> Remove this article
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="p-4">
          <button
            type="button"
            onClick={addPublication}
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:bg-surface-muted px-3 py-2 rounded-md transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Article in Research Journals
          </button>
        </div>
      </div>
    </div>
  );
}
