import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

interface ProfileBottomSheetProps {
  open: boolean;
  onClose: () => void;
}

export function ProfileBottomSheet({ open, onClose }: ProfileBottomSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — covers only the area above the bottom nav */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bottom-16 z-40 bg-black/50"
            onClick={onClose}
            data-ocid="profile.backdrop"
          />

          {/* Sheet — anchored above bottom nav, full app width */}
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute bottom-16 left-0 right-0 max-h-[60vh] z-50 bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
            data-ocid="profile.sheet"
          >
            {/* Drag handle + close button */}
            <div className="relative flex justify-center items-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1.5 rounded-full bg-gray-300" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 pt-4 pb-6 flex flex-col items-center gap-5 overflow-y-auto">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-vospital-primary flex items-center justify-center shadow-md shrink-0">
                <span className="text-white font-bold text-xl">AM</span>
              </div>

              {/* Name */}
              <p className="text-lg font-bold text-gray-900 -mt-1">CHW Amara</p>

              {/* Info rows */}
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">
                    Role
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    Community Health Worker
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">
                    Organization
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    Vospital Health Network
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="w-full space-y-3 pt-1">
                <button
                  type="button"
                  data-ocid="profile.switch_role.button"
                  onClick={() => toast("Feature coming soon")}
                  className="w-full min-h-[52px] bg-vospital-primary text-white font-bold rounded-xl text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Switch Role
                </button>
                <button
                  type="button"
                  data-ocid="profile.settings.button"
                  onClick={() => toast("Feature coming soon")}
                  className="w-full min-h-[52px] bg-gray-200 text-gray-700 font-bold rounded-xl text-sm tracking-wide hover:bg-gray-300 active:scale-[0.98] transition-all"
                >
                  Settings
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
