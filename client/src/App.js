import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Home from "../src/components/pages/Home";
import Login from "../src/components/pages/Login";
import Register from "../src/components/pages/Register";
import "./App.css";
import Menubar from "./components/MenuBar";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Menubar />
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
