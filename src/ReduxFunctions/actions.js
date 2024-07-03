import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, setRole, setLoading } from './store';
import roles from '../roles';
import urls from "../utils/urls"
import axios from 'axios';
export const initializeAuth = () => (dispatch) => {
  dispatch(setLoading(true));
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({uid:user.uid, emailId:user.email, displayName :user.displayName}));
      const userRole = roles.FRANCHISE; 
      dispatch(setRole(userRole));
    } else {
      dispatch(setUser(null));
      dispatch(setRole(null));
    }
    dispatch(setLoading(false));
  });
};