import * as React from 'react';
import { Meteor } from 'meteor/meteor';
import { useHistory } from 'react-router-dom';

export const LoginPage: React.SFC = (props) => {
  const [ user, setUser ] = React.useState("");
  const [ pass, setPass ] = React.useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(user, pass, (err) => {
      if (err) return;
      history.push("/");
    })
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
      >
        <span>Benutzername:</span>
        <input value={user} onChange={e => setUser(e.target.value)} />
        <span>Passwort:</span>
        <input type="password" value={pass} onChange={e => setPass(e.target.value)} />
        <button type="submit">Anmelden</button>
      </form>
    </div>
  )
}