import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { Loading } from '@/components/loading'

import './index.css'
import "@meshsdk/midnight-react/styles.css";
import '@/global.ts'

const LazyApp = lazy(() => import('./App'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <LazyApp />
    </Suspense>
  </StrictMode>,
)
