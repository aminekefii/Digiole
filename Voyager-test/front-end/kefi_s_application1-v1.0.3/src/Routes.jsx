import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/NotFound";
import LandingPage from "pages/LandingPage";
import Assistantspg from "pages/Assistantspg";
import Buissnessplan from "pages/BuissnessPlan";


const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "*", element: <NotFound /> },
    {
      path: "landingpage",
      element: <LandingPage></LandingPage>
    },
    {
      path: "assistants",
      element: <Assistantspg></Assistantspg>
    },
    {
      path: "buissnessplan",
      element: <Buissnessplan />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
