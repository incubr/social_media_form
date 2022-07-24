import React from "react";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { AiOutlineGoogle } from "react-icons/ai";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginWithGoogle() {
  const { setUser } = React.useContext(Context);

  const onSuccess = async(data: any) => {
    await axios
      .get("https://oauth2.googleapis.com/tokeninfo", {
        params: {
          id_token: data.credential,
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
        setUser(userOneTap);
      })
      .catch((err) => {
        toast.error("Error in Google Sign In");
      });
    console.log(data);
  };

  useGoogleOneTapLogin({
    onSuccess,
    onError: () => {
      console.log("err");
    },
  });

  const login = useGoogleLogin({
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (err) => {
      console.log(err);
    },
    flow: "implicit",
  });

  return (
    <>
      <button
        onClick={() => login()}
        className=" text-2xl px-10 rounded-full flex items-center font-[TitleFont] tracking-widest font-bold space-x-4 bg-[#1F1D1D] p-5"
      >
        <AiOutlineGoogle size={35} />
        <span className="mt-1">Sign In with Google</span>
      </button>
    </>
  );
}
