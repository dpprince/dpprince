import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useWebGL } from "../../hooks/useWebGL";
import { useIsMobile } from "../../hooks/useMediaQuery";
import ErrorBoundary from "../ui/ErrorBoundary";

export interface SceneCanvasProps {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov?: number };
  "aria-label"?: string;
  /** Frameloop off until the section scrolls near viewport. Parent decides when to mount. */
}

/**
 * Canvas wrapper handling WebGL detection, device-aware pixel ratio
 * and an elegant 2D fallback when WebGL is unavailable.
 */
export default function SceneCanvas({
  children,
  fallback,
  className,
  camera = { position: [0, 0, 7], fov: 42 },
  ...rest
}: SceneCanvasProps) {
  const webgl = useWebGL();
  const isMobile = useIsMobile(768);

  if (webgl === false) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <ErrorBoundary fallback={<div className={className}>{fallback}</div>}>
      <Canvas
        className={className}
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        camera={camera}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        aria-label={rest["aria-label"]}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}
