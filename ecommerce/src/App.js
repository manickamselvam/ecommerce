import { Route, Switch } from "react-router-dom";
// import { Login, Register } from ".";
// import { Home } from "./pages";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
const App = () => {
  return (
    <>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
      </Switch>
    </>
  );
};
export default App;
