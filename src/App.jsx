import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Conversation from "./pages/Conversations";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useAuthHook from "./hooks/useAuthHook";
import PrivateRoute from "./components/ui/PrivateRoute";
import PublicRoute from "./components/ui/PublicRoute";


function App() {
  const authCheck = useAuthHook()
  return !authCheck ? (
    <div className="text-2xl flex h-screen justify-center items-center">
      Auth Checking....
    </div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <PrivateRoute>
              <Conversation />
            </PrivateRoute>
          }
        />
        <Route
          path="/inbox/:id"
          element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
