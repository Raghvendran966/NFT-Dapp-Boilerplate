import React from "react";
import { useWeb3React } from "@web3-react/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Loader from "./components/Loader/Loader";

const App = () => {
  const { active } = useWeb3React();

  let mainContent = (
    <>
      <Route
        exact
        path="/"
        component={React.lazy(() => import("./views/Login/Login"))}
      />
      {localStorage.getItem("userData") === null && <Redirect to="/" />}
    </>
  );

  if (active) {
    mainContent = (
      <>
        <Route
          path="/"
          component={React.lazy(() =>
            import("./views/MainContainer/MainContainer")
          )}
        />
      </>
    );
  }

  return (
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Switch>{mainContent}</Switch>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
