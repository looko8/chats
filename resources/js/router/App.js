import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppLayout from "../components/layout/AppLayout";
import Login from "../components/Pages/Auth/Login";
import Register from "../components/Pages/Auth/Register";
import Welcome from "../components/Pages/Welcome";

const App = () => {
   return (
       <AppLayout>
           <Router>
               <Switch>
                   <Route exact path="/" component={Welcome} />
                   <Route path="/register" component={Register} />
                   <Route path="/login" component={Login} />
               </Switch>
           </Router>
       </AppLayout>
   )
};

export default App;
