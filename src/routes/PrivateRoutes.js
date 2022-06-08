import { Outlet, Navigate } from 'react-router-dom';
import {useContext} from 'react'
import {UserContext } from '../context/UserProvider'
import {getRolUser } from '../utils/getRolUser'


export const PrivateRoutes = ({roles = []}) => {

    const {user}  = useContext(UserContext )

    if (!user) return <Navigate to="/login" />;

    const userRol = getRolUser(user)
    console.log(userRol)

    return roles.includes(userRol) ? <Outlet/> : <Navigate to="/login" />

}