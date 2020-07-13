import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';

import moment from 'moment';
import { check } from 'meteor/check';
import { isAdmin, isUser } from '../helper';
import { Products } from './products';

interface IOrder {
  _id: string
  user: string
  product: string
  quantity: number
  createdAt: number
}

export const Orders = new Mongo.Collection<IOrder>("orders");

Meteor.methods({
  'orders.create': async function (order: Pick<IOrder, 'product' | 'quantity'>): Promise<string> {
    const { product, quantity } = order;
    
    check(product, String);
    check(quantity, Number)
    
    isAdmin();
    
    const user = this.userId as string;
    return await Orders.insert({ 
      product,
      quantity,
      user,
      createdAt: moment().valueOf()
    });
  }
})

if (Meteor.isServer) {
  publishComposite('orders.list', function(limit: number = 5) {
    return {
      find() {
        isUser();
        console.log("Hmm")
        return Orders.find({}, { limit, sort: { createdAt: -1 } });
      },
      children: [{
        find(order: IOrder) {
          console.log(order)
          return Products.find({ _id: order.product })
        }
      }]
    }
  })
}