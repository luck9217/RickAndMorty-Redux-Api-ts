import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../component/apollo/client";
import { Provider } from "react-redux";
import store from "../component/store/index";
import Head from "next/head";
import { ErrorBoundary } from "../component/error/errorBundary";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Rick and Morty Search App | By Lucas Chavez</title>
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
