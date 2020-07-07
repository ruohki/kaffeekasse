import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import validator from 'validator';
import moment from 'moment';

interface IInvitation {
  email: string
  createdAt: number
}

export const Invitations = new Mongo.Collection<IInvitation>("invitations");

Meteor.methods({
  'admin.invitation.create': async function (email: string) {
    if (!validator.isEmail(email)) return Error("EMail ist ungültig.");
    //@ts-ignore
    if (!Meteor.user().isAdmin) return Error("Du bist kein Admin.")
    
    await Invitations.insert({ 
      email,
      createdAt: moment().valueOf()
    })
  }
})