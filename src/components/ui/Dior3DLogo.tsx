'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment, PerspectiveCamera, Center } from '@react-three/drei';
import Link from 'next/link';

function MonogramGeometry() {
    const { cShape, dShape } = useMemo(() => {
        // Safe, minimal paths
        const c = new THREE.Shape();
        c.moveTo(8, -8);
        c.quadraticCurveTo(-10, -8, -10, 0);
        c.quadraticCurveTo(-10, 8, 8, 8);
        c.lineTo(8, 5);
        c.quadraticCurveTo(-7, 5, -7, 0);
        c.quadraticCurveTo(-7, -5, 8, -5);
        c.lineTo(8, -8);

        const d = new THREE.Shape();
        d.moveTo(-4, -8);
        d.lineTo(-4, 8);
        d.lineTo(2, 8);
        d.quadraticCurveTo(12, 8, 12, 0);
        d.quadraticCurveTo(12, -8, 2, -8);
        d.lineTo(-4, -8);

        const dHole = new THREE.Path();
        dHole.moveTo(-1, -5);
        dHole.lineTo(-1, 5);
        dHole.lineTo(1, 5);
        dHole.quadraticCurveTo(9, 5, 9, 0);
        dHole.quadraticCurveTo(9, -5, 1, -5);
        dHole.lineTo(-1, -5);
        d.holes.push(dHole);

        return { cShape: c, dShape: d };
    }, []);

    const extrudeSettings = useMemo(() => ({
        depth: 1,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.2,
        bevelSegments: 2
    }), []);

    return (
        <group scale={[0.35, 0.35, 0.35]}>
            <mesh position={[-6, 0, 0]} castShadow>
                <extrudeGeometry args={[cShape, extrudeSettings]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    metalness={1}
                    roughness={0.05}
                    clearcoat={1}
                />
            </mesh>
            <mesh position={[1, 0, 0.5]} castShadow>
                <extrudeGeometry args={[dShape, extrudeSettings]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    metalness={1}
                    roughness={0.05}
                    clearcoat={1}
                />
            </mesh>
        </group>
    );
}

function InteractionContainer({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const targetRotY = (mouse.current.x * Math.PI) / 8;
        const targetRotX = -(mouse.current.y * Math.PI) / 10;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    });

    return <group ref={groupRef}>{children}</group>;
}

export default function Dior3DLogo() {
    return (
        <Link
            href="/"
            className="block h-16 w-32 relative group pointer-events-auto"
            aria-label="DIOR Home"
        >
            <div className="absolute inset-0 pointer-events-none z-10">
                <Canvas shadows alpha>
                    <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Center>
                        <InteractionContainer>
                            <MonogramGeometry />
                        </InteractionContainer>
                    </Center>
                    <Environment preset="city" />
                </Canvas>
            </div>
            <span className="sr-only">DIOR</span>
        </Link>
    );
}
