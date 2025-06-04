
import React, { useState, useEffect, useCallback } from 'react';
import { ReelContent, Interest, QuizQuestion, UserQuizProgress, UserXPLevel } from '../../types';
import { getMockReels } from '../../services/mockDataService';
import { 
  getUserPreferences, 
  getUserQuizProgress, 
  markQuizAttempt,
  getUserXPLevel, 
  saveUserXPLevel  
} from '../../services/userService';
import { XP_PER_CORRECT_ANSWER, XP_FOR_LEVEL_UP } from '../../constants'; 
import LikeIcon from '../icons/LikeIcon';
import CommentIcon from '../icons/CommentIcon';
import ShareIcon from '../icons/ShareIcon';
import MoreOptionsIcon from '../icons/MoreOptionsIcon';
import QuizModal from '../QuizModal'; 
import CheckCircleIcon from '../icons/CheckCircleIcon';
import XPBar from '../XPBar'; 

interface ReelCardProps {
  reel: ReelContent;
  onTakeQuiz: (quiz: QuizQuestion, reelId: string) => void;
  isQuizPassed: boolean;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, onTakeQuiz, isQuizPassed }) => {
  return (
    <div className="h-full w-full bg-black relative flex flex-col items-center justify-center text-white" role="article" aria-labelledby={`reel-user-${reel.id}`}>
      <img 
        src={reel.sourceUrl} 
        alt={reel.description.substring(0,100)}
        className="absolute inset-0 w-full h-full object-cover" 
        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x700/000000/FFFFFF?text=Image+Load+Error')}
      />
      
      <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-between p-4">
        <div className="absolute top-4 left-4 z-10">
            {reel.quiz && isQuizPassed && (
                 <div className="flex items-center bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow">
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    Quiz Passed
                </div>
            )}
        </div>
        <div></div> {/* Top spacer */}
        <div className="z-10 text-shadow">
          <div className="flex items-center mb-2">
            <img src={reel.user.avatarUrl} alt={`${reel.user.name}'s avatar`} className="w-10 h-10 rounded-full border-2 border-white mr-3" />
            <div>
              <p id={`reel-user-${reel.id}`} className="font-semibold text-sm">{reel.user.name}</p>
              <button className="text-xs bg-sky-500 px-2 py-0.5 rounded hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400">Follow</button>
            </div>
          </div>
          <p className="text-sm leading-tight mb-2">{reel.description}</p>
          {reel.quiz && !isQuizPassed && (
            <button
              onClick={() => reel.quiz && onTakeQuiz(reel.quiz, reel.id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-semibold py-2 px-3 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Take Quick Quiz
            </button>
          )}
        </div>
      </div>

      <div className="absolute right-2 bottom-1/4 z-10 flex flex-col space-y-5 items-center">
        <button className="flex flex-col items-center text-white group" aria-label={`Like reel by ${reel.user.name}, ${reel.likes} likes`}>
          <LikeIcon className="w-8 h-8 group-hover:fill-red-500 group-focus:fill-red-500 transition-colors" />
          <span className="text-xs mt-1">{reel.likes > 1000 ? (reel.likes/1000).toFixed(1)+'k' : reel.likes}</span>
        </button>
        <button className="flex flex-col items-center text-white group" aria-label={`Comment on reel by ${reel.user.name}, ${reel.comments} comments`}>
          <CommentIcon className="w-8 h-8 group-hover:fill-sky-300 group-focus:fill-sky-300 transition-colors" />
          <span className="text-xs mt-1">{reel.comments}</span>
        </button>
        <button className="flex flex-col items-center text-white group" aria-label={`Share reel by ${reel.user.name}`}>
          <ShareIcon className="w-8 h-8 group-hover:fill-green-400 group-focus:fill-green-400 transition-colors" />
        </button>
        <button className="text-white group" aria-label={`More options for reel by ${reel.user.name}`}>
          <MoreOptionsIcon className="w-8 h-8 group-hover:fill-gray-400 group-focus:fill-gray-400 transition-colors" />
        </button>
         <img src={reel.user.avatarUrl} alt="" className="w-10 h-10 rounded-full border-2 border-white mt-2" aria-hidden="true" />
      </div>
    </div>
  );
};

const ReelsPage: React.FC = () => {
  const [allFetchedReels, setAllFetchedReels] = useState<ReelContent[]>([]);
  const [displayedReels, setDisplayedReels] = useState<ReelContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string>('Loading reels...');
  
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [activeQuiz, setActiveQuiz] = useState<{ quiz: QuizQuestion; reelId: string } | null>(null);
  const [userQuizProgressVersion, setUserQuizProgressVersion] = useState(0); 
  
  const [readyToAdvance, setReadyToAdvance] = useState<boolean>(false);
  const [lastQuizOutcomeIsCorrect, setLastQuizOutcomeIsCorrect] = useState<boolean | null>(null);

  const [userXPLevel, setUserXPLevel] = useState<UserXPLevel>(getUserXPLevel());
  const [levelUpMessage, setLevelUpMessage] = useState<string | null>(null);

  useEffect(() => {
    setUserXPLevel(getUserXPLevel()); 
  }, []);

  const refreshReelsListFromSource = useCallback(() => {
    const preferences = getUserPreferences();
    const interests = new Set(preferences?.interests || []);
    let personalizedReels = allFetchedReels;

    if (interests.size > 0) {
      personalizedReels = allFetchedReels.filter(reel =>
        reel.tags && reel.tags.some(tag => interests.has(tag))
      );
    }
    
    const currentProgressData = getUserQuizProgress(); 
    const masteredReelIds = Object.keys(currentProgressData).filter(reelId => 
        currentProgressData[reelId]?.correctlyAnswered
    );

    const unmasteredReels = personalizedReels.filter(reel => 
        !reel.quiz || !masteredReelIds.includes(reel.id)
    );
    // console.log("LOG: refreshReelsListFromSource - Generated unmasteredReels IDs:", unmasteredReels.map(r => r.id));
    return unmasteredReels;
  }, [allFetchedReels]);


  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setStatusMessage('Loading reels...');
      try {
        const fetchedReels = await getMockReels();
        setAllFetchedReels(fetchedReels);
      } catch (error) {
        console.error("Failed to fetch initial reels:", error);
        setStatusMessage('Could not load reels. Please try again later.');
        setAllFetchedReels([]);
      } 
    };
    fetchInitialData();
  }, []);

  // Effect to update displayedReels
  useEffect(() => {
    // console.log("LOG: EFFECT (Update DisplayedReels) triggered. LastQuizCorrect:", lastQuizOutcomeIsCorrect, "AllFetchedReels Length:", allFetchedReels.length, "isLoading:", isLoading, "UserQuizProgressVersion:", userQuizProgressVersion);

    if (isLoading && allFetchedReels.length === 0) { 
        // console.log("LOG: EFFECT (Update DisplayedReels) - Waiting for initial allFetchedReels.");
        return;
    }
    
    let finalQueueCandidate: ReelContent[];
    let needsIndexAdjustment = false;
    let oldCurrentReelIdForAdjustment: string | undefined;

    if (lastQuizOutcomeIsCorrect === false) {
      // console.log('LOG: EFFECT (Update DisplayedReels) - SKIPPING standard rebuild, last quiz was incorrect. Using current displayedReels (should be spliced). IDs:', displayedReels.map(r=>r.id));
      finalQueueCandidate = displayedReels; 
    } else if (lastQuizOutcomeIsCorrect === true) {
        // console.log('LOG: EFFECT (Update DisplayedReels) - Quiz correct. Filtering current displayedReels. Prev displayedReels IDs:', displayedReels.map(r=>r.id));
        const currentProgressData = getUserQuizProgress();
        const masteredReelIdsThisCycle = Object.keys(currentProgressData).filter(reelId => 
            currentProgressData[reelId]?.correctlyAnswered
        );
        oldCurrentReelIdForAdjustment = displayedReels[currentReelIndex]?.id;
        finalQueueCandidate = displayedReels.filter(reel => 
            !reel.quiz || !masteredReelIdsThisCycle.includes(reel.id)
        );
        // console.log('LOG: EFFECT (Update DisplayedReels) - Queue after filtering mastered reel:', finalQueueCandidate.map(r=>r.id));
        setDisplayedReels(finalQueueCandidate);
        needsIndexAdjustment = true;
    } else { 
        // console.log('LOG: EFFECT (Update DisplayedReels) - Initial construction or major refresh from allFetchedReels.');
        oldCurrentReelIdForAdjustment = displayedReels[currentReelIndex]?.id;
        finalQueueCandidate = refreshReelsListFromSource();
        setDisplayedReels(finalQueueCandidate);
        needsIndexAdjustment = true;
    }
    
    if (needsIndexAdjustment) {
        const tempCurrentIndex = currentReelIndex; 
        setCurrentReelIndex(prevIdx => {
            let newCalculatedIdx = 0;
            if (finalQueueCandidate.length > 0) {
                const targetReelId = oldCurrentReelIdForAdjustment;
                if (targetReelId) {
                    const newPosOfOldReel = finalQueueCandidate.findIndex(r => r.id === targetReelId);
                    if (newPosOfOldReel !== -1) {
                        newCalculatedIdx = newPosOfOldReel;
                    } else { 
                        newCalculatedIdx = Math.min(tempCurrentIndex, finalQueueCandidate.length - 1);
                        if (newCalculatedIdx < 0) newCalculatedIdx = 0;
                    }
                } else { 
                    newCalculatedIdx = Math.min(tempCurrentIndex, finalQueueCandidate.length - 1);
                    if (newCalculatedIdx < 0) newCalculatedIdx = 0;
                }
            }
            // console.log(`LOG: EFFECT (Update DisplayedReels) - Adjusting currentReelIndex from ${tempCurrentIndex} (Old ID: ${oldCurrentReelIdForAdjustment || 'N/A'}) to ${newCalculatedIdx}. New Queue Length: ${finalQueueCandidate.length}`);
            return newCalculatedIdx;
        });
    }

    if (finalQueueCandidate.length === 0 && !isLoading) {
      const preferences = getUserPreferences();
      const interests = new Set(preferences?.interests || []);
      if (interests.size > 0) {
        setStatusMessage('You\'ve mastered all quizzes for your interests or no matching content! 🎉');
      } else if (preferences?.name) {
         setStatusMessage('Please select interests in your profile to see personalized reels.');
      } else {
        setStatusMessage('Complete onboarding to get personalized reels!');
      }
    } else if (finalQueueCandidate.length > 0) {
      setStatusMessage('');
    }
    
    if(isLoading && (allFetchedReels.length > 0 || finalQueueCandidate.length > 0 || statusMessage !== 'Loading reels...')) {
      setIsLoading(false);
    }

  }, [allFetchedReels, userQuizProgressVersion, lastQuizOutcomeIsCorrect, refreshReelsListFromSource, isLoading]); 


  useEffect(() => {
    if (readyToAdvance) {
      if (displayedReels.length > 0) {
        const nextIndex = (currentReelIndex + 1) % displayedReels.length;
        // console.log(`LOG: EFFECT (Advance Reel) - Advancing from Index: ${currentReelIndex} (ID: ${displayedReels[currentReelIndex]?.id}) to Index: ${nextIndex} (ID: ${displayedReels[nextIndex]?.id}). Queue Length: ${displayedReels.length}.`);
        setCurrentReelIndex(nextIndex);
      } else {
        // console.log('LOG: EFFECT (Advance Reel) - Ready to advance but no reels in queue.');
      }
      setReadyToAdvance(false);
      if (lastQuizOutcomeIsCorrect === true || lastQuizOutcomeIsCorrect === false) { 
        setLastQuizOutcomeIsCorrect(null);
      }
    }
  }, [readyToAdvance, displayedReels, currentReelIndex, lastQuizOutcomeIsCorrect]);


  const handleTakeQuiz = (quiz: QuizQuestion, reelId: string) => {
    setActiveQuiz({ quiz, reelId });
  };

  const handleQuizFinished = (isCorrect: boolean) => {
    if (!activeQuiz) return;

    const reelIdAttempted = activeQuiz.reelId;
    const quizIdAttempted = activeQuiz.quiz.id;
    const localCurrentIndex = currentReelIndex; 

    // console.log(`LOG: HANDLE QUIZ FINISHED (Reel ID: ${reelIdAttempted}, Correct: ${isCorrect}) - Current Index at call: ${localCurrentIndex}`);
    
    markQuizAttempt(reelIdAttempted, quizIdAttempted, isCorrect);
    
    if (isCorrect) {
      setUserXPLevel(prevXPLevel => {
        let newXP = prevXPLevel.currentXP + XP_PER_CORRECT_ANSWER; // Use constant for 50 XP
        let newLevel = prevXPLevel.level;
        let xpRequiredForThisLevelUp = prevXPLevel.xpToNextLevel;
        let newXPToNextForNextLevel = prevXPLevel.xpToNextLevel;
        
        if (newXP >= xpRequiredForThisLevelUp) {
          newLevel++;
          newXP = newXP - xpRequiredForThisLevelUp; // Carry over excess XP
          // Calculate XP needed for the *next* level up by doubling the requirement of the level just completed
          newXPToNextForNextLevel = xpRequiredForThisLevelUp * 2; 
          
          setLevelUpMessage(`Level Up! You reached Level ${newLevel}!`);
          setTimeout(() => setLevelUpMessage(null), 3000);
        }
        const updatedXPData = { level: newLevel, currentXP: newXP, xpToNextLevel: newXPToNextForNextLevel };
        saveUserXPLevel(updatedXPData);
        // console.log("LOG: XP Awarded. New XP Data:", updatedXPData);
        return updatedXPData;
      });
    }

    setLastQuizOutcomeIsCorrect(isCorrect); 
    setUserQuizProgressVersion(v => v + 1); 

    if (!isCorrect) {
        setDisplayedReels(prevReels => {
            let queueCopy = [...prevReels];
            const failedReelData = allFetchedReels.find(r => r.id === reelIdAttempted);
            
            if (!failedReelData) {
                // console.warn(`LOG: HANDLE QUIZ FINISHED (Incorrect) - Failed to find full reel data for ID ${reelIdAttempted}. Cannot re-queue.`);
                return prevReels; 
            }
            const reelToRequeue = { ...failedReelData, __requeuedMarker: Date.now() }; 

            const afterNextReelPlacementIndex = localCurrentIndex + 2;

            if (afterNextReelPlacementIndex < queueCopy.length) {
                const reelToBeDisplaced = queueCopy[afterNextReelPlacementIndex];
                queueCopy.splice(afterNextReelPlacementIndex, 1, reelToRequeue); 
                if(reelToBeDisplaced) queueCopy.push(reelToBeDisplaced); 
                // console.log(`LOG: HANDLE QUIZ FINISHED (Incorrect) - Re-queued ${reelToRequeue.id} to index ${afterNextReelPlacementIndex}, displaced ${reelToBeDisplaced?.id} to end. New queue IDs: ${queueCopy.map(r=>r.id)}`);
            } else {
                queueCopy.splice(localCurrentIndex + 1, 0, reelToRequeue);
                // console.log(`LOG: HANDLE QUIZ FINISHED (Incorrect) - Short queue, inserted ${reelToRequeue.id} after current. New queue IDs: ${queueCopy.map(r=>r.id)}`);
            }
            return queueCopy;
        });
    }
        
    setActiveQuiz(null); 
    setReadyToAdvance(true); 
  };
  
  if (isLoading) {
    return <div className="flex-grow bg-[#181818] flex items-center justify-center text-slate-100 p-4 text-center" role="status" aria-live="polite">{statusMessage || 'Loading reels...'}</div>;
  }

  let contentToRender;
  if (displayedReels.length === 0) {
      contentToRender = <div className="flex-grow bg-[#181818] flex items-center justify-center text-slate-100 p-4 text-center">{statusMessage || 'No reels available. Update your interests or check back later!'}</div>;
  } else {
      const safeCurrentReelIndex = currentReelIndex % displayedReels.length;
      const currentReel = displayedReels[safeCurrentReelIndex];

      if (!currentReel) {
          // console.error("LOG: RENDER - currentReel is undefined! Safe Index:", safeCurrentReelIndex, "Raw Index:", currentReelIndex, "Queue Length:", displayedReels.length);
          if (displayedReels.length > 0 && safeCurrentReelIndex !== 0 && currentReelIndex >= displayedReels.length) {
               // console.warn("LOG: RENDER - Attempting to reset currentReelIndex to 0 due to undefined currentReel and out of bounds index.");
               setCurrentReelIndex(0); 
               contentToRender = <div className="flex-grow bg-[#181818] flex items-center justify-center text-slate-100 p-4 text-center">Correcting reel display...</div>;
          } else {
              contentToRender = <div className="flex-grow bg-[#181818] flex items-center justify-center text-slate-100 p-4 text-center">Error loading current reel. Please refresh.</div>;
          }
      } else {
          // console.log("LOG: RENDER - Displaying reel:", currentReel.id, "at index:", safeCurrentReelIndex);
          contentToRender = (
              <section 
                key={currentReel.id + '-' + safeCurrentReelIndex + '-' + (currentReel as any).__requeuedMarker} 
                id={`reel-section-${currentReel.id}`}
                className="h-full w-full shrink-0" 
                aria-roledescription="current-reel"
              >
                 <ReelCard 
                    reel={currentReel} 
                    onTakeQuiz={handleTakeQuiz}
                    isQuizPassed={!!(currentReel.quiz && getUserQuizProgress()[currentReel.id]?.correctlyAnswered && getUserQuizProgress()[currentReel.id]?.quizId === currentReel.quiz.id)}
                 />
              </section>
          );
      }
  }

  return (
    <>
      <XPBar 
        currentXP={userXPLevel.currentXP}
        xpToNextLevel={userXPLevel.xpToNextLevel}
        currentLevel={userXPLevel.level}
      />
      {levelUpMessage && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded-md shadow-lg z-50 animate-bounce">
          {levelUpMessage}
        </div>
      )}
      <div 
        className="flex-grow bg-black w-full flex flex-col relative" 
        aria-label="Personalized Reels feed"
        role="region" 
      >
        {contentToRender}
      </div>
      {activeQuiz && (
        <QuizModal
          quiz={activeQuiz.quiz}
          onQuizFinished={handleQuizFinished} 
        />
      )}
    </>
  );
};

export default ReelsPage;
