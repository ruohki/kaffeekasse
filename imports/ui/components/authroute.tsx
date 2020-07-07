import * as React from 'react';

import UserContext from '../contexts/user';
import { RouteProps, Route, Redirect } from 'react-router-dom';

interface IAuthenticated extends RouteProps {
  redirect: string
}

export const Authenticated: React.SFC<IAuthenticated> = ({ redirect,  ...props }) => {
  const { isLoggedIn, isLoggingIn } = React.useContext(UserContext.Context)

  return isLoggedIn ? (
    <Route {...props} />
  ) : (
    isLoggingIn ? (
      <div />
    ) : (
      <Redirect to={redirect} />
    )
  )
}