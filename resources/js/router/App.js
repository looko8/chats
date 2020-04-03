import React  from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import GuestRoute from "./GuestRoute";
import AuthRoute from "./AuthRoute";
import Login from "../components/Pages/Auth/Login";
import Register from "../components/Pages/Auth/Register";
import Home from "../components/Pages/Home";
import ChatCreate from "../components/Pages/Chat/ChatCreate";
import ChatList from "../components/Pages/Chat/ChatList";
import ChatWindow from "../components/Pages/Chat/ChatWindow";

const App = () => {
   return (
       <Router>
           <Switch>
               <GuestRoute path="/register" component={Register} />
               <GuestRoute path="/login" component={Login} />
               <AuthRoute path="/home" component={Home} />
               <AuthRoute path="/chats/create" component={ChatCreate} />
               <AuthRoute path="/chats/:id" component={ChatWindow} />
               <AuthRoute path="/chats" component={ChatList} />
               <Redirect from="/" to="/home" />
           </Switch>
       </Router>
   )
};

export default App;
