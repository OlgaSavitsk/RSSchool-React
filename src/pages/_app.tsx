import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ErrorBoundary } from "src/error-handling/error-boundary";
import LayoutComponent from "@components/app-layout";
import { AppProvider } from "src/store/provider";
import "./index.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <AppProvider>
      <ErrorBoundary>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </ErrorBoundary>
    </AppProvider>
  </Provider>
);

export default App;
