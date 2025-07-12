"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-900 group-[.toaster]:border group-[.toaster]:border-neutral-300 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-neutral-600",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
