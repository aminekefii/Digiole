import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import VoyagervOne from "pages/VoyagervOne";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    {
      path: "voyagervone",
      element: <VoyagervOne />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
