import * as pino from "pino";
import { MidnightMeshProvider } from "@meshsdk/midnight-react";
import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";

const logger = pino.pino({
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
