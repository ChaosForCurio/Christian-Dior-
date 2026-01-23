'use client';

import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import * as random from 'maath/random/dist/maath-random.esm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Stars(props: any) {
    const ref = useRef<THREE.Points>(null!);
    const [sphere] = useState(() => {
        const count = 6000; // 2000 points (x, y, z)
        const data = new Float32Array(count);
        try {
            random.inSphere(data, { radius: 1.5 });
            // Final check for any NaN values that might have been produced
            for (let i = 0; i < data.length; i++) {
                if (isNaN(data[i])) {
                    data[i] = (Math.random() - 0.5) * 2; // Fallback to random if NaN
                }
            }
        } catch (error) {
            console.error('Error generating random points in sphere:', error);
            // Fallback generation if maath fails
            for (let i = 0; i < count; i++) {
                data[i] = (Math.random() - 0.5) * 2;
            }
        }
        return data;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff" // Changed to white for better visibility, was #333333
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function Scene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars />
            </Canvas>
        </div>
    );
}
