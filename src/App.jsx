import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth } from './actions';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import FranchiseRegistration from './FranchiseRegistration';
import roles from './roles';
import ResetPassword from './ResetPassword';

function App() {
  const dispatch = useDispatch();
  const { user, role, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(initializeAuth());
  },[dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
        <Route
            path="/resetpassword"
            element= {<ResetPassword/>}
            // element={!user ? <ResetPassword /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/franchiseregistration"
            element={
              user && role === roles.FRANCHISE ? (
                <FranchiseRegistration />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;