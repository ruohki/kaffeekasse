import * as React from 'react';

import { Button } from 'antd-mobile'
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Products } from '/imports/api/models/products';

export const OrderPage: React.SFC = (props) => {
  const { isReady, products } = useTracker(() => {
    const sub = Meteor.subscribe('products.list');

    const products = Products.find().fetch();

    return {
      products,
      isReady: sub.ready()
    }
  }, [])

  const [ recentlyOrdered, setRecently ] = React.useState<boolean>(false)

  return isReady ? (
    products ? (
      <div>
        <h1>Produkte</h1>
        <ul>
          {products.map(p => <li key={p._id}>
            {p.name} [{p.price.toFixed(2)}€]{' '}
            <Button disabled={recentlyOrdered} onClick={() => {
              setRecently(true);
              Meteor.call('orders.create', { product: p._id, quantity: 1}, (err: Meteor.Error, data: unknown) => {
                if (err) return console.error(err);
                setTimeout(() => setRecently(false), 1000);  
              })
            }}>bestellen</Button>
          </li>)}
        </ul>
      </div>
    ) : (<p>Keine Produkte.</p>)
  ) : (<p>Lade Produkte...</p>)
}