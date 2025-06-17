import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect } from 'react'
import './App.css'
import SeaWave from './components/seaWave.jsx'
import GroundPlane from './components/ground.jsx'
import * as Three from 'three'

function App() {

  const { nodes } = useGLTF('./rocks.glb')

  useEffect(() => {
    nodes.Scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new Three.MeshStandardMaterial(
          {
            color: 0x666666,
            roughness: 0.8,
            metalness: 0.1
          }
        )
        child.receiveShadow = true
        child.castShadow = true
      }
    })
  }, [nodes])

  const { posX, posY, posZ, scale, rotX, rotY, rotZ } = useControls('Sea Rock 控制', {
    posX: { value: 0.4, min: -5, max: 5, step: 0.1 },
    posY: { value: -0.2, min: -2, max: 2, step: 0.01 },
    posZ: { value: 0.5, min: -5, max: 5, step: 0.1 },
    scale: { value: 1, min: 0.1, max: 2, step: 0.1 },
    rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotY: { value: -0.8, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 }
  })

  return (
    <>
      <Environment preset="forest" />
      <primitive
        object={nodes.Scene}
        position={[posX, posY, posZ]}
        scale={[scale, scale, scale]}
        rotation={new Three.Euler(rotX, rotY, rotZ)}
      />
      <SeaWave />
      <GroundPlane />
      <OrbitControls 
        minPolarAngle={0}
        maxPolarAngle={Three.MathUtils.degToRad(75)}
      />
    </>
  )
}

export default App
