"use client";
import {Toaster} from "react-hot-toast";
import "./shared-styles.scss";

// Toaster needs to stay in the main layout but it's a client side component so this is a client side wrapper for it.
export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: 0,
          background: "var(--blue)",
          color: "var(--white)",
        },
      }}
    />
  );
}
