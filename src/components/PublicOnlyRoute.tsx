// import { useAuth } from '@/auth/AuthProvider';

import { useAuth } from "@/auth/AuthProvider";
import React from "react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicOnlyRouteProps{
    children: ReactNode;
}
const PublicOnlyRoute = ({children}: PublicOnlyRouteProps) => {

    const {user} = useAuth();

    if(user){
        return <Navigate to="/home" />
    }

    return <>{children}</>;


}

export default PublicOnlyRoute;