import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import { ProvideData } from "../context/dataContext";
import { ProvideAuth } from "../context/authContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ProvideAuth>
        <ProvideData>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProvideData>
      </ProvideAuth>
    </SessionProvider>
  );
}

export default MyApp;
