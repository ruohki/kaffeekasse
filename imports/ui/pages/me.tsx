import * as React from 'react';
import * as lodash from 'lodash';
import moment from 'moment';
import 'moment/locale/de';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Products } from '/imports/api/models/products';
import { Orders } from '/imports/api/models/orders';

export const MePage: React.SFC = (props) => {
  const { isReady, orders, products } = useTracker(() => {
    const sub = Meteor.subscribe('orders.list', 5);

    const orders = Orders.find({},{sort: { createdAt: -1}} ).fetch();
    const products = Products.find().fetch();
    
    return {
      products,
      orders,
      isReady: sub.ready()
    }
  }, [ Meteor.userId() ])

  return isReady ? (
    products ? (
      <div>
        <h1>Meine letzten bestellungen</h1>
        <ul>
          {orders.map(o => {
            const product = lodash.find(products, p => o.product === p._id)
            if(!product) return null;

            return <li key={o._id}>{product.name} [{product.price.toFixed(2)}€] - {moment(o.createdAt).format('DD.MM.YY HH:mm')}</li>
          )}
        </ul>
      </div>
    ) : (<p>Keine Produkte.</p>)
  ) : (<p>Lade Produkte...</p>)
}