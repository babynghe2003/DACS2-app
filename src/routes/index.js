import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import UserRoutes from './UserRoutes';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const userInfo = useSelector((state) => state.userInfo);
    const [role, setRole] = useState([AuthenticationRoutes]);

    useEffect(() => {
        switch (userInfo.role) {
            case 'auth':
                setRole([AuthenticationRoutes]);
                break;
            case 'admin':
                setRole([MainRoutes]);
                break;
            case 'user':
                setRole([UserRoutes]);
                break;
            default:
                break;
        }
    }, [userInfo.role, localStorage]);
    return useRoutes(role);
}
