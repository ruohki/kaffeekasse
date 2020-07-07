import '../api/publications';
import '../api/models/invitatios';
import { Accounts } from 'meteor/accounts-base';

import { Meteor } from 'meteor/meteor';
import { Invitations } from '../api/models/invitatios';

/* Accounts.validateNewUser((user: IKaffeeUser) => {
  console.log(user.username)
  if (Invitations.findOne({ _id: user.username })) {
    //Invitations.remove({ _id: user.username });
    return true;
  } else {
  }
}); */

Accounts.onCreateUser((options, user) => {
  if (Invitations.findOne({ _id: user.username })) {
    Invitations.remove({ _id: user.username });
    //@ts-ignore
    return Object.assign(user, { username: options.email })
  }

  throw new Meteor.Error(403, 'Einladung ist nicht gültig');
});