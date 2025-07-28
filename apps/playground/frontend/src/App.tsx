import './App.css';
import * as pino from "pino";
import { MidnightMeshProvider } from "@meshsdk/midnight-react";
import { MidnightWallet } from "@meshsdk/midnight-react";
import "@meshsdk/midnight-react/styles.css";

export const logger = pino.pino({
  level: "trace",
});

function App() { 

  return (
    <>
      <MidnightMeshProvider logger={logger}>
        <MidnightWallet />      
      </MidnightMeshProvider>
    </>
  )
}

export default App
