import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const BottomNavigationBar = ({ navItems }) => {
    const location = useLocation();
    return (_jsxs("nav", { className: "bg-[#202020] shadow-t-lg z-40 relative", children: [" ", _jsx("div", { className: "max-w-md mx-auto flex justify-around items-center h-16", children: navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const IconComponent = item.icon;
                    return (_jsxs(Link, { to: item.path, "aria-current": isActive ? 'page' : undefined, className: `flex flex-col items-center justify-center w-1/3 h-full transition-colors duration-200 group 
                ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`, children: [_jsx(IconComponent, { className: `h-6 w-6 ${isActive ? 'fill-white stroke-white' : 'fill-current stroke-current'}` }), _jsx("span", { className: "text-xs mt-1", children: item.label })] }, item.label));
                }) })] }));
};
export default BottomNavigationBar;
