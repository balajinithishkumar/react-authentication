import { useEffect, useRef } from 'react';
import { auth } from '../firebase'; // Adjust the import based on your firebase setup
import axios from 'axios';
import urls from '../utils/urls';
import { useSelector } from 'react-redux';

const AutoSignOut = ({ children, timeoutSeconds = 10 }) => {
  const timeoutIdRef = useRef(null);
  const { user, role, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const resetTimer = () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      const newTimeoutId = setTimeout(() => {
        auth.signOut().then(result => {
          const formattedTime = new Date()
        axios
        .post(urls.userStatus, {
          Name: "name",
          Time: formattedTime, 
          Status: "Sign out",
        })
        .then((response) => {
          console.log(response);
        });
        })

      }, timeoutSeconds * 1000);
      timeoutIdRef.current = newTimeoutId;
    };

    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    resetTimer();

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [timeoutSeconds]);

  return <>{children}</>;
};

export default AutoSignOut;