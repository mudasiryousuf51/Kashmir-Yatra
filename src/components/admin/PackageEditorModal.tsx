import React, { useState } from 'react';
import { Package, PackageCategory, ItineraryDay } from '../../types';
import {
  X,
  Save,
  Plus,
  Trash2,
  Image,
  Sparkles,
  Calendar,
  IndianRupee,
  MapPin,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
  Clock,
  Layers,
} from 'lucide-react';

interface PackageEditorModalProps {
  pkg?: Package | null; // null means creating a new package
  isOpen: boolean;
  onClose: () => void;
  onSave: (pkg: Package) => Promise<void>;
}

export const PackageEditorModal: React.FC<PackageEditorModalProps> = ({
  pkg,
  isOpen,
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(pkg);

  const [title, setTitle] = useState(pkg?.title || '');
  const [tagline, setTagline] = useState(pkg?.tagline || '');
  const [category, setCategory] = useState<PackageCategory>(pkg?.category || 'holiday');
  const [nightsCount, setNightsCount] = useState<number>(pkg?.nightsCount || 3);
  const [daysCount, setDaysCount] = useState<number>(pkg?.daysCount || 4);
  const [price, setPrice] = useState<number>(pkg?.startingPricePerPerson || 11999);
  const [overview, setOverview] = useState(pkg?.overview || '');
  const [image, setImage] = useState(
    pkg?.image ||
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80'
  );
  const [destinations, setDestinations] = useState<string>(
    pkg?.destinationsCovered?.join(', ') || 'Srinagar, Gulmarg, Pahalgam'
  );
  const [highlights, setHighlights] = useState<string>(
    pkg?.keyHighlights?.join('\n') || ''
  );
  const [inclusions, setInclusions] = useState<string>(
    pkg?.inclusions?.join('\n') ||
      'Deluxe Houseboat & Hotel Accommodation\nDaily Breakfast & Dinner\nDedicated Private Cab\nShikara Ride on Dal Lake'
  );
  const [exclusions, setExclusions] = useState<string>(
    pkg?.exclusions?.join('\n') ||
      'Airfare to/from Srinagar\nGondola Phase 1 & 2 tickets\nPersonal expenses & tips'
  );
  const [accommodationInfo, setAccommodationInfo] = useState(
    pkg?.accommodationInfo || '3-Star / 4-Star Deluxe Hotel & Houseboat'
  );
  const [transportationInfo, setTransportationInfo] = useState(
    pkg?.transportationInfo || 'Dedicated Private Sedan/SUV (Etios/Innova) for entire tour'
  );
  const [bestTime, setBestTime] = useState(
    pkg?.bestTime || 'April to October (Pleasant) & December to February (Snow)'
  );
  const [difficulty, setDifficulty] = useState<'Easy' | 'Moderate' | 'Challenging'>(
    pkg?.difficulty || 'Easy'
  );
  const [active, setActive] = useState<boolean>(pkg?.active !== false);

  const [itinerary, setItinerary] = useState<ItineraryDay[]>(
    pkg?.itinerary && pkg.itinerary.length > 0
      ? pkg.itinerary
      : [
          {
            day: 1,
            title: 'Arrival in Srinagar & Dal Lake Houseboat Check-in',
            description: 'Pickup from Srinagar Airport and transfer to Deluxe Houseboat.',
            activities: ['Airport Pickup', 'Houseboat Check-in', 'Shikara Ride'],
            overnightStay: 'Deluxe Houseboat, Dal Lake',
            mealsIncluded: 'Dinner',
          },
          {
            day: 2,
            title: 'Gulmarg Meadow of Flowers Excursion',
            description: 'Full-day excursion to Gulmarg with Gondola cable car ride.',
            activities: ['Drive to Gulmarg', 'Gondola Ride', 'Snow activities'],
            overnightStay: 'Deluxe Hotel, Srinagar',
            mealsIncluded: 'Breakfast & Dinner',
          },
        ]
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddItineraryDay = () => {
    const nextDay = itinerary.length + 1;
    setItinerary([
      ...itinerary,
      {
        day: nextDay,
        title: `Day ${nextDay} Sightseeing`,
        description: `Explore local attractions and scenic valleys.`,
        activities: ['Sightseeing', 'Scenic photography'],
        overnightStay: 'Deluxe Hotel, Srinagar',
        mealsIncluded: 'Breakfast & Dinner',
      },
    ]);
  };

  const handleUpdateItineraryDay = (index: number, field: keyof ItineraryDay, value: any) => {
    const updated = [...itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setItinerary(updated);
  };

  const handleRemoveItineraryDay = (index: number) => {
    const updated = itinerary
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, day: i + 1 }));
    setItinerary(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a package title.');
      return;
    }
    if (price <= 0) {
      setError('Please enter a valid starting price.');
      return;
    }

    setSaving(true);
    setError(null);

    const destList = destinations
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const highlightList = highlights
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const inclusionList = inclusions
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const exclusionList = exclusions
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const packageId =
      pkg?.id ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') +
        '-' +
        Date.now().toString().slice(-4);

    const packageData: Package = {
      id: packageId,
      title: title.trim(),
      tagline: tagline.trim(),
      category,
      duration: `${nightsCount} Nights / ${daysCount} Days`,
      nightsCount: Number(nightsCount),
      daysCount: Number(daysCount),
      startingPricePerPerson: Number(price),
      destinationsCovered: destList.length > 0 ? destList : ['Srinagar', 'Gulmarg', 'Pahalgam'],
      keyHighlights: highlightList.length > 0 ? highlightList : [title],
      overview: overview.trim(),
      itinerary,
      accommodationInfo: accommodationInfo.trim(),
      transportationInfo: transportationInfo.trim(),
      inclusions: inclusionList,
      exclusions: exclusionList,
      bestTime: bestTime.trim(),
      difficulty,
      importantNotes: pkg?.importantNotes || [
        'Valid Government Photo ID required for all travelers.',
        'Postpaid mobile connections (Airtel/Jio/BSNL) work best across Kashmir valleys.',
      ],
      image: image.trim(),
      active,
      updatedAt: new Date().toISOString(),
    };

    try {
      await onSave(packageData);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save package');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                {isEditing ? `Edit Package: ${pkg?.title}` : 'Add New Kashmir Tour Package'}
              </h2>
              <p className="text-xs text-stone-400">
                Configure details, pricing, itinerary, and live visibility
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-grow">
          {error && (
            <div className="p-3.5 bg-red-950/60 border border-red-500/30 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Basic Package Information</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-stone-300">
                  Package Name / Title <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Kashmir Holiday — 4 Nights / 5 Days"
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-stone-300">
                  Tagline / Teaser
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Srinagar, Gulmarg, Pahalgam & Dal Lake Experience"
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  Category <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PackageCategory)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                >
                  <option value="holiday">1. Kashmir Holiday Package</option>
                  <option value="offbeat">2. Offbeat Kashmir Package</option>
                  <option value="adventure">3. Adventure Tour</option>
                </select>
              </div>

              {/* Price Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                  <span>Starting Price (₹ per person) <span className="text-emerald-400">*</span></span>
                  <span className="text-[10px] text-amber-300 font-mono">Live on Public Site</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="e.g. 28000"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-mono font-bold text-emerald-300 placeholder-stone-500 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  Nights Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={nightsCount}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    setNightsCount(n);
                    if (daysCount <= n) setDaysCount(n + 1);
                  }}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  Days Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-stone-300">
                  Cover Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://..."
                    className="flex-grow bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Preview"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-lg border border-stone-700 shrink-0"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-stone-300">
                  Destinations Covered (comma-separated)
                </label>
                <input
                  type="text"
                  value={destinations}
                  onChange={(e) => setDestinations(e.target.value)}
                  placeholder="Srinagar, Gulmarg, Pahalgam, Sonamarg, Dal Lake"
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-stone-300">
                  Package Overview & Narrative
                </label>
                <textarea
                  rows={3}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Detailed description of the journey, experiences, and atmosphere..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Highlights, Inclusions & Exclusions */}
          <div className="space-y-4 pt-4 border-t border-stone-800">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Highlights & Policy Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  Key Highlights (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={highlights}
                  onChange={(e) => setHighlights(e.target.value)}
                  placeholder="1 Night Luxury Houseboat&#10;Gulmarg Gondola Excursion&#10;Pahalgam Valley Riverwalk"
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl p-3 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  Inclusions (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={inclusions}
                  onChange={(e) => setInclusions(e.target.value)}
                  placeholder="Deluxe Hotel Stays&#10;Breakfast & Dinner&#10;Dedicated Private Cab&#10;1-Hour Shikara Ride"
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl p-3 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  Exclusions (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={exclusions}
                  onChange={(e) => setExclusions(e.target.value)}
                  placeholder="Airfare&#10;Gondola Phase 2 Tickets&#10;Personal Expenses"
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl p-3 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Itinerary Day by Day */}
          <div className="space-y-4 pt-4 border-t border-stone-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Day-by-Day Itinerary ({itinerary.length} Days)</span>
              </h3>
              <button
                type="button"
                onClick={handleAddItineraryDay}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Day</span>
              </button>
            </div>

            <div className="space-y-3">
              {itinerary.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-amber-300 bg-amber-950/40 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                      Day {item.day}
                    </span>
                    {itinerary.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItineraryDay(idx)}
                        className="text-stone-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="Remove Day"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[11px] font-semibold text-stone-400">
                        Day Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateItineraryDay(idx, 'title', e.target.value)}
                        placeholder="e.g. Srinagar to Gulmarg Excursion"
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[11px] font-semibold text-stone-400">
                        Day Description
                      </label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) =>
                          handleUpdateItineraryDay(idx, 'description', e.target.value)
                        }
                        placeholder="Detailed itinerary summary..."
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-stone-400">
                        Overnight Stay
                      </label>
                      <input
                        type="text"
                        value={item.overnightStay}
                        onChange={(e) =>
                          handleUpdateItineraryDay(idx, 'overnightStay', e.target.value)
                        }
                        placeholder="e.g. Deluxe Hotel, Srinagar"
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-stone-400">
                        Meals Included
                      </label>
                      <input
                        type="text"
                        value={item.mealsIncluded}
                        onChange={(e) =>
                          handleUpdateItineraryDay(idx, 'mealsIncluded', e.target.value)
                        }
                        placeholder="e.g. Breakfast & Dinner"
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Visibility & Status */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-between bg-stone-950 p-4 rounded-xl border">
            <div>
              <span className="text-xs font-bold text-white block">
                Public Website Visibility
              </span>
              <span className="text-[11px] text-stone-400">
                {active
                  ? 'Active: This package is published and live on the public KashmirYatra website.'
                  : 'Inactive: This package is hidden from the public website catalogue.'}
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Changes...' : isEditing ? 'Save Changes' : 'Create Package'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
