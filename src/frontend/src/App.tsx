import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { BottomNav, type TabKey } from "./components/BottomNav";
import { ConsentScreen } from "./screens/ConsentScreen";
import { ConsultScreen } from "./screens/ConsultScreen";
import { CreateAccountScreen } from "./screens/CreateAccountScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { PatientsScreen } from "./screens/PatientsScreen";
import { SyncScreen } from "./screens/SyncScreen";
import { VisitScreen } from "./screens/VisitScreen";

type AppScreen = "login" | "create-account" | "consent" | "dashboard";

function App() {
  const [appScreen, setAppScreen] = useState<AppScreen>("login");
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.warn("SW registration failed:", err));
    }
  }, []);

  const handleLogin = () => {
    const alreadyAgreed = localStorage.getItem("vospital_consent_agreed");
    if (alreadyAgreed) {
      setAppScreen("dashboard");
    } else {
      setAppScreen("consent");
    }
  };

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

  if (appScreen === "login") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-start justify-center">
        <div className="w-full max-w-[480px] min-h-screen bg-background relative flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.18)]">
          <LoginScreen
            onLogin={handleLogin}
            onCreateAccount={() => setAppScreen("create-account")}
          />
        </div>
        <Toaster position="top-center" />
      </div>
    );
  }

  if (appScreen === "create-account") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-start justify-center">
        <div className="w-full max-w-[480px] min-h-screen bg-background relative flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.18)]">
          <CreateAccountScreen onBack={() => setAppScreen("login")} />
        </div>
        <Toaster position="top-center" />
      </div>
    );
  }

  if (appScreen === "consent") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-start justify-center">
        <div className="w-full max-w-[480px] min-h-screen bg-background relative flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.18)]">
          <ConsentScreen
            onAgree={() => setAppScreen("dashboard")}
            onDecline={() => setAppScreen("login")}
          />
        </div>
        <Toaster position="top-center" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      {/* Phone frame on desktop */}
      <div className="w-full max-w-[480px] min-h-screen bg-background relative flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.18)]">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto pb-16">{renderScreen()}</div>

        {/* Fixed bottom nav */}
        <BottomNav active={activeTab} onChange={setActiveTab} />
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
