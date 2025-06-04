import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';
const QuizModal = ({ quiz, onQuizFinished }) => {
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    // Reset state if quiz changes
    useEffect(() => {
        setSelectedOptionId(null);
        setFeedback(null);
        setSubmitted(false);
        setIsCorrectAnswer(false);
    }, [quiz]);
    const handleOptionSelect = (optionId) => {
        if (submitted)
            return;
        setSelectedOptionId(optionId);
    };
    const handleSubmit = () => {
        if (!selectedOptionId || submitted)
            return;
        const correct = selectedOptionId === quiz.correctOptionId;
        setIsCorrectAnswer(correct);
        setSubmitted(true);
        if (correct) {
            setFeedback({ type: 'correct', message: 'Correct!' });
        }
        else {
            const correctOptionText = quiz.options.find(opt => opt.id === quiz.correctOptionId)?.text;
            setFeedback({ type: 'incorrect', message: `Incorrect. The correct answer was: ${correctOptionText}` });
        }
        // Do not call onQuizFinished here; wait for the user to click "Close"
    };
    const handleCloseAfterFeedback = () => {
        onQuizFinished(isCorrectAnswer);
    };
    const getButtonClass = (option) => {
        let baseClass = "w-full text-left p-3 my-2 rounded-md transition-colors duration-150 border-2 ";
        if (submitted) {
            if (option.id === quiz.correctOptionId) {
                return baseClass + "bg-green-500 border-green-700 text-white";
            }
            if (option.id === selectedOptionId && option.id !== quiz.correctOptionId) {
                return baseClass + "bg-red-500 border-red-700 text-white";
            }
            return baseClass + "bg-[#2D2D2D] border-transparent text-slate-400 cursor-not-allowed";
        }
        if (option.id === selectedOptionId) {
            return baseClass + "bg-sky-500 border-sky-600 text-white ring-2 ring-sky-300 ring-offset-1 ring-offset-[#202020]";
        }
        return baseClass + "bg-[#383838] border-[#4A4A4A] hover:bg-[#4A4A4A] text-slate-200";
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50", role: "dialog", "aria-modal": "true", "aria-labelledby": "quiz-title", children: _jsxs("div", { className: "bg-[#2D2D2D] p-6 rounded-lg shadow-xl w-full max-w-md text-slate-100", children: [_jsx("h2", { id: "quiz-title", className: "text-xl font-semibold mb-4 font-poppins-semibold", children: quiz.questionText }), " ", _jsx("div", { role: "radiogroup", "aria-labelledby": "quiz-title", children: quiz.options.map((option) => (_jsx("button", { role: "radio", "aria-checked": selectedOptionId === option.id, onClick: () => handleOptionSelect(option.id), disabled: submitted, className: getButtonClass(option), children: option.text }, option.id))) }), feedback && (_jsxs("div", { className: `mt-4 p-3 rounded-md flex items-center text-sm ${feedback.type === 'correct' ? 'bg-green-600' : 'bg-red-600'}`, children: [feedback.type === 'correct' ?
                            _jsx(CheckCircleIcon, { className: "w-5 h-5 mr-2 text-white" }) :
                            _jsx(XCircleIcon, { className: "w-5 h-5 mr-2 text-white" }), feedback.message] })), _jsx("div", { className: "mt-6 flex justify-end space-x-3", children: !submitted ? (_jsx("button", { onClick: handleSubmit, disabled: !selectedOptionId, className: "bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed", children: "Submit Answer" })) : (_jsx("button", { onClick: handleCloseAfterFeedback, className: "bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md", children: "Next Reel" })) })] }) }));
};
export default QuizModal;
