import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context, Provider } from "../context";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { setUser } = React.useContext(Context);

  if (typeof window !== "undefined") {
    useGoogleOneTapLogin({
      onError: (error) => console.log(error),
      onSuccess: (response) => {
        let userOneTap = {
          profileObj: {
            email: response.email,
            givenName: response.given_name,
            familyName: response.family_name,
          },
        };
        setUser(userOneTap);
      },
      disableCancelOnUnmount: true,
      googleAccountConfigs: {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      },
    });
  }

  return (
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
  );
}

export default MyApp;
