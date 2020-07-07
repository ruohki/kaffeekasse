import * as React from 'react';

import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { IKaffeeUser } from '/imports/api/models/user';

export interface IUserContext {
  isLoggedIn: boolean
  isLoggingIn: boolean
  userId?: string | null
  user?: IKaffeeUser | null
}

const userContext = React.createContext<Partial<IUserContext>>({});

const Provider = userContext.Provider;


const Component: React.SFC = (props) => {

  const { isLoggedIn, isLoggingIn, user, userId} = useTracker(() => {
    const user = Meteor.user() as IKaffeeUser
    const userId = Meteor.userId()
    return {
      user,
      userId,
      isLoggingIn: Meteor.loggingIn(),
      isLoggedIn: !!userId
    }
  }, [])

  React.useEffect(() => {
    const sub = Meteor.subscribe("internal.user")
    return () => sub.stop();
  }, [])

  const value = React.useMemo(() => ({
    isLoggedIn, isLoggingIn, user, userId
  }), [ isLoggedIn, isLoggingIn, user, userId ])

  return (
    <Provider value={value}>
      {props.children}
    </Provider>
  )
}

export default {
  Provider: Component,
  Context: userContext
}