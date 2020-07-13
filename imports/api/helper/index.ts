import { Meteor } from "meteor/meteor"

export const isUser = function() {
  if (!Meteor.userId()) throw new Meteor.Error(403, "Du bist nicht angemeldet.")
}

export const isAdmin = function() {  
  //@ts-ignore
  if (!Meteor.user().isAdmin) throw new Meteor.Error(403,"Du bist kein Admin.")
}
