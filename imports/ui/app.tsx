import * as React from 'react';

import { Meteor } from 'meteor/meteor';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { Authenticated } from './components/authroute';

import UserContext from './contexts/user';

import { IndexPage } from './pages';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';
import { OrderPage } from './pages/order';
import { MePage } from './pages/me';

const Safe = () => <div><p>Safe</p></div>
const AdminPage = () => <div><p>ADMANG!!!</p></div>

export default () => {
  const {isLoggingIn, isLoggedIn, user} = React.useContext(UserContext.Context);
  const { push } = useHistory();

  const Logout = () => {
    Meteor.logout();
    push("/");
  }

  return (
    <>
      {isLoggingIn && <p>Logging in...</p>}
      {isLoggedIn && <p>Hallo, {user?.emails[0]?.address}</p>}
      <ul>
        <li><Link to="/">Index</Link></li>
        {isLoggedIn ? ( 
          <>
          <li><a href="#" onClick={Logout}>Logout</a></li>
          <li><Link to="/order">Bestellen</Link></li>
          <li><Link to="/me">Profil</Link></li>
          </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Anmelden</Link></li>
            </>
          )}
        <li><Link to="/safe">Safe</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup/:signupId" component={SignupPage} />
        
        <Authenticated exact path="/me" component={MePage} redirect="/login" />
        <Authenticated exact path="/order" component={OrderPage} redirect="/login" />
        <Authenticated exact path="/safe" component={Safe} redirect="/login" />
        <Authenticated exact path="/admin" component={AdminPage} admin={true} redirect="/login" />
      </Switch>
    </>
  );
}
