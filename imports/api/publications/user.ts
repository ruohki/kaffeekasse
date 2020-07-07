import { Meteor } from "meteor/meteor";

Meteor.publish('internal.user', function () {
  if (!this.userId) {
      return this.ready();
  }
  return Meteor.users.find({_id: this.userId}, {fields: { isAdmin: 1}});
});