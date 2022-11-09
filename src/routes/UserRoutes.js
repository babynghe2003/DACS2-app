import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router-dom';
import { element } from 'prop-types';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const HomeDefault = Loadable(lazy(() => import('views/home/Default')));
const CreateTopic = Loadable(lazy(() => import('views/home/CreateTopic')));
const CreateBlog = Loadable(lazy(() => import('views/home/CreateBlog')));
const TagsDefault = Loadable(lazy(() => import('views/tags/Default')));
const UserDefault = Loadable(lazy(() => import('views/users/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const UserRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '*',
            element: <Navigate to="/home/default" replace />
        },
        {
            path: 'home',
            children: [
                {
                    path: 'default',
                    element: <HomeDefault />
                },
                {
                    path: 'createtopic',
                    element: <CreateTopic />
                },
                {
                    path: 'createblog',
                    element: <CreateBlog />
                }
            ]
        },
        {
            path: 'tags',
            children: [
                {
                    path: 'default',
                    element: <TagsDefault />
                }
            ]
        },
        {
            path: 'users',
            children: [
                {
                    path: 'default',
                    element: <UserDefault />
                },
                {
                    path: 'createtopic',
                    element: <CreateTopic />
                },
                {
                    path: 'createblog',
                    element: <CreateBlog />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default UserRoutes;
