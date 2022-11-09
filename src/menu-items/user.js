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
            id: 'topic',
            title: 'CreateTopic',
            type: 'item',
            url: '/home/createtopic',
            icon: IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'blog',
            title: 'CreateBlog',
            type: 'item',
            url: '/home/createblog',
            icon: IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'tags',
            title: 'Tags',
            type: 'item',
            url: '/tags/default',
            icon: IconTags,
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
