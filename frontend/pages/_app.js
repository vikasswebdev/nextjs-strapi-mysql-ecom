import { useEffect, useState } from "react";
import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { DataProvider } from "../store";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  <Head>
    <meta
      name="viewport"
      content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
    />
  </Head>;

  return (
    <>
      <DataProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </DataProvider>
    </>
  );
}

export default MyApp;
