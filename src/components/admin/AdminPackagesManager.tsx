import React, { useState, useEffect } from 'react';
import { Package, PackageCategory } from '../../types';
import {
  getAllPackagesForAdmin,
  savePackage,
  togglePackageActive,
  deletePackage,
  migrateStaticPackagesToFirestore,
} from '../../lib/packageService';
import { PackageEditorModal } from './PackageEditorModal';
import {
  Package as PackageIcon,
  Plus,
  Edit,
  Power,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Database,
  ArrowUpDown,
  IndianRupee,
  Clock,
  Sparkles,
  AlertCircle,
  Loader2,
  RefreshCw,
  Eye,
  EyeOff,
} from 'lucide-react';

export const AdminPackagesManager: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFromFirestore, setIsFromFirestore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingPackage, setEditingPackage] = useState<Package | null | undefined>(undefined);
  // undefined: modal closed, null: add new, Package: edit existing

  const [migrating, setMigrating] = useState(false);
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadPackages = async () => {
    setLoading(true);
    try {
      const result = await getAllPackagesForAdmin();
      setPackages(result.packages);
      setIsFromFirestore(result.isFromFirestore);
    } catch (err: any) {
      setActionNotice({ type: 'error', message: err.message || 'Failed to load packages' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleMigrate = async () => {
    setMigrating(true);
    setActionNotice(null);
    try {
      const res = await migrateStaticPackagesToFirestore();
      if (res.error) {
        setActionNotice({ type: 'error', message: `Migration notice: ${res.error}` });
      } else {
        setActionNotice({
          type: 'success',
          message: `Successfully synchronized ${res.count} packages into Cloud Firestore!`,
        });
      }
      await loadPackages();
    } catch (err: any) {
      setActionNotice({ type: 'error', message: err.message || 'Migration failed' });
    } finally {
      setMigrating(false);
    }
  };

  const handleToggleActive = async (pkg: Package) => {
    setActionNotice(null);
    const currentActive = pkg.active !== false;
    try {
      const res = await togglePackageActive(pkg.id, currentActive);
      if (res.success) {
        setPackages((prev) =>
          prev.map((p) => (p.id === pkg.id ? { ...p, active: !currentActive } : p))
        );
        setActionNotice({
          type: 'success',
          message: `Package "${pkg.title}" is now ${!currentActive ? 'ACTIVE (Live on website)' : 'INACTIVE (Hidden)'}.`,
        });
      } else {
        setActionNotice({ type: 'error', message: res.error || 'Failed to toggle status' });
      }
    } catch (err: any) {
      setActionNotice({ type: 'error', message: err.message || 'Action failed' });
    }
  };

  const handleDelete = async (pkg: Package) => {
    if (!window.confirm(`Are you sure you want to delete package "${pkg.title}"?`)) {
      return;
    }
    try {
      const res = await deletePackage(pkg.id);
      if (res.success) {
        setPackages((prev) => prev.filter((p) => p.id !== pkg.id));
        setActionNotice({
          type: 'success',
          message: `Package "${pkg.title}" has been deleted.`,
        });
      } else {
        setActionNotice({ type: 'error', message: res.error || 'Failed to delete package' });
      }
    } catch (err: any) {
      setActionNotice({ type: 'error', message: err.message || 'Delete failed' });
    }
  };

  const handleSavePackage = async (savedPkg: Package) => {
    try {
      const res = await savePackage(savedPkg);
      if (res.success) {
        setPackages((prev) => {
          const exists = prev.some((p) => p.id === savedPkg.id);
          if (exists) {
            return prev.map((p) => (p.id === savedPkg.id ? savedPkg : p));
          }
          return [savedPkg, ...prev];
        });
        setActionNotice({
          type: 'success',
          message: `Package "${savedPkg.title}" saved successfully (Price: ₹${savedPkg.startingPricePerPerson.toLocaleString('en-IN')}).`,
        });
      } else {
        setActionNotice({ type: 'error', message: res.error || 'Failed to save package' });
      }
    } catch (err: any) {
      setActionNotice({ type: 'error', message: err.message || 'Save failed' });
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destinationsCovered?.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Action Notification */}
      {actionNotice && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between gap-3 border ${
            actionNotice.type === 'success'
              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/70 border-red-500/40 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {actionNotice.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{actionNotice.message}</span>
          </div>
          <button
            onClick={() => setActionNotice(null)}
            className="text-stone-400 hover:text-white text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Management Card */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Top Control Bar */}
        <div className="p-5 sm:p-6 border-b border-stone-800 bg-stone-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <PackageIcon className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-serif font-bold text-white">
                Kashmir Tour Packages Management
              </h2>
            </div>
            <p className="text-xs text-stone-400">
              Manage tour listings, update pricing, edit itineraries, and toggle live visibility on the website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Sync / Migrate Button */}
            <button
              onClick={handleMigrate}
              disabled={migrating}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer disabled:opacity-50"
              title="Sync static catalogue packages to Cloud Firestore safely"
            >
              {migrating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              ) : (
                <Database className="w-3.5 h-3.5 text-blue-400" />
              )}
              <span>{migrating ? 'Syncing to Firestore...' : 'Sync Data to Firestore'}</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={loadPackages}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors cursor-pointer"
              title="Refresh package listings"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {/* Add Package Button */}
            <button
              onClick={() => setEditingPackage(null)}
              id="admin-add-package-btn"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Package</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['all', 'holiday', 'offbeat', 'adventure'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : 'bg-stone-800/80 text-stone-400 hover:text-stone-200 border border-transparent'
                }`}
              >
                {cat === 'all'
                  ? 'All Packages'
                  : cat === 'holiday'
                  ? 'Holiday Packages'
                  : cat === 'offbeat'
                  ? 'Offbeat Valleys'
                  : 'Adventure Tours'}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by package or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Packages List Table */}
        {loading ? (
          <div className="py-16 text-center text-stone-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-400" />
            <p className="text-xs">Loading Kashmir tour catalogue...</p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="py-16 text-center text-stone-400 space-y-3">
            <PackageIcon className="w-10 h-10 mx-auto text-stone-600" />
            <p className="text-xs">No tour packages match the selected criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-800 bg-stone-950/60 text-stone-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4 sm:px-6">Package Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Duration & Nights</th>
                  <th className="py-3.5 px-4">Starting Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80">
                {filteredPackages.map((pkg) => {
                  const isActive = pkg.active !== false;
                  return (
                    <tr
                      key={pkg.id}
                      className="hover:bg-stone-800/30 transition-colors group"
                    >
                      {/* Package Name & Image */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={pkg.image}
                            alt={pkg.title}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover border border-stone-700 shrink-0"
                          />
                          <div className="space-y-0.5 max-w-xs">
                            <span className="font-bold text-white block truncate">
                              {pkg.title}
                            </span>
                            <span className="text-[11px] text-stone-400 truncate block">
                              {pkg.tagline || pkg.destinationsCovered?.slice(0, 3).join(', ')}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider ${
                            pkg.category === 'holiday'
                              ? 'bg-blue-950/80 text-blue-300 border border-blue-500/30'
                              : pkg.category === 'offbeat'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {pkg.category}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-4 text-stone-300">
                        <div className="space-y-0.5">
                          <span className="font-medium block">{pkg.duration}</span>
                          <span className="text-[11px] text-stone-500">
                            {pkg.nightsCount}N / {pkg.daysCount}D
                          </span>
                        </div>
                      </td>

                      {/* Starting Price */}
                      <td className="py-4 px-4">
                        <div className="font-mono text-emerald-400 font-bold text-sm">
                          ₹{pkg.startingPricePerPerson.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-stone-500">per person</span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isActive
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                              : 'bg-stone-800 text-stone-400 border border-stone-700'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'
                            }`}
                          />
                          {isActive ? 'Active (Live)' : 'Inactive (Hidden)'}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Button */}
                          <button
                            onClick={() => setEditingPackage(pkg)}
                            id={`admin-edit-pkg-${pkg.id}`}
                            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer"
                            title="Edit Package Details & Price"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          {/* Activate / Deactivate Toggle Button */}
                          <button
                            onClick={() => handleToggleActive(pkg)}
                            id={`admin-toggle-pkg-${pkg.id}`}
                            className={`p-2 rounded-lg transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30'
                            }`}
                            title={isActive ? 'Deactivate Package (Hide from public)' : 'Activate Package (Show on public site)'}
                          >
                            {isActive ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(pkg)}
                            id={`admin-delete-pkg-${pkg.id}`}
                            className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/80 text-red-400 hover:text-red-200 transition-colors cursor-pointer"
                            title="Delete Package"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Package Editor Modal */}
      {editingPackage !== undefined && (
        <PackageEditorModal
          pkg={editingPackage}
          isOpen={true}
          onClose={() => setEditingPackage(undefined)}
          onSave={handleSavePackage}
        />
      )}
    </div>
  );
};
