import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes, 
  Route, 
  Navigate
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "../ReduxFunctions/actions";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import FranchiseRegistration from "./FranchiseRegistration";
import ResetPassword from "./ResetPassword";
import Datafetched from "./Datafetched";
import Loading from "./Loading";
import Ups from "../vendors/Ups";
import Dhl from "../vendors/Dhl";
import Aramex from "../vendors/Aramex";
import PrivateRouter from "./PrivateRoute";
import AutoSignOut from "./AutoSignout";
import Calculation from "./Calculation";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      {/* <AutoSignOut timeoutMinutes={15}> */}
        <div className="app">
          <Routes>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/ups" element={<Ups />} />
            <Route path="/dhl" element={<Dhl />} />
            <Route path="/aramex" element={<Aramex />} />
            <Route path="/datafetched"
            element={<Datafetched />} />
            <Route path="/calculation" 
            element={
              <PrivateRouter
                element={Calculation}
                path="/calculation"
              />
            }
           />
            <Route
              path="/franchiseregistration"
              element={
                <PrivateRouter
                  element={FranchiseRegistration}
                  path="/franchiseregistration"
                />
              }
            />
            <Route
              path="/"
              element={<PrivateRouter element={Home} />}
            />
          </Routes>
        </div>
      {/* </AutoSignOut> */}
    </Router>
  );
}

export default App;