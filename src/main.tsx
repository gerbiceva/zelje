import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { mantineModals } from "./mantine/modals/modals.tsx";
import { mantineTheme } from "./mantine/theme.ts";
import { router } from "./router/router.tsx";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
import { CustomSpotlight } from "./mantine/spotlight.tsx";
// import FingerprintJS from '@fingerprintjs/fingerprintjs';

//   const fp = await FingerprintJS.load().then((data)=>{
//     data.get().then((zaresData)=>{
//       console.log(zaresData.visitorId, zaresData.confidence);
      
//     })
    
//   })

  

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={mantineTheme}>
      <Notifications />
      <CustomSpotlight />
      <ModalsProvider modals={mantineModals}>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
