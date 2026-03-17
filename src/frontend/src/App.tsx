import { useEffect, useState } from "react";
import { BottomNav, type TabKey } from "./components/BottomNav";
import { ConsultScreen } from "./screens/ConsultScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { PatientsScreen } from "./screens/PatientsScreen";
import { SyncScreen } from "./screens/SyncScreen";
import { VisitScreen } from "./screens/VisitScreen";

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.warn("SW registration failed:", err));
    }
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigate={setActiveTab} />;
      case "patients":
        return <PatientsScreen />;
      case "visit":
        return <VisitScreen />;
      case "consult":
        return <ConsultScreen />;
      case "sync":
        return <SyncScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      {/* Phone frame on desktop */}
      <div className="w-full max-w-[480px] min-h-screen bg-background relative flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.18)]">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto pb-16">{renderScreen()}</div>

        {/* Fixed bottom nav */}
        <BottomNav active={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
