"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VERT = `
attribute vec2 p;
varying vec2 vUv;
void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

// Flowing silk pattern, after the React Bits "Silk" shader, tinted between page background and copper.
const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform vec3 uBg;
uniform vec3 uTint;
uniform float uStrength;

float noise(vec2 c){ float G = 2.71828; vec2 r = G * sin(G * c); return fract(r.x * r.y * (1.0 + c.x)); }

void main(){
  vec2 uv = vUv;
  uv.x *= uRes.x / uRes.y;
  float a = -0.35;
  uv = mat2(cos(a), -sin(a), sin(a), cos(a)) * uv;
  vec2 t = uv * 1.6;
  float o = uTime * 0.35;
  t.y += 0.04 * sin(7.0 * t.x - o);
  float pattern = 0.6 + 0.4 * sin(5.0 * (t.x + t.y + cos(3.0 * t.x + 5.0 * t.y) + 0.02 * o) + sin(18.0 * (t.x + t.y - 0.1 * o)));
  float fade = smoothstep(0.0, 0.9, vUv.y) * smoothstep(1.2, 0.2, vUv.x * 0.6 + (1.0 - vUv.y) * 0.4);
  vec3 col = mix(uBg, uTint, pattern * uStrength * fade);
  col -= noise(gl_FragCoord.xy) / 40.0;
  gl_FragColor = vec4(col, 1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/**
 * WebGL silk backdrop for the home hero. Pauses off screen and in hidden tabs.
 * Renders nothing (CSS gradient fallback shows) for reduced motion, save-data or no WebGL.
 */
export function SilkBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uBg = gl.getUniformLocation(prog, "uBg");
    const uTint = gl.getUniformLocation(prog, "uTint");
    const uStrength = gl.getUniformLocation(prog, "uStrength");

    const setColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const dark = document.documentElement.classList.contains("dark");
      gl.uniform3fv(uBg, hexToRgb(cs.getPropertyValue("--background") || "#0b0a09"));
      gl.uniform3fv(uTint, hexToRgb(dark ? "#8a5230" : "#e2a574"));
      gl.uniform1f(uStrength, dark ? 0.55 : 0.5);
    };
    setColors();
    const themeObserver = new MutationObserver(setColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const scale = 0.5; // render at half resolution: soft pattern, cheap on phones
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(loop);
    canvas.style.opacity = "1";

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 85% 20%, rgb(200 129 74 / 0.22), transparent 70%), radial-gradient(50% 50% at 10% 90%, rgb(168 98 47 / 0.12), transparent 70%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-0 transition-opacity duration-1000" />
    </div>
  );
}
