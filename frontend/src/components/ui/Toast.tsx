"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
};

type Props = {
  toasts: Toast[];
  removeToast: (id: string) => void;
};

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colors = {
  success:
    "bg-emerald-50 border-emerald-200 text-emerald-800",
  error:
    "bg-red-50 border-red-200 text-red-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

const iconColors = {
  success: "text-emerald-500",
  error: "text-red-500",
  info: "text-blue-500",
};

export default function ToastContainer({
  toasts,
  removeToast,
}: Props) {
  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={() =>
              removeToast(toast.id)
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: () => void;
}) {
  const [progress, setProgress] =
    useState(100);

  useEffect(() => {
    const duration = 3000;
    const interval = 50;
    const step =
      (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    const dismiss = setTimeout(
      onRemove,
      duration
    );

    return () => {
      clearInterval(timer);
      clearTimeout(dismiss);
    };
  }, [onRemove]);

  const Icon = icons[toast.type];

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: -20,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: 100,
        scale: 0.9,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      className={`
        pointer-events-auto
        w-80
        rounded-2xl
        border
        shadow-lg
        shadow-black/5
        overflow-hidden
        ${colors[toast.type]}
      `}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon
          size={20}
          className={`mt-0.5 flex-shrink-0 ${iconColors[toast.type]}`}
        />

        <p className="flex-1 text-sm font-medium leading-relaxed">
          {toast.message}
        </p>

        <button
          onClick={onRemove}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-black/5">
        <motion.div
          className={`h-full ${
            toast.type === "success"
              ? "bg-emerald-400"
              : toast.type === "error"
              ? "bg-red-400"
              : "bg-blue-400"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}
