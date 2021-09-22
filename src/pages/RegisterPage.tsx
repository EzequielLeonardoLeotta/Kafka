import React from 'react'
import { Route } from 'react-router-dom'
import Register from '../components/Register/Register'
import { ClientRoutes } from '../config/enums'

const RegisterPage: React.FC<{}> = () => {
  return (
    <Route exact path={ClientRoutes.REGISTER}>
      <Register />
    </Route>
  )
}

export default RegisterPage
