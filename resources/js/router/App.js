import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "../components/Pages/Auth/Login";
import Register from "../components/Pages/Auth/Register";
import Home from "../components/Pages/Home";

const App = () => {
   return (
       <Router>
           <Switch>
               <Route exact path="/" component={Home} />
               <Route path="/register" component={Register} />
               <Route path="/login" component={Login} />
           </Switch>
       </Router>
   )
};

export default App;
