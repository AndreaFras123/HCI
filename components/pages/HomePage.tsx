
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import UserIcon from '../icons/UserIcon';
import NotificationIcon from '../icons/NotificationIcon';
import { FibonacciSpiralIcon } from '../../constants';
import { ReelContent, UserPreferences } from '../../types';
import { getUserPreferences } from '../../services/userService';
import { getMockReels } from '../../services/mockDataService';

// Helper function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const QuickPickCard: React.FC<{ reel: ReelContent | null }> = ({ reel }) => {
  if (!reel) {
    return (
      <div className="bg-[#2D2D2D] rounded-lg shadow-lg aspect-[2/3] flex items-center justify-center p-3">
        <p className="text-slate-400 text-center text-sm">No pick available</p>
      </div>
    );
  }

  return (
    <Link
      to="/reels"
      className="relative bg-[#2D2D2D] rounded-lg shadow-lg aspect-[2/3] overflow-hidden group block"
      aria-label={`View reel: ${reel.description.substring(0, 30)}...`}
    >
      <img
        src={reel.sourceUrl}
        alt={reel.description.substring(0, 50)}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x600/2D2D2D/FFFFFF?text=Image+Error')}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      {reel.tags && reel.tags.length > 0 && (
        <span className="absolute bottom-2 left-2 bg-sky-500 text-white text-xs px-2 py-1 rounded shadow">
          {reel.tags[0]}
        </span>
      )}
    </Link>
  );
};


const HomePage: React.FC = () => {
  const [quickPick1, setQuickPick1] = useState<ReelContent | null>(null);
  const [quickPick2, setQuickPick2] = useState<ReelContent | null>(null);
  const [isLoadingPicks, setIsLoadingPicks] = useState(true);
  const [picksMessage, setPicksMessage] = useState<string>('Loading quick picks...');

  useEffect(() => {
    const fetchQuickPicks = async () => {
      setIsLoadingPicks(true);
      setPicksMessage('Loading quick picks...');

      const preferences: UserPreferences | null = getUserPreferences();
      const userInterests = new Set(preferences?.interests || []);

      if (userInterests.size === 0 && preferences?.name) { 
          setPicksMessage('Update your interests in your profile to see personalized picks!');
          setQuickPick1(null);
          setQuickPick2(null);
          setIsLoadingPicks(false);
          return;
      }
      
      try {
        const allReels = await getMockReels();
        let personalizedReels: ReelContent[] = [];

        if (userInterests.size > 0) {
            personalizedReels = allReels.filter(reel =>
                reel.tags && reel.tags.some(tag => userInterests.has(tag))
            );
        } else { // User hasn't completed onboarding (no preferences) or explicitly has no interests
             personalizedReels = allReels; 
        }


        if (personalizedReels.length === 0) {
          if (userInterests.size > 0) {
            setPicksMessage('No reels found matching your interests for quick picks.');
          } else {
             // This message shows if onboarding is not done or if user has no interests selected
            setPicksMessage('Tell us your interests on your profile to see quick picks here!');
          }
          setQuickPick1(null);
          setQuickPick2(null);
        } else {
          const shuffledReels = shuffleArray(personalizedReels);
          setQuickPick1(shuffledReels[0] || null);
          setQuickPick2(shuffledReels.length > 1 ? shuffledReels[1] : null);
          setPicksMessage(''); 
        }
      } catch (error) {
        console.error("Failed to fetch reels for quick picks:", error);
        setPicksMessage('Could not load quick picks. Please try again later.');
        setQuickPick1(null);
        setQuickPick2(null);
      } finally {
        setIsLoadingPicks(false);
      }
    };

    fetchQuickPicks();
  }, []); // Re-run if user preferences could change elsewhere and trigger a re-render, or add a refresh mechanism

  return (
    <div className="flex-grow bg-[#181818] text-slate-100 overflow-y-auto">
      <header className="p-4 flex justify-between items-center sticky top-0 z-10 bg-[#181818] h-20">
        <h1 className="text-3xl font-bold text-slate-100 font-poppins-semibold">Cognify</h1> {/* Applied Poppins Semibold */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" aria-label="User profile"> {/* Updated UserIcon to be a Link */}
            <UserIcon className="w-7 h-7 text-slate-300 hover:text-slate-100 cursor-pointer" />
          </Link>
          <NotificationIcon className="w-7 h-7 text-slate-300 hover:text-slate-100 cursor-pointer" aria-label="Notifications" />
        </div>
      </header>

      <main className="p-4 space-y-8 pb-8">
        <section className="flex flex-col items-center justify-center my-6 p-6">
           <FibonacciSpiralIcon className="w-40 h-auto sm:w-48 text-sky-400 mb-4" aria-label="Decorative Fibonacci Spiral"/>
          <p className="text-md sm:text-lg text-slate-300 text-center">Explore. Learn. Grow.</p>
        </section>

        <section>
          <h2 className="text-xl text-center font-poppins-medium text-[#C1C1C1] mb-4">Today's quick picks:</h2>
          {isLoadingPicks && (
            <div className="text-center text-slate-400 p-4">{picksMessage}</div>
          )}
          {!isLoadingPicks && picksMessage && (
            <div className="text-center text-slate-400 p-4 bg-[#2D2D2D] rounded-md">{picksMessage}</div>
          )}
          {!isLoadingPicks && !picksMessage && (quickPick1 || quickPick2) && (
            <div className="grid grid-cols-2 gap-4">
              <QuickPickCard reel={quickPick1} />
              <QuickPickCard reel={quickPick2} />
            </div>
          )}
           {!isLoadingPicks && !picksMessage && !quickPick1 && !quickPick2 && (
             <div className="text-center text-slate-400 p-4 bg-[#2D2D2D] rounded-md">No quick picks available right now. Check back later or update your interests!</div>
           )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;