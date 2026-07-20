'use client';

import React, { useState, useMemo } from 'react';
import { Publication } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { BookOpen, Search, ExternalLink, Calendar, Users, Bookmark, ChevronDown, ChevronUp } from 'lucide-react';

interface PublicationsProps {
  publications: Publication[];
}

export default function Publications({ publications }: PublicationsProps) {
  const [filterType, setFilterType] = useState<string>('All');
  const [filterYear, setFilterYear] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'year' | 'citations'>('year');
  const [showAll, setShowAll] = useState<boolean>(false);

  // Extract unique years
  const uniqueYears = useMemo(() => {
    const years = publications.map((pub) => pub.year);
    return ['All', ...Array.from(new Set(years))].sort((a, b) => b.localeCompare(a));
  }, [publications]);

  const filteredAndSortedPublications = useMemo(() => {
    let result = [...publications];

    // Filter by type
    if (filterType !== 'All') {
      result = result.filter((pub) => pub.type === filterType);
    }

    // Filter by year
    if (filterYear !== 'All') {
      result = result.filter((pub) => pub.year === filterYear);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pub) =>
          pub.title.toLowerCase().includes(query) ||
          pub.journalName.toLowerCase().includes(query) ||
          pub.authors.some((author) => author.toLowerCase().includes(query))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'citations') {
        return (b.citationCount || 0) - (a.citationCount || 0);
      } else {
        return parseInt(b.year) - parseInt(a.year);
      }
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
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-50 dark:border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Publications</h2>
            </div>
            
            {/* Quick Stat Badge */}
            <div className="self-start md:self-auto px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold">
              Total Publications: {publications.length}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search title, author, journal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800/80 rounded-xl bg-slate-50/50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-slate-200"
              />
            </div>

            {/* Year & Sort Selects */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span>Year:</span>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-800/80 rounded-xl bg-white dark:bg-slate-900 text-xs md:text-sm focus:outline-none dark:text-slate-200"
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
                  className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-800/80 rounded-xl bg-white dark:bg-slate-900 text-xs md:text-sm focus:outline-none dark:text-slate-200"
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
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
            <div className="text-center py-12 border border-dashed border-slate-100 dark:border-slate-800/50 rounded-xl">
              <Bookmark className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500 dark:text-slate-400">No publications match your criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-6">
                {displayedPublications.map((pub) => (
                  <div
                    key={pub.id}
                    className="group flex flex-col gap-2 p-5 border border-slate-50 dark:border-slate-800/50 rounded-xl hover:border-slate-100 dark:hover:border-slate-800 hover:bg-slate-50/20 dark:hover:bg-slate-900/10 transition-all"
                  >
                    <div className="flex flex-wrap gap-2 items-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                          ${
                            pub.type === 'Journal'
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                              : pub.type === 'Conference'
                              ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                          }
                        `}
                      >
                        {pub.type}
                      </span>
                      
                      {pub.citationCount !== undefined && (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-850 px-2 py-0.5 rounded">
                          Citations: {pub.citationCount}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm md:text-base font-serif font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {pub.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-450">
                      <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{pub.authors.join(', ')}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-500 font-medium">
                      <span className="italic">{pub.journalName}</span>
                      {pub.volume && <span>Vol. {pub.volume}</span>}
                      {pub.pages && <span>pp. {pub.pages}</span>}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {pub.year}
                      </span>
                    </div>

                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 w-fit mt-1"
                      >
                        <span>DOI: {pub.doi}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Show More / Show Less Button */}
              {filteredAndSortedPublications.length > 3 && (
                <button
                  suppressHydrationWarning
                  onClick={() => setShowAll(!showAll)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm font-semibold text-slate-600 dark:text-slate-350 transition-colors"
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
