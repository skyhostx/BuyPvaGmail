import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  X, 
  CheckCircle2, 
  FileText, 
  Bookmark, 
  ChevronRight,
  Share2,
  ThumbsUp,
  ArrowLeft
} from 'lucide-react';
import { blogGuides, allGuideTopics } from '../../data/blogData';
import { getBlogImageFallback } from '../../data/blogImages';
import { BlogGuide } from '../../types';
import { handleLinkClick } from '../../utils/navigation';

interface BlogPageProps {
  onNavigateHome?: () => void;
  initialArticleSlug?: string | null;
  onSelectArticleSlug?: (slug: string | null) => void;
  onSelectProduct?: (productId: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ 
  onNavigateHome,
  initialArticleSlug,
  onSelectArticleSlug,
  onSelectProduct
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogGuide | null>(() => {
    if (initialArticleSlug) {
      return blogGuides.find((g) => g.slug === initialArticleSlug) || null;
    }
    return null;
  });
  const [showAllTopics, setShowAllTopics] = useState(false);

  // Sync if initialArticleSlug changes externally
  React.useEffect(() => {
    if (initialArticleSlug) {
      const match = blogGuides.find((g) => g.slug === initialArticleSlug);
      if (match) setActiveArticle(match);
    } else if (initialArticleSlug === null) {
      setActiveArticle(null);
    }
  }, [initialArticleSlug]);

  const handleSelectArticle = (guide: BlogGuide | null) => {
    setActiveArticle(guide);
    const newSlug = guide ? guide.slug : null;
    if (onSelectArticleSlug) {
      onSelectArticleSlug(newSlug);
    }
    const targetPath = guide ? `/blog/${guide.slug}` : '/blog';
    window.history.pushState(null, '', targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['All', 'Product Guides', 'Cold Outreach', 'PVA Verification', 'Bulk Accounts', 'Aged Accounts', 'SMTP Sending', 'Google Ads', 'Google Reviews', 'Antidetect & Proxies', 'Account Security'];

  const filteredGuides = blogGuides.filter((guide) => {
    const matchesCat = 
      selectedCategory === 'All' 
        ? true 
        : selectedCategory === 'Product Guides'
          ? Boolean(guide.productId)
          : guide.category === selectedCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guide.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <a 
              href="/"
              onClick={(e) => {
                handleLinkClick(e, () => {
                  if (onNavigateHome) onNavigateHome();
                  else window.scrollTo({ top: 0, behavior: 'smooth' });
                });
              }}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Blog & Documentation</span>
          </div>

          {activeArticle && (
            <a
              href="/blog"
              onClick={(e) => {
                handleLinkClick(e, () => setActiveArticle(null));
              }}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Articles</span>
            </a>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>50+ Guides & Documentation Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Agency Knowledge Base & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600">Warmup Guides</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Master high-deliverability cold email, avoid Google phone checkpoints, bypass Google Ads billing suspensions, and manage multi-account antidetect browser profiles.
          </p>

          {/* Search Bar & Category Filters */}
          <div className="mt-8 max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 50+ articles, tools, warmup strategies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">

        {/* If Active Article is Selected, Show Full Article Reader */}
        {activeArticle ? (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                {activeArticle.category}
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {[activeArticle.title, activeArticle.excerpt, ...activeArticle.content].join(' ').trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {activeArticle.readTime}
                </span>
                <span className="text-slate-400">{activeArticle.date}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight mb-6">
              {activeArticle.title}
            </h1>

            {/* Featured Photo Header */}
            {activeArticle.image && (
              <div className="w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-sm relative group bg-slate-900">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    const fallback = getBlogImageFallback(activeArticle.id);
                    if (e.currentTarget.src !== fallback && !e.currentTarget.src.endsWith(fallback)) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
                {activeArticle.productName && (
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-xl border border-slate-700/80 flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Official Product Guide: {activeArticle.productName}</span>
                  </div>
                )}
              </div>
            )}

            {/* Featured Product Spotlight Box if article matches a product */}
            {activeArticle.productUrl && (
              <div className="mb-8 p-5 bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border border-blue-200/90 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-white px-2.5 py-0.5 rounded-full border border-blue-200 shadow-2xs">
                    Featured Product
                  </span>
                  <h4 className="text-base font-black text-slate-900 mt-1.5">
                    {activeArticle.productName}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 max-w-lg">
                    Phone-verified accounts, clean residential IPs, 2FA secret key &amp; 7-day replacement guarantee.
                  </p>
                </div>
                <a
                  href={activeArticle.productUrl}
                  onClick={(e) => {
                    handleLinkClick(e, () => {
                      if (onSelectProduct && activeArticle.productId) {
                        onSelectProduct(activeArticle.productId);
                      } else {
                        window.history.pushState(null, '', activeArticle.productUrl);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }
                    });
                  }}
                  className="shrink-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Buy {activeArticle.productName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 mb-8">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Executive Summary</span>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {activeArticle.excerpt}
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-sm sm:text-base space-y-5 text-slate-700 leading-relaxed">
              {activeArticle.content.map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-lg sm:text-xl font-black text-slate-900 pt-4 pb-1 border-b border-slate-100 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                      <span>{paragraph.replace('### ', '')}</span>
                    </h3>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-xl sm:text-2xl font-black text-slate-900 pt-6 pb-2 border-b border-slate-200">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('> ')) {
                  return (
                    <div key={idx} className="p-4 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-xl text-amber-900 text-sm font-medium my-3">
                      {paragraph.replace('> ', '')}
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Bottom Product Conversion Box */}
            {activeArticle.productUrl && (
              <div className="mt-10 p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-2 border border-blue-500/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>In Stock &amp; Instant Auto-Delivery</span>
                  </div>
                  <h3 className="text-lg font-black text-white">
                    Ready to order {activeArticle.productName}?
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-md">
                    Instant delivery of login credentials, 2FA secret key, recovery email, session cookies and 7-day 100% replacement warranty.
                  </p>
                </div>
                <a
                  href={activeArticle.productUrl}
                  onClick={(e) => {
                    handleLinkClick(e, () => {
                      if (onSelectProduct && activeArticle.productId) {
                        onSelectProduct(activeArticle.productId);
                      } else {
                        window.history.pushState(null, '', activeArticle.productUrl);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }
                    });
                  }}
                  className="shrink-0 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all cursor-pointer hover:scale-102"
                >
                  <span>Buy {activeArticle.productName} Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-500">Related Tags:</span>
                {activeArticle.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-semibold">
                    #{tag}
                  </span>
                ))}
              </div>

              <a
                href="/blog"
                onClick={(e) => {
                  handleLinkClick(e, () => handleSelectArticle(null));
                }}
                className="px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer inline-block"
              >
                Back to All Guides
              </a>
            </div>
          </div>
        ) : (
          /* Guides Grid View */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <a
                  key={guide.id}
                  href={`/blog/${guide.slug}`}
                  onClick={(e) => {
                    handleLinkClick(e, () => handleSelectArticle(guide));
                  }}
                  className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer group text-left block overflow-hidden"
                >
                  <div>
                    {/* Card Photo */}
                    {guide.image && (
                      <div className="w-full h-44 mb-4 rounded-2xl overflow-hidden bg-slate-900 relative">
                        <img
                          src={guide.image}
                          alt={guide.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            const fallback = getBlogImageFallback(guide.id);
                            if (e.currentTarget.src !== fallback && !e.currentTarget.src.endsWith(fallback)) {
                              e.currentTarget.src = fallback;
                            }
                          }}
                        />
                        {guide.productId && (
                          <span className="absolute bottom-2.5 left-2.5 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border border-slate-700/80 shadow-xs">
                            Product Guide
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {guide.category}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {guide.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {guide.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-normal">
                      {guide.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {guide.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* 50+ Extended Knowledge Topics Cloud */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">50+ Additional Topics & Tutorials</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Explore our comprehensive documentation archive for agency growth hacks</p>
                </div>
                <button
                  onClick={() => setShowAllTopics(!showAllTopics)}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  {showAllTopics ? 'Show Less' : 'View All 50+ Topics'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {(showAllTopics ? allGuideTopics : allGuideTopics.slice(0, 18)).map((topic, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSearchQuery(topic.split(' ')[0]);
                    }}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-xl text-xs font-medium border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Bookmark className="w-3 h-3 text-slate-400" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </section>
    </div>
  );
};
