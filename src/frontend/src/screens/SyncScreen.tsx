import {
  CheckCircle2,
  ClipboardList,
  FileText,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useState } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

const PENDING_VISITS = [
  {
    id: 1,
    patient: "Amara Diallo",
    date: "Mar 17, 08:00 AM",
    type: "Visit Record",
  },
  {
    id: 2,
    patient: "Kwame Asante",
    date: "Mar 17, 09:30 AM",
    type: "Visit Record",
  },
  {
    id: 3,
    patient: "Ama Mensah",
    date: "Mar 16, 02:15 PM",
    type: "Visit Record",
  },
];

const PENDING_FORMS = [
  {
    id: 1,
    patient: "Fatima Ouedraogo",
    date: "Mar 16, 11:00 AM",
    type: "Antenatal Screening",
  },
];

export function SyncScreen() {
  const isOnline = useOnlineStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);

  const handleSync = () => {
    if (!isOnline || isSyncing) return;
    setIsSyncing(true);
    setSyncDone(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncDone(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-vospital-deep px-4 pt-4 pb-4">
        <h1 className="text-white font-bold text-xl">Sync Data</h1>
      </div>

      <div className="flex-1 px-4 pt-4 pb-4 space-y-4 animate-fade-in">
        {/* Status banner */}
        <div
          data-ocid="sync.status.panel"
          className={`rounded-xl px-4 py-3 flex items-center gap-3 ${
            isOnline
              ? "bg-vospital-pale"
              : "bg-orange-50 border border-orange-200"
          }`}
        >
          {isOnline ? (
            <Wifi className="w-5 h-5 text-vospital-primary flex-shrink-0" />
          ) : (
            <WifiOff className="w-5 h-5 text-orange-500 flex-shrink-0" />
          )}
          <div>
            <p
              className={`text-sm font-bold ${
                isOnline ? "text-vospital-primary" : "text-orange-700"
              }`}
            >
              {isOnline ? "Connected" : "Offline"}
            </p>
            <p className="text-xs text-gray-500">Last synced: 14 minutes ago</p>
          </div>
        </div>

        {/* Sync done */}
        {syncDone && (
          <div
            data-ocid="sync.success_state"
            className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm font-bold text-green-700">
              All data synced successfully!
            </p>
          </div>
        )}

        {/* Pending visits */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">
            Pending Visits ({PENDING_VISITS.length})
          </p>
          <div className="space-y-2">
            {PENDING_VISITS.map((visit, idx) => (
              <div
                key={visit.id}
                data-ocid={`sync.visit.item.${idx + 1}`}
                className="bg-white rounded-xl shadow-card p-4 flex items-center justify-between border-l-4 border-l-orange-400"
              >
                <div className="flex items-center gap-3">
                  <ClipboardList className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {visit.patient}
                    </p>
                    <p className="text-xs text-gray-500">
                      {visit.date} · {visit.type}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending forms */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">
            Pending Forms ({PENDING_FORMS.length})
          </p>
          <div className="space-y-2">
            {PENDING_FORMS.map((form, idx) => (
              <div
                key={form.id}
                data-ocid={`sync.form.item.${idx + 1}`}
                className="bg-white rounded-xl shadow-card p-4 flex items-center justify-between border-l-4 border-l-orange-400"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {form.patient}
                    </p>
                    <p className="text-xs text-gray-500">
                      {form.date} · {form.type}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sync button */}
        <button
          type="button"
          data-ocid="sync.sync_all.primary_button"
          onClick={handleSync}
          disabled={!isOnline || isSyncing}
          className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all ${
            isOnline && !isSyncing
              ? "bg-vospital-primary text-white hover:opacity-90 active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isSyncing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span data-ocid="sync.loading_state">Syncing…</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Sync All (4 items)
            </>
          )}
        </button>
      </div>
    </div>
  );
}
