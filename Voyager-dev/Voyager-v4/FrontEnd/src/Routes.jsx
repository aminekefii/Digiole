import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import NotFound from "pages/NotFound";
import LandingPage from "pages/LandingPage";
import Assistantspg from "pages/Assistantspg";
import Buissnessplan from "pages/BuissnessPlan";
import { useAuth } from "components/contexts/authContext";
import Login from "components/auth/login";
import Register from "components/auth/register";
import LoginPage from "pages/LoginPage";
import ChatHistoryList from "pages/ChatHistory";
import ChatPreview from "pages/ChatPreview";

const ProjectRoutes = () => {
  const { userLoggedIn } = useAuth();

  const element = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "landingpage", element: <LandingPage /> },
    { path: "assistants", element: userLoggedIn ? <Assistantspg /> : <Navigate to="/login" /> },
    { path: "buissnessplan", element: userLoggedIn ? <Buissnessplan /> : <Navigate to="/login" /> },
    { path: "ChatHistoryList", element: userLoggedIn ? <ChatHistoryList /> : <Navigate to="/login" /> },
    { path: "chatpreview/:threadId", element: userLoggedIn ? <ChatPreview /> : <Navigate to="/login" /> },

    { path: "login", element: <Login /> },
    { path: "*", element: <NotFound /> },
    { path: "register", element: <Register /> },

  ]);

  return element;
};

export default ProjectRoutes;

