import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  Bot,
  User,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Compass,
  MapPin,
  MessageCircle,
  Clock,
  Sparkles,
  Save,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { Conversation, EnquiryStatus } from '../../types';
import { updateEnquiryStatus, deleteConversationRecord } from '../../lib/conversationService';

interface AdminConversationModalProps {
  conversation: Conversation | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

const STATUS_OPTIONS: EnquiryStatus[] = [
  'New',
  'In Progress',
  'Booking Requested',
  'Contacted',
  'Confirmed',
  'Closed',
];

export const AdminConversationModal: React.FC<AdminConversationModalProps> = ({
  conversation,
  isOpen,
  onClose,
  onUpdated,
}) => {
  if (!isOpen || !conversation) return null;

  const [status, setStatus] = useState<EnquiryStatus>(conversation.enquiryStatus);
  const [notes, setNotes] = useState<string>(conversation.notes || '');
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      await updateEnquiryStatus(conversation.conversationId, status, notes);
      setSaveSuccess(true);
      onUpdated();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this enquiry record? This cannot be undone.'
      )
    ) {
      return;
    }
    setDeleting(true);
    try {
      await deleteConversationRecord(conversation.conversationId);
      onUpdated();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  const getWhatsAppMessageUrl = () => {
    const pkgText = conversation.detectedPackage
      ? `regarding the ${conversation.detectedPackage} tour package`
      : 'regarding your Kashmir tour inquiry';
    const text = encodeURIComponent(
      `Hello! This is KashmirYatra Team ${pkgText} on our website. How can we assist you with confirming dates, availability and custom itinerary details?`
    );
    return `https://wa.me/917006248669?text=${text}`;
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  Enquiry Details
                </h3>
                {conversation.bookingIntent && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Booking Intent Detected
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-400">
                Session: <span className="font-mono text-stone-300">{conversation.anonymousSessionId}</span> • Updated: {formatDate(conversation.updatedAt)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split into metadata/actions & conversation feed */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
          
          {/* Left Column: Metadata & Admin Status Controls */}
          <div className="p-5 bg-stone-950/50 border-b lg:border-b-0 lg:border-r border-stone-800 space-y-5 overflow-y-auto">
            
            {/* Status & Priority Control */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Enquiry Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EnquiryStatus)}
                className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-3 py-2.5 text-sm font-medium focus:border-emerald-500 focus:outline-none"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Detected Intelligence Tags */}
            <div className="space-y-3 p-3.5 bg-stone-900/90 rounded-xl border border-stone-800">
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                Detected AI Intelligence
              </div>

              <div>
                <span className="text-[11px] text-stone-400 block mb-1">Package Interest:</span>
                {conversation.detectedPackage ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{conversation.detectedPackage}</span>
                  </div>
                ) : (
                  <span className="text-xs text-stone-400 italic">No specific package mentioned yet</span>
                )}
              </div>

              <div>
                <span className="text-[11px] text-stone-400 block mb-1">Destination Focus:</span>
                {conversation.detectedDestination ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/30">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{conversation.detectedDestination}</span>
                  </div>
                ) : (
                  <span className="text-xs text-stone-400 italic">General Kashmir inquiry</span>
                )}
              </div>

              <div>
                <span className="text-[11px] text-stone-400 block mb-1">Booking Intent:</span>
                <span
                  className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium ${
                    conversation.bookingIntent
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                      : 'bg-stone-800 text-stone-300'
                  }`}
                >
                  {conversation.bookingIntent ? '⚡ High Intent to Book' : 'Browsing / Information'}
                </span>
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center justify-between">
                <span>Internal Notes</span>
                <span className="text-[10px] text-stone-400 font-normal">Visible only to team</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes e.g., 'Customer wants 4 rooms in Gulmarg for mid-December, contacted via WhatsApp'..."
                rows={3}
                className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none placeholder-stone-400 resize-none"
              />
            </div>

            {/* Save & Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {saving ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : saveSuccess ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{saveSuccess ? 'Changes Saved!' : 'Save Status & Notes'}</span>
              </button>

              {/* Direct WhatsApp Reachout */}
              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-emerald-950/70 border border-stone-700 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500 text-stone-950" />
                <span>Open WhatsApp (+91 7006248669)</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>

              {/* Delete Record */}
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full py-2 px-3 rounded-xl bg-transparent hover:bg-rose-950/30 text-stone-400 hover:text-rose-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-transparent hover:border-rose-900/40"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Enquiry Record</span>
              </button>
            </div>

          </div>

          {/* Right Column: Full Conversation Transcript */}
          <div className="lg:col-span-2 p-5 bg-stone-900 flex flex-col h-[520px] lg:h-auto overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 shrink-0">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                Full Conversation Thread ({conversation.messages.length} messages)
              </span>
              <span className="text-[11px] text-stone-400">
                Created: {formatDate(conversation.createdAt)}
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-2">
              {conversation.messages.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs">
                  No conversation messages logged in this session.
                </div>
              ) : (
                conversation.messages.map((msg, idx) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id || idx}
                      className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold shadow ${
                          isUser
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-emerald-700 text-white'
                        }`}
                      >
                        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>

                      {/* Content Bubble */}
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                          isUser
                            ? 'bg-amber-500/15 text-amber-100 border border-amber-500/30 rounded-tr-none'
                            : 'bg-stone-800/90 text-stone-200 border border-stone-700/80 rounded-tl-none space-y-1.5'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 text-[10px] text-stone-400 mb-1 border-b border-stone-700/50 pb-1">
                          <span className="font-semibold text-stone-300">
                            {isUser ? 'Visitor / Customer' : 'Kashmi (AI Concierge)'}
                          </span>
                          <span>{msg.timestamp || 'Recorded'}</span>
                        </div>
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
