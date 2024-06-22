import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, setRole, setLoading } from './store';
import roles from './roles';

export const initializeAuth = () => (dispatch) => {
  dispatch(setLoading(true));
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user));
      const userRole = roles.FRANCHISE; // Replace with actual role fetching logic
      dispatch(setRole(userRole));
    } else {
      dispatch(setUser(null));
      dispatch(setRole(null));
    }
    dispatch(setLoading(false));
  });
};
