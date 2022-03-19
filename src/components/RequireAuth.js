import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../util/userContext";

export default function RequireAuth({ children }) {
  const user = useContext(UserContext);

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" replace />;
  }

  return children;
}