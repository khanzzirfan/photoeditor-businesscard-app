import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApps } from "firebase/app";
import { AppProps } from "next/app";
import firebaseConfig from "../firebaseConfig";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  if (process.browser && !getApps().length) {
    initializeApp(firebaseConfig);
    if (process.env.NODE_ENV === "production") {
      getAnalytics();
    }
  }

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
