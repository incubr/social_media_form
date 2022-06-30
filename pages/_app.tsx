import "../styles/globals.css";
import type { AppProps } from "next/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context, Provider } from "../context";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import React from "react";
import googleOneTap from "google-one-tap";
import axios from "axios";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = React.useState<any>();

  React.useEffect(() => {
    let callAbleFunction: any = googleOneTap;
    const options = {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      cancel_on_tap_outside: false,
      context: "signin",
    };
    callAbleFunction(options, async (res: any) => {
      await axios
        .get("https://oauth2.googleapis.com/tokeninfo", {
          params: {
            id_token: res.credential,
          },
        })
        .then((response: any) => {
          let userOneTap = {
            profileObj: {
              email: response.data.email,
              givenName: response.data.given_name,
              familyName: response.data.family_name,
            },
          };
          console.log(userOneTap);
          setUser(userOneTap);
        })
        .catch((err) => {
          toast.error("Error in Google Sign In");
        });
    });
  }, []);

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
      <Component {...pageProps} user={user} />
    </Provider>
  );
}

export default MyApp;
