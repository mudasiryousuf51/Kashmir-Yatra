import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
  Calendar,
  Compass,
  MapPin,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  User,
  Bot,
  Flame,
  Check,
} from 'lucide-react';
import { Conversation, EnquiryStatus } from '../../types';
import {
  getAllConversationsForAdmin,
  updateEnquiryStatus,
} from '../../lib/conversationService';
import { AdminConversationModal } from './AdminConversationModal';

type FilterTab = 'all' | 'new' | 'active' | 'booking_requests' | 'closed';

export const AdminEnquiriesManager: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [isFromFirestore, setIsFromFirestore] = useState<boolean>(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getAllConversationsForAdmin();
      setConversations(res.conversations);
      setIsFromFirestore(res.isFromFirestore);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuickStatusChange = async (
    convId: string,
    newStatus: EnquiryStatus,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setUpdatingId(convId);
    try {
      await updateEnquiryStatus(convId, newStatus);
      await loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const openConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setIsModalOpen(true);
  };

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    // Tab filtering
    if (activeTab === 'new' && conv.enquiryStatus !== 'New') {
      return false;
    }
    if (
      activeTab === 'active' &&
      !['New', 'In Progress', 'Booking Requested'].includes(conv.enquiryStatus)
    ) {
      return false;
    }
    if (
      activeTab === 'booking_requests' &&
      !conv.bookingIntent &&
      conv.enquiryStatus !== 'Booking Requested'
    ) {
      return false;
    }
    if (
      activeTab === 'closed' &&
      !['Confirmed', 'Closed'].includes(conv.enquiryStatus)
    ) {
      return false;
    }

    // Search query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchPkg = conv.detectedPackage?.toLowerCase().includes(q);
      const matchDest = conv.detectedDestination?.toLowerCase().includes(q);
      const matchMsg = conv.lastUserMessage?.toLowerCase().includes(q);
      const matchId = conv.conversationId.toLowerCase().includes(q) || conv.anonymousSessionId.toLowerCase().includes(q);
      return matchPkg || matchDest || matchMsg || matchId;
    }

    return true;
  });

  // Calculate statistics
  const totalCount = conversations.length;
  const bookingRequestsCount = conversations.filter(
    (c) => c.bookingIntent || c.enquiryStatus === 'Booking Requested'
  ).length;
  const newCount = conversations.filter((c) => c.enquiryStatus === 'New').length;
  const activeCount = conversations.filter((c) =>
    ['New', 'In Progress', 'Booking Requested'].includes(c.enquiryStatus)
  ).length;

  const getStatusBadge = (status: EnquiryStatus, hasIntent: boolean) => {
    switch (status) {
      case 'Booking Requested':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Flame className="w-3 h-3 text-amber-400" />
            Booking Requested
          </span>
        );
      case 'New':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            New
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            In Progress
          </span>
        );
      case 'Contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Contacted
          </span>
        );
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <Check className="w-3 h-3 text-emerald-400" />
            Confirmed
          </span>
        );
      case 'Closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-800 text-stone-400 border border-stone-700">
            Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-800 text-stone-300">
            {status}
          </span>
        );
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Counters Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Enquiries */}
        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 block font-medium">Total Conversations</span>
            <span className="text-2xl font-bold text-white mt-1 block">{totalCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-800 text-stone-300 border border-stone-700">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        {/* Booking Requests (Highlighted) */}
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-300/90 block font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Booking Requests
            </span>
            <span className="text-2xl font-bold text-amber-200 mt-1 block">
              {bookingRequestsCount}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* New Enquiries */}
        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 block font-medium">New Enquiries</span>
            <span className="text-2xl font-bold text-blue-400 mt-1 block">{newCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-950/40 text-blue-400 border border-blue-500/30">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Active Inquiries */}
        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 block font-medium">Active Pipeline</span>
            <span className="text-2xl font-bold text-emerald-400 mt-1 block">{activeCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            All ({totalCount})
          </button>

          <button
            onClick={() => setActiveTab('booking_requests')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'booking_requests'
                ? 'bg-amber-500 text-stone-950 shadow font-bold'
                : 'bg-stone-800 text-amber-300 hover:bg-stone-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Booking Requests ({bookingRequestsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('new')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'new'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            New ({newCount})
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'active'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            Active ({activeCount})
          </button>

          <button
            onClick={() => setActiveTab('closed')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'closed'
                ? 'bg-stone-700 text-white shadow'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            Closed
          </button>
        </div>

        {/* Search & Refresh */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search enquiries, package, query..."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-stone-400 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer border border-stone-700"
            title="Refresh Enquiries"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

      </div>

      {/* Enquiries Feed / Table */}
      {loading ? (
        <div className="p-12 text-center bg-stone-900/50 rounded-2xl border border-stone-800">
          <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
          <p className="text-stone-300 text-sm font-medium">Loading customer AI enquiries from Cloud Firestore...</p>
        </div>
      ) : filteredConversations.length === 0 ? (
        <div className="p-12 text-center bg-stone-900/50 rounded-2xl border border-stone-800">
          <MessageSquare className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white mb-1">No Customer Enquiries Found</h4>
          <p className="text-xs text-stone-400 max-w-md mx-auto">
            {searchQuery
              ? `No enquiries matched your search "${searchQuery}".`
              : 'Customer AI conversations and booking requests will appear here in real-time as visitors chat with Kashmi.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredConversations.map((conv) => {
            const hasBookingIntent = conv.bookingIntent || conv.enquiryStatus === 'Booking Requested';

            return (
              <div
                key={conv.conversationId}
                onClick={() => openConversation(conv)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer hover:border-emerald-500/50 ${
                  hasBookingIntent
                    ? 'bg-stone-900/95 border-amber-500/40 hover:bg-amber-950/10'
                    : 'bg-stone-900/80 border-stone-800 hover:bg-stone-850'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  
                  {/* Left: Metadata & Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    {getStatusBadge(conv.enquiryStatus, conv.bookingIntent)}

                    {conv.detectedPackage && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                        <Compass className="w-3 h-3 text-emerald-400" />
                        {conv.detectedPackage}
                      </span>
                    )}

                    {conv.detectedDestination && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-stone-800 text-stone-300 border border-stone-700">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {conv.detectedDestination}
                      </span>
                    )}
                  </div>

                  {/* Right: Date & Session */}
                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(conv.updatedAt)}
                    </span>
                    <span className="font-mono text-[11px] text-stone-400 hidden md:inline">
                      {conv.anonymousSessionId.slice(0, 16)}...
                    </span>
                  </div>

                </div>

                {/* Latest User Message Snippet */}
                <div className="flex items-start gap-3 bg-stone-950/60 p-3 rounded-xl border border-stone-800/80 mb-3">
                  <User className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 leading-relaxed">
                      "{conv.lastUserMessage || 'Inquired about Kashmir travel...'}"
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-400">
                      Messages: <strong className="text-stone-300">{conv.messages.length}</strong>
                    </span>
                    {conv.notes && (
                      <span className="text-[11px] text-amber-300/80 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                        Has Team Notes
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openConversation(conv);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>View Conversation</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Conversation Modal */}
      <AdminConversationModal
        isOpen={isModalOpen}
        conversation={selectedConversation}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedConversation(null);
        }}
        onUpdated={loadData}
      />

    </div>
  );
};
