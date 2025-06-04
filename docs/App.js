import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import ReelsPage from './components/pages/ReelsPage';
import JournalPage from './components/pages/JournalPage';
import ProfilePage from './components/pages/ProfilePage'; // Import ProfilePage
import BottomNavigationBar from './components/BottomNavigationBar';
import OnboardingPage from './components/pages/OnboardingPage';
import { NAV_ITEMS } from './constants';
import { isOnboardingCompleted as checkOnboardingCompleted, getUserPreferences } from './services/userService';
const App = () => {
    const [onboardingCompleted, setOnboardingCompleted] = useState(checkOnboardingCompleted());
    const navigate = useNavigate();
    useEffect(() => {
        const userPrefs = getUserPreferences();
        if (onboardingCompleted) {
            if (userPrefs) {
                console.log("User Preferences Loaded:");
                console.log("Name:", userPrefs.name);
                console.log("Interests:", userPrefs.interests.join(', ') || "No interests selected");
            }
            else {
                console.log("Onboarding completed, but no preferences found. This might indicate an issue or a reset.");
            }
        }
        else if (userPrefs) {
            console.log("User preferences exist but onboarding is not marked as completed. Showing onboarding.");
        }
    }, [onboardingCompleted]);
    const handleOnboardingComplete = () => {
        setOnboardingCompleted(true);
        const userPrefs = getUserPreferences();
        if (userPrefs) {
            console.log("Onboarding Complete! User Preferences:");
            console.log("Name:", userPrefs.name);
            console.log("Interests:", userPrefs.interests.join(', ') || "No interests selected");
        }
        navigate('/');
    };
    if (!onboardingCompleted) {
        return _jsx(OnboardingPage, { onComplete: handleOnboardingComplete });
    }
    return (_jsxs("div", { className: "h-full flex flex-col bg-[#181818]", children: [_jsx("div", { className: "flex-grow overflow-hidden flex flex-col", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/reels", element: _jsx(ReelsPage, {}) }), _jsx(Route, { path: "/journal", element: _jsx(JournalPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), " "] }) }), _jsx(BottomNavigationBar, { navItems: NAV_ITEMS })] }));
};
export default App;
