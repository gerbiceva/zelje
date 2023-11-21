import { createBrowserRouter } from "react-router-dom";
import App from "./views/Hello";
import { Authentication } from "./views/Auth";
import { ProtectedPath } from "../components/ProtectedPath";
import { FolkZelje } from "./views/FolkZelje";
import { ZeljeodFolk } from "./views/ZeljeodFolk";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedPath redirectUrl="/auth">
        <App />
      </ProtectedPath>
    ),
  },
  {
    path: "/auth",
    element: (
      <ProtectedPath
        redirectUrl="/"
        shouldRedirect={(user) => {
          return user != null;
        }}
      >
        <Authentication />
      </ProtectedPath>
    ),
  },
  {
    path: "/zelje",
    element: (
      <FolkZelje></FolkZelje>
    ),
  },
  {
    path: "/malejkajtafolkhocecut",
    element: (
      <ZeljeodFolk></ZeljeodFolk>
    ),
  },
]);
