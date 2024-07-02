import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import roles from "../roles";

const PrivateRouter = ({ element: Element, path, ...rest }) => {
  const { user, role } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (path === "/franchiseregistration" && role !== roles.FRANCHISE) {
    return <Navigate to="/" />;
  }

  return <Element {...rest} />;
};

export default PrivateRouter;