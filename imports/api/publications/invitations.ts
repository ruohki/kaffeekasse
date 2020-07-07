import { Meteor } from "meteor/meteor";
import { check } from 'meteor/check';
import { Invitations } from "../models/invitatios";

Meteor.publish('signup.invitation', function (signupId: string) {
  check(signupId, String);
  return Invitations.find({ _id: signupId });
});