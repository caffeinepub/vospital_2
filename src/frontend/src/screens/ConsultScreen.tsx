import { ChevronRight, Mic, MicOff } from "lucide-react";
import { useState } from "react";

const RECENT_CONSULTS = [
  {
    id: 1,
    patient: "Amara Diallo",
    date: "Yesterday, 11:00 AM",
    duration: "8 min",
  },
  {
    id: 2,
    patient: "Ibrahim Traore",
    date: "Mar 14, 03:15 PM",
    duration: "12 min",
  },
];

export function ConsultScreen() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-vospital-deep px-4 pt-4 pb-4">
        <h1 className="text-white font-bold text-xl">Voice Consult</h1>
      </div>

      <div className="flex-1 px-4 pt-8 pb-4 flex flex-col items-center animate-fade-in">
        {/* Mic icon */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${
            isRecording ? "bg-vospital-primary" : "bg-vospital-pale"
          }`}
        >
          <Mic
            className={`w-8 h-8 ${isRecording ? "text-white" : "text-vospital-primary"}`}
          />
        </div>

        <p className="text-center text-gray-500 text-sm font-medium mb-8">
          {isRecording
            ? "Recording in progress…"
            : "Tap to start voice consultation"}
        </p>

        {/* Big mic button */}
        <button
          type="button"
          data-ocid="consult.mic.primary_button"
          onClick={() => setIsRecording((v) => !v)}
          className={`w-36 h-36 rounded-full flex flex-col items-center justify-center gap-2 shadow-card-lg active:scale-95 transition-all ${
            isRecording ? "bg-vospital-urgent" : "bg-vospital-primary"
          }`}
        >
          {isRecording ? (
            <MicOff className="w-12 h-12 text-white" />
          ) : (
            <Mic className="w-12 h-12 text-white" />
          )}
          <span className="text-white text-xs font-bold">
            {isRecording ? "STOP" : "START"}
          </span>
        </button>

        {/* Connection status */}
        <p className="mt-6 text-sm text-gray-400 font-medium">
          {isRecording ? "Connected to Dr. Amara (Remote)" : "Not connected"}
        </p>

        {/* Recent consults */}
        <div className="w-full mt-10">
          <p className="text-sm font-bold text-gray-700 mb-3">
            Recent Consultations
          </p>
          <div className="space-y-3">
            {RECENT_CONSULTS.map((consult, idx) => (
              <button
                type="button"
                key={consult.id}
                data-ocid={`consult.item.${idx + 1}`}
                className="w-full bg-white rounded-xl shadow-card p-4 flex items-center justify-between border border-gray-100 active:scale-[0.98] transition-transform"
              >
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {consult.patient}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{consult.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {consult.duration}
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
