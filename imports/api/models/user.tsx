import { Meteor } from "meteor/meteor";

export interface IKaffeeUser extends Meteor.User {
  isAdmin: boolean
}