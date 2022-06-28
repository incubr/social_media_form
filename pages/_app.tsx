import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        pauseOnFocusLoss={false}
        draggablePercent={60}
        closeOnClick={true}
        draggable
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
