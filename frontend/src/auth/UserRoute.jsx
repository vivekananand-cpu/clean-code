import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../helper/auth'


const UserRoute = ({Child}) => {
  return isAuthenticated() && isAuthenticated().user.role === 0 ? <Child /> : <Navigate to='/signin' />
  
}

export default UserRoute