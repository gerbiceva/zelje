import { createBrowserRouter } from "react-router-dom";
import { FolkKaraoke } from "./views/DodajanjeKaraoke";
import { ZeljeodFolk } from "./views/AdminZelje";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FolkKaraoke></FolkKaraoke>,
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
    element: <FolkKaraoke></FolkKaraoke>,
  },
  {
    path: "/malejkajtafolkhocecut",
    element: <ZeljeodFolk></ZeljeodFolk>,
  },
]);
