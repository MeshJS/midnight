import * as pino from "pino";
import { MidnightMeshProvider } from "@meshsdk/midnight-react";
import { ThemeProvider } from "@/components/theme-provider"
import "@meshsdk/midnight-react/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";

export const logger = pino.pino({
  level: "trace",
});

function App() { 

  return (
    <>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MidnightMeshProvider logger={logger}>
      <BrowserRouter basename="/">
          <Routes>            
            <Route path="/" element={<Home />} />            
          </Routes>
        </BrowserRouter>           
      </MidnightMeshProvider>
    </ThemeProvider>
    </>
  )
}

export default App
