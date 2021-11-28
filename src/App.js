import React, {useEffect, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useMoralis } from "react-moralis";
const Layout = lazy(() => import("./containers/Layout"));
const Page404 = lazy(() => import("./pages/404"));

function App() {

  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
  return (
    <Switch>
      <Redirect exact from="/" to="/app/portfolio" />
      <Layout />
      <Route path="*" element={Page404} />
    </Switch>
  );
}

export default App;
