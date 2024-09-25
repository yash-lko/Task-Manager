import React, { useEffect, useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Loader from './Loader';

interface ProtectedRoutesProps {
    element: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ element }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const auth = getAuth();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    if (loading) {
        return <div><Loader /></div>;
    }

    if (user && location.pathname === '/login') {
        return <Navigate to='/home' replace />;
    }

    return user ? <>{element}</> : <Navigate to='/login' replace />;
};

export default ProtectedRoutes;
