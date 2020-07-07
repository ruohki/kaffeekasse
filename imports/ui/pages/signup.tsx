import * as React from 'react';

import {Accounts} from 'meteor/accounts-base';

import { useHistory, useParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Invitations } from '/imports/api/models/invitatios';

export const SignupPage: React.SFC = (props) => {
  const { signupId } = useParams();
  
  const { isReady, invitation } = useTracker(() => {
    const sub = Meteor.subscribe('signup.invitation', signupId);

    const invitation = Invitations.findOne({ _id: signupId });

    return {
      invitation,
      isReady: sub.ready()
    }
  }, [ signupId ])
  
  const [ pass, setPass ] = React.useState("");
  

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    Accounts.createUser({ username: signupId, password: pass, email: invitation?.email }, (err) => {
      if (err) {
        console.log(err);
        return;
      };
      history.push("/");
    })
  }

  return isReady ? (
    invitation ? (
      <div>
        <form
          onSubmit={handleSubmit}
          >
          <p>Hallo diese Einladung gilt für: {invitation?.email}</p>
          <span>Passwort:</span>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} />
          <button type="submit">Anmelden</button>
        </form>
      </div>
    ) : ( <p>Einladung ist ungültig.</p> )
  ) : ( <p>Lade Einladung...</p> )
}