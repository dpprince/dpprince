import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { RoundedBox, Edges, Line } from "@react-three/drei";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

const CYAN = "#39d6ff";
const GOLD = "#c9a85e";
const VIOLET = "#8b5cf6";

interface TraceProps {
  a: [number, number, number];
  b: [number, number, number];
  color?: string;
  opacity?: number;
}

function Trace({ a, b, color = GOLD, opacity = 0.5 }: TraceProps) {
  return (
    <Line
      points={[a, b]}
      color={color}
      lineWidth={1}
      transparent
      opacity={opacity}
    />
  );
}

function Pins() {
  const pins: { x: number; z: number }[] = [];
  const span = 1.05;
  for (let i = 0; i < 7; i++) {
    const p = -0.78 + i * 0.26;
    pins.push({ x: p, z: span }, { x: p, z: -span }, { x: span, z: p }, { x: -span, z: p });
  }
  return (
    <>
      {pins.map((pin, i) => (
        <mesh key={i} position={[pin.x, -0.14, pin.z]}>
          <boxGeometry args={[0.06, 0.2, 0.06]} />
          <meshStandardMaterial color="#9fb2c4" metalness={0.85} roughness={0.35} />
        </mesh>
      ))}
    </>
  );
}

export default function AboutScene() {
  const group = useRef<Group>(null);
  const dotRef = useRef<Group>(null);
  const reduced = usePrefersReducedMotion();

  const traces = useMemo(() => {
    const rows: [number, number, number][][] = [];
    for (let i = 0; i < 4; i++) {
      const y = -0.9 + i * 0.6;
      rows.push([
        [-2.4, y, 1.15],
        [-0.6, y, 1.15],
      ]);
      rows.push([
        [2.4, y, -1.15],
        [0.6, y, -1.15],
      ]);
    }
    for (let i = 0; i < 4; i++) {
      const x = -0.9 + i * 0.6;
      rows.push([
        [1.15, -0.9 + 0.6 * ((i + 1) % 2) - 0.3, x],
        [1.15, 0.3, x],
      ]);
    }
    return rows;
  }, []);

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime();
    if (group.current && !reduced) {
      group.current.rotation.y += (pointer.x * 0.25 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (pointer.y * 0.15 - group.current.rotation.x) * 0.04;
      group.current.position.y = Math.sin(t * 0.6) * 0.06;
    }
    if (dotRef.current && !reduced) {
      const seg = (t * 0.35) % 4;
      const y = -0.9 + seg * 0.6;
      dotRef.current.position.set(-2.4 + 1.8 * seg, y, 1.15);
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 4, 4]} intensity={26} color={CYAN} distance={12} />
      <pointLight position={[-3, -2, -3]} intensity={14} color={VIOLET} distance={10} />

      {/* PCB substrate */}
      <RoundedBox args={[5, 0.12, 5]} radius={0.1} smoothness={3} position={[0, -0.16, 0]}>
        <meshStandardMaterial color="#0d1a20" roughness={0.55} metalness={0.35} />
      </RoundedBox>

      {/* Traces */}
      {traces.map((pts, i) => (
        <Trace key={i} a={pts[0]} b={pts[1]} />
      ))}
      <Trace a={[-1.15, 0.05, -1.15]} b={[1.15, 0.05, 1.15]} color={CYAN} opacity={0.3} />
      <Trace a={[1.15, 0.05, -1.15]} b={[-1.15, 0.05, 1.15]} color={CYAN} opacity={0.3} />

      {/* Travelling signal dot */}
      <group ref={dotRef}>
        <mesh>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={GOLD} />
        </mesh>
      </group>

      {/* Chip */}
      <group>
        <RoundedBox args={[1.72, 0.2, 1.72]} radius={0.07} smoothness={4}>
          <meshStandardMaterial color="#131c26" roughness={0.3} metalness={0.7} />
          <Edges color={CYAN} threshold={30} />
        </RoundedBox>
        <Pins />
        {/* Die marking */}
        <mesh position={[0, 0.112, 0]}>
          <boxGeometry args={[1.08, 0.01, 1.08]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, 0.118, 0]}>
          <boxGeometry args={[0.4, 0.008, 0.4]} />
          <meshBasicMaterial color={VIOLET} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Hovering data chips */}
      <mesh position={[2.1, 0.5, 1.4]} rotation={[0, 0.6, 0.4]}>
        <boxGeometry args={[0.5, 0.32, 0.1]} />
        <meshStandardMaterial color="#1a2430" emissive={CYAN} emissiveIntensity={0.18} roughness={0.4} />
      </mesh>
      <mesh position={[-2, 0.35, -1.2]} rotation={[0.2, -0.5, -0.2]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#1a2430" emissive={VIOLET} emissiveIntensity={0.22} roughness={0.4} />
      </mesh>
    </group>
  );
}
