import {
  DownloadCloud,
  Mic,
  RefreshCw,
  Search,
  Stethoscope,
  Users,
} from "lucide-react";
import type { TabKey } from "../components/BottomNav";
import { StatusBar } from "../components/StatusBar";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

interface HomeScreenProps {
  onNavigate: (tab: TabKey) => void;
}

const quickActions = [
  {
    key: "new-visit",
    label: "New Visit",
    icon: Stethoscope,
    bg: "bg-white",
    tab: "visit" as TabKey,
  },
  {
    key: "find-patient",
    label: "Find Patient",
    icon: Search,
    bg: "bg-vospital-pale",
    tab: "patients" as TabKey,
  },
  {
    key: "voice-consult",
    label: "Voice Consult",
    icon: Mic,
    bg: "bg-vospital-pale",
    tab: "consult" as TabKey,
  },
  {
    key: "pending-sync",
    label: "Pending Sync",
    icon: RefreshCw,
    bg: "bg-white",
    tab: "sync" as TabKey,
    badge: 4,
  },
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { canInstall, installApp } = useInstallPrompt();

  return (
    <div className="flex flex-col min-h-full">
      <StatusBar />

      {/* App bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-xs">
        <div>
          <p className="text-xs text-gray-500 font-medium">Good morning,</p>
          <p className="text-base font-bold text-gray-900">CHW Sarah</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-vospital-primary flex items-center justify-center">
          <span className="text-white font-bold text-sm">SM</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 pt-4 pb-4 space-y-4 animate-fade-in">
        {/* Queue card */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Today&apos;s Patient Queue
              </p>
              <p className="text-5xl font-extrabold text-vospital-primary leading-none mt-1">
                12
              </p>
              <p className="text-sm text-gray-500 mt-1">Patients waiting</p>
            </div>
            <div className="w-12 h-12 bg-vospital-pale rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-vospital-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-vospital-urgent" />
            <span className="text-sm font-semibold text-vospital-urgent">
              3 Urgent Cases
            </span>
          </div>
          <button
            type="button"
            data-ocid="home.view_queue.primary_button"
            onClick={() => onNavigate("patients")}
            className="w-full py-3.5 bg-vospital-primary text-white font-bold rounded-xl text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all"
          >
            View Queue
          </button>
        </div>

        {/* Quick actions */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-3">Quick Actions</p>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  type="button"
                  key={action.key}
                  data-ocid={`home.${action.key}.button`}
                  onClick={() => onNavigate(action.tab)}
                  className={`${action.bg} rounded-2xl shadow-card p-4 flex flex-col items-center justify-center gap-2.5 min-h-[130px] relative active:scale-[0.97] transition-transform border border-gray-100`}
                >
                  {action.badge && (
                    <span className="absolute top-3 right-3 bg-vospital-urgent text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {action.badge}
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-vospital-pale flex items-center justify-center">
                    <Icon
                      className="w-6 h-6 text-vospital-primary"
                      strokeWidth={2}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-800 text-center">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Install banner */}
        {canInstall && (
          <div className="bg-vospital-pale border border-vospital-primary/20 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DownloadCloud className="w-6 h-6 text-vospital-primary flex-shrink-0" />
              <p className="text-sm font-semibold text-gray-800">
                Add Vospital to your home screen
              </p>
            </div>
            <button
              type="button"
              data-ocid="home.install.button"
              onClick={installApp}
              className="ml-2 px-3 py-1.5 bg-vospital-primary text-white text-xs font-bold rounded-lg flex-shrink-0"
            >
              Install
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
