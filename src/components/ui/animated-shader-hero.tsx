"use client";

import React, { useEffect, useRef } from "react";

interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  className?: string;
}

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`;

const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private scale: number;
  private shaderSource = defaultShaderSource;
  private mouseMove = [0, 0];
  private mouseCoords = [0, 0];
  private pointerCoords = [0, 0];
  private nbrOfPointers = 0;
  private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  constructor(canvas: HTMLCanvasElement, scale: number) {
    const gl = canvas.getContext("webgl2");
    if (!gl) throw new Error("WebGL2 is not supported.");
    this.canvas = canvas;
    this.scale = scale;
    this.gl = gl;
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
  }

  updateShader(source: string) {
    this.reset();
    this.shaderSource = source;
    this.setup();
    this.init();
  }

  updateMove(deltas: number[]) {
    this.mouseMove = deltas;
  }

  updateMouse(coords: number[]) {
    this.mouseCoords = coords;
  }

  updatePointerCoords(coords: number[]) {
    this.pointerCoords = coords;
  }

  updatePointerCount(nbr: number) {
    this.nbrOfPointers = nbr;
  }

  updateScale(scale: number) {
    this.scale = scale;
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  compile(shader: WebGLShader, source: string) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    }
  }

  test(source: string) {
    let result = null;
    const gl = this.gl;
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!shader) return "Unable to create fragment shader.";
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader);
    }
    gl.deleteShader(shader);
    return result;
  }

  reset() {
    const gl = this.gl;
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) {
        gl.detachShader(this.program, this.vs);
        gl.deleteShader(this.vs);
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs);
        gl.deleteShader(this.fs);
      }
      gl.deleteProgram(this.program);
    }
  }

  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    if (!this.vs || !this.fs) return;
    this.compile(this.vs, vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram();
    if (!this.program) return;
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const gl = this.gl;
    const program = this.program;
    if (!program) return;

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    (program as WebGLProgram & Record<string, WebGLUniformLocation | null>).resolution = gl.getUniformLocation(program, "resolution");
    (program as WebGLProgram & Record<string, WebGLUniformLocation | null>).time = gl.getUniformLocation(program, "time");
    (program as WebGLProgram & Record<string, WebGLUniformLocation | null>).move = gl.getUniformLocation(program, "move");
    (program as WebGLProgram & Record<string, WebGLUniformLocation | null>).touch = gl.getUniformLocation(program, "touch");
    (program as WebGLProgram & Record<string, WebGLUniformLocation | null>).pointerCount = gl.getUniformLocation(program, "pointerCount");
    (program as WebGLProgram & Record<string, WebGLUniformLocation | null>).pointers = gl.getUniformLocation(program, "pointers");
  }

  render(now = 0) {
    const gl = this.gl;
    const program = this.program as (WebGLProgram & Record<string, WebGLUniformLocation | null>) | null;

    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    gl.uniform2f(program.resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(program.time, now * 1e-3);
    gl.uniform2f(program.move, this.mouseMove[0], this.mouseMove[1]);
    gl.uniform2f(program.touch, this.mouseCoords[0], this.mouseCoords[1]);
    gl.uniform1i(program.pointerCount, this.nbrOfPointers);
    gl.uniform2fv(program.pointers, this.pointerCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

class PointerHandler {
  private scale: number;
  private active = false;
  private pointers = new Map<number, number[]>();
  private lastCoords = [0, 0];
  private moves = [0, 0];

  constructor(element: HTMLCanvasElement, scale: number) {
    this.scale = scale;
    const map = (x: number, y: number) => [x * this.getScale(), element.height - y * this.getScale()];

    element.addEventListener("pointerdown", (e) => {
      this.active = true;
      this.pointers.set(e.pointerId, map(e.clientX, e.clientY));
    });

    element.addEventListener("pointerup", (e) => {
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener("pointerleave", (e) => {
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener("pointermove", (e) => {
      if (!this.active) return;
      this.lastCoords = [e.clientX, e.clientY];
      this.pointers.set(e.pointerId, map(e.clientX, e.clientY));
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
    });
  }

  getScale() {
    return this.scale;
  }

  updateScale(scale: number) {
    this.scale = scale;
  }

  get count() {
    return this.pointers.size;
  }

  get move() {
    return this.moves;
  }

  get coords() {
    return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0];
  }

  get first() {
    return this.pointers.values().next().value || this.lastCoords;
  }
}

const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const resize = () => {
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      rendererRef.current?.updateScale(dpr);
      pointersRef.current?.updateScale(dpr);
    };

    const loop = (now: number) => {
      if (!rendererRef.current || !pointersRef.current) return;

      rendererRef.current.updateMouse(pointersRef.current.first);
      rendererRef.current.updatePointerCount(pointersRef.current.count);
      rendererRef.current.updatePointerCoords(pointersRef.current.coords);
      rendererRef.current.updateMove(pointersRef.current.move);
      rendererRef.current.render(now);
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    try {
      rendererRef.current = new WebGLRenderer(canvas, dpr);
      pointersRef.current = new PointerHandler(canvas, dpr);
      rendererRef.current.setup();
      rendererRef.current.init();
      resize();

      if (rendererRef.current.test(defaultShaderSource) === null) {
        rendererRef.current.updateShader(defaultShaderSource);
      }

      loop(0);
      window.addEventListener("resize", resize);
    } catch (error) {
      console.error(error);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      rendererRef.current?.reset();
    };
  }, []);

  return canvasRef;
};

const Hero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = "",
}) => {
  const canvasRef = useShaderBackground();

  return (
    <div className={`animated-shader-hero ${className}`}>
      <style jsx>{`
        .animated-shader-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #000;
          color: #fff;
        }

        .shader-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          touch-action: none;
          background: #000;
        }

        .shader-content {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 1rem;
          text-align: center;
        }

        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          padding: 0.75rem 1.5rem;
          border: 1px solid rgba(253, 186, 116, 0.3);
          border-radius: 999px;
          background: rgba(249, 115, 22, 0.1);
          color: #ffedd5;
          font-size: 0.875rem;
          backdrop-filter: blur(14px);
          animation: fade-in-down 0.8s ease-out forwards;
        }

        .headline {
          max-width: 72rem;
          margin: 0 auto;
        }

        .headline-line {
          margin: 0;
          font-weight: 800;
          font-size: clamp(3rem, 8vw, 8rem);
          line-height: 0.95;
          letter-spacing: 0;
          background: linear-gradient(90deg, #fdba74, #facc15, #fcd34d);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .headline-line + .headline-line {
          background-image: linear-gradient(90deg, #fde047, #fb923c, #f87171);
          animation-delay: 0.2s;
        }

        .subtitle {
          max-width: 48rem;
          margin: 1.5rem auto 0;
          color: rgba(255, 237, 213, 0.9);
          font-size: clamp(1.125rem, 2vw, 1.5rem);
          font-weight: 300;
          line-height: 1.5;
          animation: fade-in-up 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .cta-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-top: 2.5rem;
          animation: fade-in-up 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .cta {
          min-height: 3.5rem;
          padding: 0 2rem;
          border: 1px solid rgba(253, 186, 116, 0.32);
          border-radius: 999px;
          color: #ffedd5;
          background: rgba(249, 115, 22, 0.1);
          font-weight: 700;
          cursor: pointer;
          transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease;
        }

        .cta-primary {
          border-color: transparent;
          background: linear-gradient(90deg, #f97316, #eab308);
          color: #050505;
        }

        .cta:hover {
          transform: translateY(-1px) scale(1.02);
          border-color: rgba(253, 186, 116, 0.56);
          background-color: rgba(249, 115, 22, 0.18);
        }

        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <canvas ref={canvasRef} className="shader-canvas" />

      <div className="shader-content">
        {trustBadge && (
          <div className="trust-badge">
            {trustBadge.icons?.map((icon, index) => <span key={index}>{icon}</span>)}
            <span>{trustBadge.text}</span>
          </div>
        )}

        <div className="headline">
          <h1 className="headline-line">{headline.line1}</h1>
          <h1 className="headline-line">{headline.line2}</h1>
        </div>

        <p className="subtitle">{subtitle}</p>

        {buttons && (
          <div className="cta-row">
            {buttons.primary && (
              <button className="cta cta-primary" onClick={buttons.primary.onClick}>
                {buttons.primary.text}
              </button>
            )}
            {buttons.secondary && (
              <button className="cta" onClick={buttons.secondary.onClick}>
                {buttons.secondary.text}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
