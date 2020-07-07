import * as React from 'react';

import UserContext from '../contexts/user';
import { RouteProps, Route, Redirect } from 'react-router-dom';

interface IAuthenticated extends RouteProps {
  redirect: string
  admin?: boolean
}

export const Authenticated: React.SFC<IAuthenticated> = ({ redirect, admin,  ...props }) => {
  const { isLoggedIn, isLoggingIn, user } = React.useContext(UserContext.Context)

  if (admin && !user?.isAdmin) return <Redirect to={redirect} />

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

Authenticated.defaultProps = {
  admin: false
}