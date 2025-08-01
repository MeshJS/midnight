import * as pino from "pino";
import { MidnightMeshProvider } from "@meshsdk/midnight-react";
import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { MainLayout } from "./layouts/layout";
import { WalletUI } from "./pages/wallet-ui";
import { Counter } from "./pages/counter";

const logger = pino.pino({
  level: "trace",
});

function App() { 

  return (    
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MidnightMeshProvider logger={logger}>
        <BrowserRouter basename="/">      
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />                
                  <Route path="/wallet-ui" element={<WalletUI />} />
                  <Route path="/counter" element={<Counter />} />
                </Route>
              </Routes>
            </BrowserRouter>                
      </MidnightMeshProvider>
    </ThemeProvider>    
  )
}

export default App
