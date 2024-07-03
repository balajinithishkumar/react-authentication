import { useEffect, useRef } from 'react';
import { auth } from '../firebase'; // Adjust the import based on your firebase setup

const AutoSignOut = ({ children, timeoutMinutes = 15 }) => {
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      const newTimeoutId = setTimeout(() => {
        auth.signOut();
      }, timeoutMinutes * 60 * 1000);
      timeoutIdRef.current = newTimeoutId;
    };

    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    // Initialize the timer when the component mounts
    resetTimer();

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [timeoutMinutes]);

  return <>{children}</>;
};

export default AutoSignOut;
