import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// eslint-disable-next-line react/prop-types
export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();
  if (isLoggedIn) {
      return <Navigate to="/inbox"></Navigate>;
} else {
      return children;
  }
}
