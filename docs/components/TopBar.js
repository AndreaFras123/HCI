import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import UserIcon from './icons/UserIcon';
import NotificationIcon from './icons/NotificationIcon';
const TopBar = ({ title, showIcons = true }) => {
    return (_jsxs("header", { className: "bg-[#181818] p-4 flex justify-between items-center sticky top-0 z-10 h-16", children: [" ", _jsx("h1", { className: "text-xl font-bold text-slate-100 font-poppins-semibold", children: title }), " ", showIcons && (_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(UserIcon, { className: "w-6 h-6 text-slate-300 hover:text-slate-100 cursor-pointer", "aria-label": "User profile" }), _jsx(NotificationIcon, { className: "w-6 h-6 text-slate-300 hover:text-slate-100 cursor-pointer", "aria-label": "Notifications" })] }))] }));
};
export default TopBar;
