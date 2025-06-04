import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const XPBar = ({ currentXP, xpToNextLevel, currentLevel }) => {
    const progressPercentage = xpToNextLevel > 0 ? (currentXP / xpToNextLevel) * 100 : 0;
    return (_jsxs("div", { className: "w-full bg-[#2D2D2D] p-3 shadow-md sticky top-0 z-20", children: [_jsxs("div", { className: "flex justify-between items-center mb-1 text-sm", children: [_jsxs("span", { className: "font-semibold text-sky-400", children: ["Level: ", currentLevel] }), _jsxs("span", { className: "text-slate-300", children: ["XP: ", currentXP, " / ", xpToNextLevel] })] }), _jsx("div", { className: "w-full bg-gray-700 rounded-full h-2.5 overflow-hidden", children: _jsx("div", { className: "bg-sky-500 h-2.5 rounded-full transition-all duration-300 ease-out", style: { width: `${Math.min(progressPercentage, 100)}%` }, role: "progressbar", "aria-valuenow": currentXP, "aria-valuemin": 0, "aria-valuemax": xpToNextLevel, "aria-label": `Experience points progress: ${currentXP} of ${xpToNextLevel} for level ${currentLevel + 1}` }) })] }));
};
export default XPBar;
