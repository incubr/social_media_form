import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Provider>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          pauseOnFocusLoss={false}
          draggablePercent={60}
          closeOnClick={true}
          draggable
        />
        <Component {...pageProps} />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
