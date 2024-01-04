"use client";
import "./globals.css";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import Script from "next/script";
import { Provider } from "react-redux";
import { persistor, store } from "@/core/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function RootLayout({ children }) {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <html lang="en">
      <head>
        {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
         */}
      </head>
      <body className="bg-gray-100">
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            {children}
            <Toaster />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></Script>
            <ProgressBar
              height="4px"
              color="#9B66FD"
              options={{ showSpinner: false }}
              shallowRouting
            />
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
