import admin from './admin';
import user from './user';
import pages from './pages';
import utilities from './utilities';
import other from './other';

// ==============================|| MENU ITEMS ||============================== //

export const userMenu = {
    items: [user]
};

export const adminMenu = {
    items: [admin, other]
};
