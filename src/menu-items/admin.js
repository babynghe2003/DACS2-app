// assets
import { IconDashboard, IconHomeQuestion } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconHomeQuestion };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'topic',
            title: 'Topic',
            type: 'item',
            url: '/dashboard/topic',
            icon: icons.IconHomeQuestion,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
