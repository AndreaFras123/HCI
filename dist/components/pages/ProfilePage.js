import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { INTEREST_OPTIONS } from '../../constants';
import { getUserPreferences, saveUserPreferences } from '../../services/userService';
const ProfilePage = () => {
    const [name, setName] = useState('');
    const [selectedInterests, setSelectedInterests] = useState(new Set());
    const [initialInterests, setInitialInterests] = useState(new Set());
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const preferences = getUserPreferences();
        if (preferences) {
            setName(preferences.name);
            const currentInterests = new Set(preferences.interests);
            setSelectedInterests(currentInterests);
            setInitialInterests(new Set(currentInterests)); // Store initial state for comparison
        }
        else {
            // Should not happen if onboarding is complete, but handle gracefully
            setMessage('Could not load user preferences.');
            // navigate('/'); // Optionally redirect if no prefs
        }
        setIsLoading(false);
    }, [navigate]);
    const toggleInterest = (interest) => {
        setSelectedInterests(prev => {
            const newInterests = new Set(prev);
            if (newInterests.has(interest)) {
                newInterests.delete(interest);
            }
            else {
                newInterests.add(interest);
            }
            return newInterests;
        });
        setMessage(''); // Clear any previous messages
    };
    const arraysEqual = (a, b) => {
        if (a.length !== b.length)
            return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        for (let i = 0; i < sortedA.length; i++) {
            if (sortedA[i] !== sortedB[i])
                return false;
        }
        return true;
    };
    const handleSaveChanges = () => {
        const currentSelectedArray = Array.from(selectedInterests);
        const initialSelectedArray = Array.from(initialInterests);
        if (arraysEqual(currentSelectedArray, initialSelectedArray)) {
            setMessage('No changes to save.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }
        const updatedPreferences = {
            name: name, // Name is not editable in this version, but included for structure
            interests: currentSelectedArray,
        };
        saveUserPreferences(updatedPreferences);
        setInitialInterests(new Set(selectedInterests)); // Update initial state to current
        setMessage('Preferences updated successfully!');
        console.log('Updated preferences:', updatedPreferences); // For verification
        // Re-log preferences in console for clarity
        const userPrefs = getUserPreferences();
        if (userPrefs) {
            console.log("User Preferences Updated & Reloaded on Profile Page:");
            console.log("Name:", userPrefs.name);
            console.log("Interests:", userPrefs.interests.join(', ') || "No interests selected");
        }
        setTimeout(() => setMessage(''), 3000);
    };
    if (isLoading) {
        return (_jsx("div", { className: "flex-grow bg-[#181818] flex items-center justify-center text-slate-100", children: "Loading profile..." }));
    }
    return (_jsxs("div", { className: "flex-grow flex flex-col bg-[#181818] text-slate-100", children: [_jsx(TopBar, { title: "Profile", showIcons: false }), _jsxs("main", { className: "flex-grow p-4 md:p-6 space-y-6 overflow-y-auto", children: [_jsxs("section", { className: "bg-[#2D2D2D] p-6 rounded-lg shadow-xl", children: [_jsxs("h2", { className: "text-2xl font-semibold text-slate-100 mb-1 font-poppins-semibold", children: [" ", "Name: ", _jsx("span", { className: "font-normal text-sky-400", children: name })] }), _jsx("p", { className: "text-sm text-slate-400", children: "Your registered name." })] }), _jsxs("section", { className: "bg-[#2D2D2D] p-6 rounded-lg shadow-xl", children: [_jsx("h2", { className: "text-xl font-semibold text-slate-100 mb-4 font-poppins-semibold", children: "Your Interests" }), " ", _jsx("p", { className: "text-sm text-slate-400 mb-4", children: "Select the topics you're interested in to personalize your content." }), _jsx("div", { className: "space-y-3", children: INTEREST_OPTIONS.map(interest => (_jsx("button", { onClick: () => toggleInterest(interest), className: `w-full p-3 rounded-md text-left transition-all duration-150 ease-in-out border-2
                  ${selectedInterests.has(interest)
                                        ? 'bg-sky-500 border-sky-500 text-white font-medium ring-2 ring-sky-300 ring-offset-1 ring-offset-[#2D2D2D]'
                                        : 'bg-[#383838] border-[#4A4A4A] text-slate-200 hover:bg-[#4A4A4A] hover:border-sky-600'}`, "aria-pressed": selectedInterests.has(interest), children: interest }, interest))) })] }), message && (_jsx("div", { className: `p-3 rounded-md text-sm text-center
            ${message.includes('successfully') ? 'bg-green-600 text-white' :
                            (message.includes('No changes') ? 'bg-yellow-500 text-black' : 'bg-sky-600 text-white')}`, children: message })), _jsx("button", { onClick: handleSaveChanges, className: "w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#181818] focus:ring-green-500", children: "Save Changes" }), _jsx("button", { onClick: () => navigate(-1), className: "w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#181818] focus:ring-gray-500", children: "Back" })] })] }));
};
export default ProfilePage;
