// assets
import { IconDashboard, IconUsers, IconTags, IconWorld } from '@tabler/icons';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'PUBLIC',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Home',
            type: 'item',
            url: '/home/default',
            icon: IconWorld,
            breadcrumbs: false
        },
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/users/default',
            icon: IconUsers,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
