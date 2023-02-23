import "@/styles/globals.css";
import localFont from "@next/font/local";
import type { AppProps } from "next/app";
const supreme = localFont({ src: "./Supreme-Variable.woff2" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        * {
          font-family: ${supreme.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
