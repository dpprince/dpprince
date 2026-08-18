import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { MeshDistortMaterial, Line } from "@react-three/drei";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

const CYAN = "#39d6ff";
const VIOLET = "#8b5cf6";

interface OrbitSatelliteProps {
  radius: number;
  speed: number;
  tilt: number;
  size: number;
  color: string;
}

function OrbitSatellite({ radius, speed, tilt, size, color }: OrbitSatelliteProps) {
  const ref = useRef<Group>(null);
  const reduced = usePrefersReducedMotion();

  useFrame(({ clock }) => {
    if (!ref.current || reduced) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={ref}>
        <mesh>
          <octahedronGeometry args={[size, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroCore() {
  const group = useRef<Group>(null);
  const ringARef = useRef<Group>(null);
  const ringBRef = useRef<Group>(null);
  const ringCRef = useRef<Group>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const particleCount = isMobile ? 240 : 460;
  const particles = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.9 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [particleCount]);

  const dataLines = useMemo(() => {
    const lines: [number, number, number][][] = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = 1.5;
      const end: [number, number, number] = [
        Math.cos(a) * r,
        Math.sin(a * 1.6) * 0.55,
        Math.sin(a) * r,
      ];
      lines.push([
        [0, 0, 0],
        end,
      ]);
    }
    return lines;
  }, []);

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime();
    if (group.current && !reduced) {
      group.current.rotation.y += (pointer.x * 0.35 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (pointer.y * 0.2 - group.current.rotation.x) * 0.05;
    }
    if (ringARef.current) ringARef.current.rotation.z = t * 0.16;
    if (ringBRef.current) ringBRef.current.rotation.z = -t * 0.11;
    if (ringCRef.current) ringCRef.current.rotation.z = t * 0.07;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 5]} intensity={28} color={CYAN} distance={14} />
      <pointLight position={[-4, -2, -4]} intensity={18} color={VIOLET} distance={12} />

      {/* Core */}
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <MeshDistortMaterial
          color="#0b1a24"
          roughness={0.18}
          metalness={0.92}
          emissive={CYAN}
          emissiveIntensity={0.22}
          distort={reduced ? 0 : 0.28}
          speed={1.6}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.06, 0]} />
        <meshBasicMaterial
          color={CYAN}
          wireframe
          transparent
          opacity={0.12}
          blending={2}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.24, 20, 20]} />
        <meshBasicMaterial color="#bdf2ff" transparent opacity={0.92} />
      </mesh>

      {/* Orbital rings */}
      <group ref={ringARef}>
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[1.62, 0.008, 8, 90]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.5} blending={2} />
        </mesh>
      </group>
      <group ref={ringBRef}>
        <mesh rotation={[Math.PI / 1.7, 0.6, 0]}>
          <torusGeometry args={[2.05, 0.006, 8, 100]} />
          <meshBasicMaterial color={VIOLET} transparent opacity={0.38} blending={2} />
        </mesh>
      </group>
      <group ref={ringCRef}>
        <mesh rotation={[Math.PI / 2.6, -0.5, 0]}>
          <torusGeometry args={[2.45, 0.005, 8, 110]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.22} blending={2} />
        </mesh>
      </group>

      {/* Data lines */}
      {dataLines.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={CYAN}
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      ))}

      {/* Satellites */}
      <OrbitSatellite radius={1.62} speed={0.5} tilt={Math.PI / 2.2} size={0.07} color={CYAN} />
      <OrbitSatellite radius={2.05} speed={0.32} tilt={Math.PI / 1.7} size={0.055} color={VIOLET} />
      <OrbitSatellite radius={2.45} speed={0.2} tilt={Math.PI / 2.6} size={0.04} color="#e7eef5" />

      {/* Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color={CYAN}
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={2}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
