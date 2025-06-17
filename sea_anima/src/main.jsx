import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { Perf } from 'r3f-perf'
import './index.css'
import App from './App.jsx'
import NoiseOverlay from './components/NoiseOverlay.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoiseOverlay />
    <Canvas
      camera={
        {
          fov: 45,
          near: 0.1,
          far: 200,
          position: [3, 4, 6],
        }
      }
    >
      <App />
      <Perf position="top-left" />
    </Canvas>
    {/* <Leva collapsed={false} /> */}
  </StrictMode>,
)
