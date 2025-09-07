import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/Login";

import SignUp from "./components/SignUp";

import Dashboard from "./components/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />

      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default App;
