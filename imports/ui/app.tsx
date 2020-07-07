import * as React from 'react';

import { Meteor } from 'meteor/meteor';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { Authenticated } from './components/authroute';

import UserContext from './contexts/user';

import { IndexPage } from './pages';
import { LoginPage } from './pages/login';


const Safe = () => <div><p>Safe</p></div>

export default () => {
  const {isLoggingIn, isLoggedIn, user} = React.useContext(UserContext.Context);
  const { push } = useHistory();

  const Logout = () => {
    Meteor.logout();
    push("/");
  }

  return (
    <>
      <h1>Welcome to Meteor!</h1>
      {isLoggingIn && <p>Logging in...</p>}
      {isLoggedIn && <p>Hallo, {user?.username}</p>}

      <ul>
        <li><Link to="/">Index</Link></li>
        {isLoggedIn ? ( 
          <li><a href="#" onClick={Logout}>Logout</a></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
        <li><Link to="/safe">Safe</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/login" component={LoginPage} />
        
        <Authenticated exact path="/safe" component={Safe} redirect="/login" />
      </Switch>
    </>
  );
}
