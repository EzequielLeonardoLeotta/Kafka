import React from 'react'
import { Route } from 'react-router-dom'
import Notices from '../components/Notices/Notices'
import { ClientRoutes } from '../config/enums'

const RestaurantMenuPage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.RESTAURANT_MENU}>
      <Notices />
    </Route>
  )
}

export default RestaurantMenuPage
