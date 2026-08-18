import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { QuadraticBezierCurve3, Vector3 } from "three";
import { Line } from "@react-three/drei";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaQuery";

const CYAN = "#39d6ff";
const ORANGE = "#ff9a5c";
const VIOLET = "#8b5cf6";

interface TrajectoryPoints {
  pts: [number, number, number][];
  up: [number, number, number];
}

function buildTrajectory(): TrajectoryPoints {
  const curve = new QuadraticBezierCurve3(
    new Vector3(-2.3, 0.15, 0),
    new Vector3(-0.7, 2.4, 0.6),
    new Vector3(0.2, 3.4, 0.1)
  );
  const pts: [number, number, number][] = curve
    .getPoints(48)
    .map((v) => [v.x, v.y, v.z] as [number, number, number]);
  return { pts, up: [0, 1, 0] };
}

function Rocket() {
  const glowRef = useRef<Mesh>(null);
  const reduced = usePrefersReducedMotion();

  useFrame(({ clock }) => {
    if (!glowRef.current || reduced) return;
    const s = 0.8 + Math.sin(clock.getElapsedTime() * 14) * 0.25;
    glowRef.current.scale.set(s, 1 + (s - 0.8) * 2, s);
  });

  return (
    <group position={[-2.3, 0.3, 0]} rotation={[0, 0, 0]}>
      <group rotation={[0, 0, -0.42]}>
        {/* Body */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.7, 14]} />
          <meshStandardMaterial color="#dce6f0" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Nose cone */}
        <mesh position={[0, 0.75, 0]}>
          <coneGeometry args={[0.13, 0.4, 14]} />
          <meshStandardMaterial color="#ff5c7a" roughness={0.35} metalness={0.4} />
        </mesh>
        {/* Fins */}
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[0, 0.12, 0]}
            rotation={[0, (i * Math.PI * 2) / 3, 0]}
          >
            <coneGeometry args={[0.07, 0.32, 4]} />
            <meshStandardMaterial color="#ff5c7a" roughness={0.4} />
          </mesh>
        ))}
        {/* Engine glow */}
        <mesh ref={glowRef as never} position={[0, -0.06, 0]}>
          <coneGeometry args={[0.1, 0.42, 14]} />
          <meshBasicMaterial color={ORANGE} transparent opacity={0.7} blending={2} />
        </mesh>
      </group>
    </group>
  );
}

export default function RocketScene() {
  const orbitRef = useRef<Group>(null);
  const satRef = useRef<Group>(null);
  const planetRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile(768);

  const { pts, up } = useMemo(buildTrajectory, []);
  const starCount = isMobile ? 180 : 380;
  const stars = useMemo(() => {
    const arr = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 4 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [starCount]);

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current && !reduced) {
      groupRef.current.rotation.y += (pointer.x * 0.2 - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (-pointer.y * 0.12 - groupRef.current.rotation.x) * 0.04;
    }
    if (orbitRef.current) orbitRef.current.rotation.z = t * 0.06;
    if (satRef.current && !reduced) {
      const a = t * 0.42;
      satRef.current.position.set(Math.cos(a) * 2.1, 0, Math.sin(a) * 2.1);
    }
    if (planetRef.current && !reduced) {
      planetRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.72 : 1}>
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 4, 4]} intensity={28} color={CYAN} distance={14} />
      <pointLight position={[-2, -1, -3]} intensity={12} color={VIOLET} distance={10} />

      {/* Planet */}
      <group position={[1.6, -0.6, 0]}>
        <mesh ref={planetRef as never}>
          <sphereGeometry args={[0.85, 40, 40]} />
          <meshStandardMaterial color="#0c1a2c" roughness={0.7} metalness={0.3} emissive={CYAN} emissiveIntensity={0.08} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.94, 32, 32]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.1} blending={2} />
        </mesh>

        {/* Orbit ring */}
        <group ref={orbitRef} rotation={[Math.PI / 2.35, 0, 0]}>
          <mesh>
            <torusGeometry args={[2.1, 0.008, 8, 120]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.4} blending={2} />
          </mesh>
          <group ref={satRef}>
            <mesh>
              <octahedronGeometry args={[0.09, 0]} />
              <meshStandardMaterial color="#e7eef5" emissive={CYAN} emissiveIntensity={1.2} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Launchpad */}
      <mesh position={[-2.3, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.5, 0.05, 24]} />
        <meshStandardMaterial color="#16222e" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[-2.3, 0.09, 0]}>
        <cylinderGeometry args={[0.36, 0.42, 0.1, 24]} />
        <meshStandardMaterial color="#0d141b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Rocket */}
      <Rocket />

      {/* Trajectory */}
      <Line points={pts} color={CYAN} lineWidth={1.2} transparent opacity={0.5} dashed dashSize={0.12} gapSize={0.08} />
      <Line points={[[-2.3, 0.28, 0], up]} color={ORANGE} lineWidth={1} transparent opacity={0.4} />

      {/* Stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.022} color="#cfe7ff" transparent opacity={0.7} depthWrite={false} blending={2} sizeAttenuation />
      </points>
    </group>
  );
}
