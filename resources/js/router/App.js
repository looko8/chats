import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GuestRoute from "./GuestRoute";
import AuthRoute from "./AuthRoute";
import Login from "../components/Pages/Auth/Login";
import Register from "../components/Pages/Auth/Register";
import Home from "../components/Pages/Home";

const App = () => {
   return (
       <Router>
           <Switch>
               <AuthRoute path="/home" component={Home} />
               <GuestRoute path="/register" component={Register} />
               <GuestRoute path="/login" component={Login} />
           </Switch>
       </Router>
   )
};

export default App;
