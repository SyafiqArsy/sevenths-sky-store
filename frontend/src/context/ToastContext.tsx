"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

import ToastContainer, {
  Toast,
  ToastType,
} from "@/src/components/ui/Toast";

type ToastContextType = {
  showToast: (
    message: string,
    type?: ToastType
  ) => void;
};

const ToastContext =
  createContext<ToastContextType>({
    showToast: () => {},
  });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [toasts, setToasts] = useState<
    Toast[]
  >([]);

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = "info"
    ) => {
      const id =
        Math.random().toString(36).slice(2);

      setToasts((prev) => [
        ...prev,
        { id, type, message },
      ]);
    },
    []
  );

  const removeToast = useCallback(
    (id: string) => {
      setToasts((prev) =>
        prev.filter((t) => t.id !== id)
      );
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
      />
    </ToastContext.Provider>
  );
}
