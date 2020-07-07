import React from 'react';
import UserContext from './contexts/user'
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from './app'
import { BrowserRouter as Router } from 'react-router-dom';

const Providers: React.SFC = (props) => (
  <UserContext.Provider>
    {props.children}
  </UserContext.Provider>
)

const ProvidedApp = () => (
  <Providers>
    <Router>
      <App />
    </Router>
  </Providers>
)

Meteor.startup(() => {
  render(<ProvidedApp />, document.getElementById('react-target'));
});
