import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function SeaWave() {
  const mesh = useRef()
  const timeUniform = useRef({ value: 0 })
  const materialRef = useRef()

  useFrame((state) => {
    timeUniform.current.value = state.clock.getElapsedTime()
  })

  useEffect(() => {
    const material = materialRef.current

    material.onBeforeCompile = (shader) => {
      // 注入 uniform
      shader.uniforms.time = timeUniform.current

      // 插入 uniform 宣告（放在最前面）
      shader.vertexShader = `
        uniform float time;
        varying vec2 vUv;
      ` + shader.vertexShader

      // 注入 vUv 宣告與儲存
      shader.vertexShader = shader.vertexShader.replace(
        '#include <uv_vertex>',
        `
          #include <uv_vertex>
          vUv = uv;
        `
      )

      // 注入波浪變形邏輯：取代 <begin_vertex>
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
          vec3 pos = position;
          float waveX = sin(pos.x * 2.0 + time * 2.0) * 0.05;
          float waveY = cos(pos.y * 2.0 + time * 2.5) * 0.05;
          pos.z += waveX + waveY;
          vec3 transformed = pos;
        `
      )
    }

    // 必須強制刷新 shader
    material.needsUpdate = true
  }, [])

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5, 5, 128, 128]} />
      <meshPhysicalMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
        color={0x00ffff}
        roughness={0.3}
        transmission={1}
        opacity={0.8}
        transparent={true}
        depthWrite={true}
      />
    </mesh>
  )
}
