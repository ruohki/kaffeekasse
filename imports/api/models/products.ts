import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import moment from 'moment';
import { check } from 'meteor/check';
import { isAdmin, isUser } from '../helper';

interface IProduct {
  _id: string
  name: string
  price: number
  visible?: boolean
  createdAt: number
}

export const Products = new Mongo.Collection<IProduct>("products");

Meteor.methods({
  'admin.products.create': async function (product: Omit<Omit<IProduct, '_id'>,'createdAt'>): Promise<string> {
    const { name, price } = product;
    check(name, String);
    check(price, Number)

    isAdmin();

    return await Products.insert({ 
      name,
      price,
      createdAt: moment().valueOf()
    })
  }
})

if (Meteor.isServer) {
  Meteor.publish('products.list', function() {
    isUser();
    return Products.find({ visible: true });
  })
}