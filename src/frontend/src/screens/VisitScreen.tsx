import { ChevronRight, ClipboardList } from "lucide-react";

const RECENT_VISITS = [
  {
    id: 1,
    patient: "Fatima Ouedraogo",
    date: "Today, 09:15 AM",
    status: "Draft",
  },
  {
    id: 2,
    patient: "Kwame Asante",
    date: "Yesterday, 02:30 PM",
    status: "Draft",
  },
];

export function VisitScreen() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-vospital-deep px-4 pt-4 pb-4">
        <h1 className="text-white font-bold text-xl">New Visit</h1>
      </div>

      <div className="flex-1 px-4 pt-8 pb-4 flex flex-col items-center animate-fade-in">
        {/* Illustration */}
        <div className="w-32 h-32 bg-vospital-pale rounded-full flex items-center justify-center mb-6">
          <ClipboardList
            className="w-16 h-16 text-vospital-primary"
            strokeWidth={1.5}
          />
        </div>

        <p className="text-center text-gray-500 text-sm font-medium mb-8 max-w-[240px]">
          Select a patient to begin recording a visit
        </p>

        <button
          type="button"
          data-ocid="visit.start.primary_button"
          className="w-full max-w-[320px] py-4 bg-vospital-primary text-white font-bold rounded-xl text-base tracking-wide hover:opacity-90 active:scale-[0.98] transition-all shadow-card"
        >
          Start Visit
        </button>

        {/* Recent visits */}
        <div className="w-full mt-10">
          <p className="text-sm font-bold text-gray-700 mb-3">Recent Visits</p>
          <div className="space-y-3">
            {RECENT_VISITS.map((visit, idx) => (
              <button
                type="button"
                key={visit.id}
                data-ocid={`visit.item.${idx + 1}`}
                className="w-full bg-white rounded-xl shadow-card p-4 flex items-center justify-between border border-gray-100 active:scale-[0.98] transition-transform"
              >
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {visit.patient}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{visit.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                    {visit.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
