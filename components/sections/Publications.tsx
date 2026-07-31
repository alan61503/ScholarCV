'use client';

import React, { useState, useMemo } from 'react';
import { Publication } from '../../types/faculty';
import { Card, CardContent, SectionEyebrow } from '../ui/Card';
import {
  BookOpen,
  Search,
  ExternalLink,
  Calendar,
  Users,
  Bookmark,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Globe2,
  Quote,
} from 'lucide-react';

interface PublicationsProps {
  publications: Publication[];
}

function TypeBadge({ type }: { type: Publication['type'] }) {
  const styles: Record<string, string> = {
    Journal: 'bg-accent-500/10 text-accent-700 dark:text-accent-400 border border-accent-500/20',
    Conference: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20',
    Book: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20',
    'Book Chapter': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[type]}`}>
      {type}
    </span>
  );
}

export default function Publications({ publications }: PublicationsProps) {
  const [filterType, setFilterType] = useState<string>('All');
  const [filterYear, setFilterYear] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'year' | 'citations'>('year');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const uniqueYears = useMemo(() => {
    const years = publications.map((pub) => pub.year);
    return ['All', ...Array.from(new Set(years))].sort((a, b) => b.localeCompare(a));
  }, [publications]);

  const filteredAndSortedPublications = useMemo(() => {
    let result = [...publications];

    if (filterType !== 'All') {
      result = result.filter((pub) => pub.type === filterType);
    }
    if (filterYear !== 'All') {
      result = result.filter((pub) => pub.year === filterYear);
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pub) =>
          pub.title.toLowerCase().includes(query) ||
          pub.journalName.toLowerCase().includes(query) ||
          pub.authors.some((author) => author.toLowerCase().includes(query)) ||
          (pub.articleKeywords || []).some((k) => k.toLowerCase().includes(query))
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'citations') {
        return (b.citationCount || 0) - (a.citationCount || 0);
      }
      return parseInt(b.year || '0') - parseInt(a.year || '0');
    });

    return result;
  }, [publications, filterType, filterYear, searchQuery, sortBy]);

  const publicationTypes = ['All', 'Journal', 'Conference', 'Book', 'Book Chapter'];

  const displayedPublications = showAll
    ? filteredAndSortedPublications
    : filteredAndSortedPublications.slice(0, 3);

  return (
    <section id="publications" className="scroll-mt-24 space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-accent-500/10 text-accent-700 dark:text-accent-400 shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground tracking-tight">Publications</h2>
            </div>

            <span className="text-xs font-semibold px-3 py-1 bg-accent-500/10 text-accent-700 dark:text-accent-400 rounded-full">
              {publications.length} {publications.length === 1 ? 'Publication' : 'Publications'}
            </span>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-foreground-muted" />
              <input
                type="text"
                placeholder="Search title, author, journal, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-border-subtle rounded-md bg-surface-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-400 text-foreground"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-muted">
              <div className="flex items-center gap-1.5">
                <span>Year:</span>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="px-2.5 py-1.5 border border-border-subtle rounded-md bg-surface text-xs md:text-sm focus:outline-none text-foreground"
                >
                  {uniqueYears.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'year' | 'citations')}
                  className="px-2.5 py-1.5 border border-border-subtle rounded-md bg-surface text-xs md:text-sm focus:outline-none text-foreground"
                >
                  <option value="year">Latest Year</option>
                  <option value="citations">Most Citations</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Types Chips */}
          <div className="flex flex-wrap gap-2">
            {publicationTypes.map((type) => {
              const isActive = filterType === type;
              return (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-accent-700 dark:bg-accent-600 text-white'
                        : 'bg-surface-muted text-foreground-muted hover:text-foreground'
                    }
                  `}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Publications List */}
          {filteredAndSortedPublications.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border-subtle rounded-md">
              <Bookmark className="h-8 w-8 text-foreground-muted mx-auto mb-2" />
              <p className="text-sm text-foreground-muted">No publications match your criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                {displayedPublications.map((pub) => {
                  const isExpanded = expandedId === pub.id;
                  const hasDetail =
                    pub.abstract || (pub.articleKeywords && pub.articleKeywords.length > 0) || (pub.indexingEntries && pub.indexingEntries.length > 0);
                  return (
                    <div
                      key={pub.id}
                      className="group flex flex-col gap-2.5 p-5 border border-border-subtle rounded-md hover:border-accent-200 dark:hover:border-accent-800 transition-colors"
                    >
                      <div className="flex flex-wrap gap-2 items-center">
                        <TypeBadge type={pub.type} />
                        {pub.scope && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-foreground-muted bg-surface-muted px-2 py-0.5 rounded">
                            <Globe2 className="h-3 w-3" /> {pub.scope}
                          </span>
                        )}
                        {pub.peerReviewStatus === 'Peer-reviewed' && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                            <ShieldCheck className="h-3 w-3" /> Peer-reviewed
                          </span>
                        )}
                        {pub.citationCount !== undefined && pub.citationCount !== null && pub.citationCount !== ('' as unknown) && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-foreground-muted bg-surface-muted px-2 py-0.5 rounded">
                            <Quote className="h-3 w-3" /> {pub.citationCount} citations
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm md:text-base font-serif font-bold text-foreground leading-snug group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors">
                        {pub.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                        <Users className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{pub.authors.join(', ')}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground-muted font-medium">
                        <span className="italic">{pub.journalName}</span>
                        {pub.volume && <span>Vol. {pub.volume}</span>}
                        {pub.issue && <span>Issue {pub.issue}</span>}
                        {(pub.pageFrom || pub.pages) && (
                          <span>pp. {pub.pageFrom ? `${pub.pageFrom}${pub.pageTo ? `–${pub.pageTo}` : ''}` : pub.pages}</span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {pub.year}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        {pub.doi && (
                          <a
                            href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 w-fit"
                          >
                            <span>DOI: {pub.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {pub.issn && (
                          <span className="text-xs font-mono text-foreground-muted">ISSN: {pub.issn}</span>
                        )}
                      </div>

                      {hasDetail && (
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                          className="mt-1 inline-flex items-center gap-1 self-start text-xs font-semibold text-accent-700 dark:text-accent-400 hover:underline"
                        >
                          {isExpanded ? 'Hide details' : 'View abstract & indexing'}
                          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </button>
                      )}

                      {isExpanded && (
                        <div className="mt-2 pt-4 border-t border-border-subtle space-y-3">
                          {pub.abstract && (
                            <p className="text-sm text-foreground-muted leading-relaxed">{pub.abstract}</p>
                          )}
                          {pub.articleKeywords && pub.articleKeywords.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {pub.articleKeywords.map((k) => (
                                <span
                                  key={k}
                                  className="px-2 py-0.5 rounded text-[11px] bg-surface-muted text-foreground-muted border border-border-subtle"
                                >
                                  {k}
                                </span>
                              ))}
                            </div>
                          )}
                          {pub.indexingEntries && pub.indexingEntries.filter((e) => e.agency).length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {pub.indexingEntries
                                .filter((e) => e.agency)
                                .map((entry) => (
                                  <span
                                    key={entry.id}
                                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-accent-50 dark:bg-accent-950/40 text-accent-700 dark:text-accent-400"
                                  >
                                    {entry.agency}
                                    {entry.quartileOrCategory ? ` · ${entry.quartileOrCategory}` : ''}
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredAndSortedPublications.length > 3 && (
                <button
                  suppressHydrationWarning
                  onClick={() => setShowAll(!showAll)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md border border-border-subtle hover:bg-surface-muted text-sm font-semibold text-foreground-muted transition-colors"
                >
                  {showAll ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Show More ({filteredAndSortedPublications.length - 3} additional)</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
