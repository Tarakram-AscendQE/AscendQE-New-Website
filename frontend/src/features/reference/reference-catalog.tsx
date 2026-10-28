import React, { useState, useMemo } from 'react';
import { referenceTopics } from '../../data/referenceData';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../components/ui/accordion';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Search, ChevronDown, ChevronUp, Layers, Download } from 'lucide-react';
import { downloadFile } from '../../utils/download';

export const ReferenceCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openItems, setOpenItems] = useState<string[]>(['company-overview']);

  const categories = ['All', 'Company', 'Products', 'Services', 'Evidence', 'Commercial', 'Policies'];

  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return referenceTopics.filter((topic) => {
      const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const inTitle = topic.title.toLowerCase().includes(q);
      const inSummary = topic.summary.toLowerCase().includes(q);
      const inCategory = topic.category.toLowerCase().includes(q);
      const inContent = topic.fullContent.some((p) => p.toLowerCase().includes(q));

      return inTitle || inSummary || inCategory || inContent;
    });
  }, [searchQuery, selectedCategory]);

  const handleExpandAll = () => {
    setOpenItems(filteredTopics.map((t) => t.id));
  };

  const handleCollapseAll = () => {
    setOpenItems([]);
  };

  const handleDownloadSourceBrief = () => {
    const content = referenceTopics
      .map(
        (t) =>
          `### [${t.category}] ${t.title}\n${t.summary}\n\n${t.fullContent.join('\n\n')}\n`
      )
      .join('\n---\n\n');
    downloadFile(content, 'AscendQE-source-reference.txt');
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-muted/70" />
            <Input
              className="pl-11 h-12 text-base"
              placeholder="Search products (myDiya, mySDET, myTEVV), services, evidence, policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="secondary" size="sm" onClick={handleExpandAll}>
              <ChevronDown className="h-4 w-4 mr-1" />
              Expand all
            </Button>
            <Button variant="secondary" size="sm" onClick={handleCollapseAll}>
              <ChevronUp className="h-4 w-4 mr-1" />
              Collapse all
            </Button>
            <Button variant="secondary" size="sm" onClick={handleDownloadSourceBrief}>
              <Download className="h-4 w-4 mr-1" />
              Download brief
            </Button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-surface-border">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue text-white shadow-xs'
                  : 'bg-surface-card text-ink-muted hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-ink-muted ml-auto font-medium">
            Showing {filteredTopics.length} of {referenceTopics.length} reference topics
          </span>
        </div>
      </div>

      {/* Accordion Topics List */}
      <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 text-ink-muted">
            <Layers className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="text-base font-semibold">No reference topics match your search.</p>
            <p className="text-xs mt-1">Try searching for keywords like "mySDET", "traceability", or "pricing".</p>
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="w-full"
          >
            {filteredTopics.map((topic) => (
              <AccordionItem key={topic.id} value={topic.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue bg-blue-light px-2.5 py-0.5 rounded-md w-fit">
                      {topic.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-ink">
                      {topic.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="font-medium text-ink mb-3">{topic.summary}</p>
                  <div className="space-y-3 text-ink-muted leading-relaxed">
                    {topic.fullContent.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};
