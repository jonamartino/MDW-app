import { User } from "firebase/auth";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children, user}: {children: JSX.Element, user: User }) => {
    return user ? children : <Navigate to={'/'} /> 

}

export default ProtectedRoute