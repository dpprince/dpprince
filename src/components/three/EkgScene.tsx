import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { Line, RoundedBox, Edges } from "@react-three/drei";
import { usePrefersReducedMotion, useIsMobile } from "../../hooks/useMediaQuery";

const CYAN = "#39d6ff";
const PULSE = "#ff5c7a";

const N = 420;

function waveY(u: number): number {
  let y = 0;
  y += 0.34 * Math.exp(-Math.pow((u - 0.13) / 0.035, 2)); // P
  y -= 0.5 * Math.exp(-Math.pow((u - 0.29) / 0.009, 2)); // Q
  y += 1.6 * Math.exp(-Math.pow((u - 0.325) / 0.012, 2)); // R
  y -= 0.8 * Math.exp(-Math.pow((u - 0.365) / 0.012, 2)); // S
  y += 0.6 * Math.exp(-Math.pow((u - 0.58) / 0.06, 2)); // T
  y += 0.13 * Math.exp(-Math.pow((u - 0.68) / 0.045, 2)); // U
  return y;
}

function buildWave(): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1);
    pts.push([-3.1 + u * 6.2, waveY(u), 0.06]);
  }
  return pts;
}

function buildGrid(): [number, number, number][][] {
  const lines: [number, number, number][][] = [];
  for (let i = -2; i <= 2; i += 1) {
    const y = i * 0.85;
    lines.push([
      [-3.1, y, 0.045],
      [3.1, y, 0.045],
    ]);
  }
  return lines;
}

export default function EkgScene() {
  const drawRef = useRef<unknown>(null);
  const dotRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile(768);

  const points = useMemo(() => buildWave(), []);
  const grid = useMemo(() => buildGrid(), []);

  useFrame(({ pointer, clock }) => {
    if (groupRef.current && !reduced) {
      groupRef.current.rotation.y += (pointer.x * 0.18 - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (-pointer.y * 0.12 - groupRef.current.rotation.x) * 0.04;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.05;
    }
    const t = reduced ? 1 : (clock.getElapsedTime() * 0.28) % 1;
    const idx = Math.max(2, Math.floor(t * (N - 1)));
    const line = drawRef.current as unknown as { geometry: { setDrawRange: (a: number, b: number) => void } };
    line?.geometry.setDrawRange(0, idx);
    const p = points[idx];
    if (dotRef.current) dotRef.current.position.set(p[0], p[1], p[2] + 0.04);
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.72 : 1}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 3, 4]} intensity={26} color={CYAN} distance={12} />

      {/* Monitor panel */}
      <RoundedBox args={[7.1, 4.4, 0.09]} radius={0.09} smoothness={4} position={[0, 0, -0.06]}>
        <meshStandardMaterial color="#0a141c" roughness={0.5} metalness={0.4} emissive={CYAN} emissiveIntensity={0.04} />
        <Edges color={CYAN} threshold={30} />
      </RoundedBox>

      {/* Grid */}
      {grid.map((pts, i) => (
        <Line key={`g${i}`} points={pts} color={CYAN} lineWidth={0.5} transparent opacity={0.07} />
      ))}

      {/* Full faint waveform */}
      <Line points={points} color={CYAN} lineWidth={1} transparent opacity={0.25} />

      {/* Sweep waveform */}
      <Line
        ref={drawRef as never}
        points={points}
        color={PULSE}
        lineWidth={2}
        transparent
        opacity={0.95}
      />

      {/* Sweep head */}
      <mesh ref={dotRef} position={[-3.1, 0, 0.1]}>
        <sphereGeometry args={[0.07, 14, 14]} />
        <meshBasicMaterial color={PULSE} />
      </mesh>

      {/* Screen corner dots */}
      <mesh position={[-3.25, -2.05, 0]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color={PULSE} />
      </mesh>
      <mesh position={[3.25, 2.05, 0]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color={CYAN} />
      </mesh>
    </group>
  );
}
