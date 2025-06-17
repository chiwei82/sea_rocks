import { GroundVertexShader, GroundFragmentShader } from './shaders/G_texture.jsx'
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import * as Three from 'three'

export default function GroundPlane(){
    const mesh = useRef()

    const mask = useLoader(Three.TextureLoader, './arrow-mask.png')
    const GroundDotMaterial = new Three.ShaderMaterial({
        vertexShader: GroundVertexShader,
        fragmentShader: GroundFragmentShader,
        uniforms: {
            uTime: { value: 0 }
        },
        side: Three.DoubleSide,
        transparent: true
    })

    useFrame((state) => {
        GroundDotMaterial.uniforms.uTime.value = state.clock.getElapsedTime()
    })

    return (
        <mesh 
            ref = {mesh}
            position={[0, -0.5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
        >
            <planeGeometry args={[60, 60]}></planeGeometry>
            <primitive object={GroundDotMaterial} attach="material"/>
        </mesh>
    )   
}
