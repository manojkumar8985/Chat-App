import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Boarding from "./pages/Boarding";
import Signup from "./pages/Signup";
import Loading from "./pages/Loading";
import { Toaster } from "react-hot-toast";
import userAuth from "./hooks/useAuthUser";
import Layout from "./Components/Layout";
import Friends from "./pages/Friends";
import ChatPage from "./pages/Chat";
import Call from "./pages/Call";
import Notifications from "./pages/Notifications";
import NoSidebarLayout from "./Components/Nosidebar";
import CallPage from "./pages/Call";


function App() {
  const { user, isLoading } = userAuth();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup />}
        />
        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <Layout>
                {user.isOnBoard ? <Home /> : <Navigate to="/boarding" replace />}
              </Layout>
            )
          }
        />
        <Route
          path="/friends"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <Layout>
                <Friends />
              </Layout>
            )
          }
        />
        <Route
          path="/notifications"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <Layout>
                <Notifications />
              </Layout>
            )
          }
        />
        <Route
          path="/boarding"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <NoSidebarLayout>
                {user.isOnBoard ? (
                  <Navigate to="/" replace />
                ) : (
                  <Boarding />
                )}
              </NoSidebarLayout>
            )
          }
        />
        
        
        <Route
  path="/chat/:id"
  element={
    !user ? (
      <Navigate to="/login" replace />
    ) : user.isOnBoard ? (
      <NoSidebarLayout>
        <ChatPage />
      </NoSidebarLayout>
    ) : (
      <Navigate to="/boarding" replace />
    )
  }
/>

<Route
  path="/call/:id"
  element={
    !user ? (
      <Navigate to="/login" replace />
    ) : user.isOnBoard ? (
      <NoSidebarLayout>
        <CallPage />
      </NoSidebarLayout>
    ) : (
      <Navigate to="/boarding" replace />
    )
  }
/>



      </Routes>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
