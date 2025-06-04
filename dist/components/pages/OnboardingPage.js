import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { INTEREST_OPTIONS } from '../../constants';
import { saveUserPreferences, markOnboardingCompleted } from '../../services/userService';
import { FibonacciSpiralIcon } from '../../constants';
const OnboardingPage = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [selectedInterests, setSelectedInterests] = useState(new Set());
    const [nameError, setNameError] = useState('');
    const handleNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value.trim()) {
            setNameError('');
        }
    };
    const handleNextStep = () => {
        if (name.trim() === '') {
            setNameError('Please enter your name.');
            return;
        }
        setNameError('');
        setStep(2);
    };
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
    };
    const handleFinishOnboarding = () => {
        const preferences = {
            name: name.trim(),
            interests: Array.from(selectedInterests),
        };
        saveUserPreferences(preferences);
        markOnboardingCompleted();
        onComplete();
    };
    return (_jsx("div", { className: "min-h-screen bg-[#181818] text-slate-100 flex flex-col items-center justify-center p-4 overflow-y-auto", children: _jsxs("div", { className: "w-full max-w-md space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx(FibonacciSpiralIcon, { className: "w-24 h-auto text-sky-400 mx-auto mb-4" }), _jsx("h1", { className: "text-4xl font-bold text-slate-100 mb-2 font-poppins-semibold", children: "Welcome to Cognify" }), " ", _jsx("p", { className: "text-slate-300", children: "Let's personalize your learning journey." })] }), step === 1 && (_jsxs("div", { className: "bg-[#2D2D2D] p-6 sm:p-8 rounded-xl shadow-2xl space-y-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-center text-slate-100 font-poppins-semibold", children: "What should we call you?" }), " ", _jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "sr-only", children: "Your Name" }), _jsx("input", { id: "name", type: "text", value: name, onChange: handleNameChange, placeholder: "Enter your name", className: `w-full p-3 bg-[#383838] text-slate-100 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 ${nameError ? 'border-red-500 ring-red-500' : 'border-transparent'}`, "aria-describedby": nameError ? "name-error" : undefined, "aria-invalid": !!nameError }), nameError && _jsx("p", { id: "name-error", className: "text-red-400 text-sm mt-1", children: nameError })] }), _jsx("button", { onClick: handleNextStep, className: "w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2D2D2D] focus:ring-sky-500", children: "Next" })] })), step === 2 && (_jsxs("div", { className: "bg-[#2D2D2D] p-6 sm:p-8 rounded-xl shadow-2xl space-y-6", children: [_jsxs("h2", { className: "text-2xl font-semibold text-center text-slate-100 font-poppins-semibold", children: [" ", "What are you interested in, ", _jsx("span", { className: "text-sky-400", children: name.trim() }), "?"] }), _jsx("p", { className: "text-sm text-center text-slate-400", children: "Select all that apply." }), _jsx("div", { className: "space-y-3", children: INTEREST_OPTIONS.map(interest => (_jsx("button", { onClick: () => toggleInterest(interest), className: `w-full p-3 rounded-md text-left transition-all duration-150 ease-in-out border-2
                    ${selectedInterests.has(interest)
                                    ? 'bg-sky-500 border-sky-500 text-white font-medium ring-2 ring-sky-300 ring-offset-1 ring-offset-[#2D2D2D]'
                                    : 'bg-[#383838] border-[#4A4A4A] text-slate-200 hover:bg-[#4A4A4A] hover:border-sky-600'}`, "aria-pressed": selectedInterests.has(interest), children: interest }, interest))) }), _jsx("button", { onClick: handleFinishOnboarding, disabled: selectedInterests.size === 0, className: "w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2D2D2D] focus:ring-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed", children: "Get Started" }), _jsx("button", { onClick: () => setStep(1), className: "w-full mt-2 text-sky-400 hover:text-sky-300 text-sm text-center", children: "Back to name" })] }))] }) }));
};
export default OnboardingPage;
