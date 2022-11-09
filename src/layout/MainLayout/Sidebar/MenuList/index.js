// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import { adminMenu, userMenu } from 'menu-items';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const userInfo = useSelector((state) => state.userInfo);

    const [menu, setMenu] = useState(userInfo.role == 'admin' ? adminMenu : userMenu);

    useEffect(() => {
        setMenu(userInfo.role == 'admin' ? adminMenu : userMenu);
    }, [userInfo]);

    const navItems = menu.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
