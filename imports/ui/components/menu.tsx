import * as React from 'react';
import { TabBar } from 'antd-mobile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHistory, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export const Menu = (props) => {

    return (
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            title="Historie"
            key="history"
            icon={<FontAwesomeIcon icon={faHistory} />}
          >
            {props.children}
          </TabBar.Item>
          <TabBar.Item
            title="Bestellen"
            key="order"
            icon={<FontAwesomeIcon icon={faCoffee} />}
          >
            {props.children}
          </TabBar.Item>
          <TabBar.Item
            title="Verwalten"
            key="admin"
            icon={<FontAwesomeIcon icon={faKey} />}
          >
            {props.children}
          </TabBar.Item>
          <TabBar.Item
            title="Abmelden"
            key="logout"
            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
          >
            {props.children}
          </TabBar.Item>
        </TabBar>
      
    )
}