import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import validator from 'validator';
import moment from 'moment';
import { isAdmin } from '../helper';
import { check } from 'meteor/check';

interface IInvitation {
  email: string
  createdAt: number
}

export const Invitations = new Mongo.Collection<IInvitation>("invitations");

Meteor.methods({
  'admin.invitation.create': async function (email: string): Promise<string> {
    if (!validator.isEmail(email)) throw Error("EMail ist ungültig.");
    
    isAdmin();
    
    return await Invitations.insert({ 
      email,
      createdAt: moment().valueOf()
    })
  }
})

if (Meteor.isServer) {
  Meteor.publish('signup.invitation', function (signupId: string) {
    check(signupId, String);
    return Invitations.find({ _id: signupId });
  });
}