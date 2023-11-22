import { createBrowserRouter } from "react-router-dom";
import { FolkZelje } from "./views/DodajanjeZelje";
import { ZeljeodFolk } from "./views/AdminZelje";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FolkZelje></FolkZelje>,
  },
  // {
  //   path: "/auth",
  //   element: (
  //     <ProtectedPath
  //       redirectUrl="/"
  //       shouldRedirect={(user) => {
  //         return user != null;
  //       }}
  //     >
  //       <Authentication />
  //     </ProtectedPath>
  //   ),
  // },
  {
    path: "/zelje",
    element: <FolkZelje></FolkZelje>,
  },
  {
    path: "/malejkajtafolkhocecut",
    element: <ZeljeodFolk></ZeljeodFolk>,
  },
]);
