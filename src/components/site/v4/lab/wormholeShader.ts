/** Art-directed optical space. Uses the existing NASA/ESO photographic skies;
 * the lens and layered throat are visual approximations, not a GR ray tracer.
 * All light stays linear HDR until the scene's shared AgX pass.
 */
export const wormholeFragment = /* glsl */ `
  uniform mat4 uInvProj;
  uniform mat4 uCamWorld;
  uniform vec2 uRes;
  uniform float uPx;
  uniform float uTime;
  uniform float uFade;
  uniform vec3 uGlow;
  uniform vec3 uHoleDir;
  uniform float uHoleR;
  uniform float uEnter;
  uniform float uTravel;
  uniform float uSpeed;
  uniform float uCharge;
  uniform sampler2D uOur;
  uniform sampler2D uFar;
  uniform float uOurOn;
  uniform float uFarOn;
  uniform float uSharp;

  const float PI = 3.14159265;
  const vec3 IVORY = vec3(1.0, 0.88, 0.68);

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
      mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }
  vec3 rotate(vec3 v, vec3 k, float a) {
    return v * cos(a) + cross(k, v) * sin(a) + k * dot(k, v) * (1.0 - cos(a));
  }
  vec2 equi(vec3 d) {
    d.xy = mat2(0.906, 0.423, -0.423, 0.906) * d.xy;
    return vec2(atan(d.x, -d.z) / (2.0 * PI) + 0.5,
      asin(clamp(d.y, -1.0, 1.0)) / PI + 0.5);
  }
  vec3 grade(vec3 c) {
    float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
    // Keep the sky's real dust lanes; warm highlights, neutral deep space.
    c = mix(vec3(l), c, 0.82);
    return c * mix(vec3(0.72, 0.8, 1.0), vec3(1.12, 1.02, 0.87), smoothstep(0.025, 0.45, l));
  }
  vec3 skySample(sampler2D map, vec2 uv) {
    vec3 c;
    if (uSharp > 0.5) {
      // Compare the original trilinear lookup with a slightly finer mip.
      // Tighten photographic contrast without inventing bright star pixels.
      c = texture2D(map, uv, -0.65).rgb;
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c *= mix(0.74, 1.13, smoothstep(0.025, 0.22, l));
    } else {
      c = texture2D(map, uv).rgb;
    }
    return c;
  }
  vec3 widerSky(vec3 d) {
    if (uSharp < 0.5) return d;
    vec3 forward = normalize(mat3(uCamWorld) * vec3(0.0, 0.0, -1.0));
    float axial = dot(d, forward);
    // A wider photographic lens behind the narrow bot camera: the source
    // centre stays fixed, while each screen pixel covers more real panorama.
    return normalize(forward * axial + (d - forward * axial) * 1.85);
  }
  vec3 ours(vec3 d) {
    return grade(skySample(uOur, equi(widerSky(d)))) * uOurOn * 1.15;
  }
  vec3 farSky(vec3 d) {
    return grade(skySample(uFar, equi(d))) * uFarOn * 1.55;
  }
  float gaussian(float x, float width) {
    return exp(-x * x / max(width * width, 1e-8));
  }

  void main() {
    vec2 ndc = gl_FragCoord.xy / uRes * 2.0 - 1.0;
    vec4 view = uInvProj * vec4(ndc, 1.0, 1.0);
    vec3 dir = normalize(mat3(uCamWorld) * (view.xyz / view.w));
    float ct = clamp(dot(dir, uHoleDir), -1.0, 1.0);
    float th = acos(ct);
    float R = uHoleR;
    float aa = max(fwidth(th), uPx * 0.5);
    vec3 t1 = normalize(cross(uHoleDir, vec3(0, 1, 0)));
    vec3 t2 = cross(uHoleDir, t1);
    vec2 pr = vec2(dot(dir, t1), dot(dir, t2));
    vec2 radial = pr / max(length(pr), 1e-5);
    float phi = atan(radial.y, radial.x);
    vec3 axis = normalize(cross(uHoleDir, dir) + vec3(1e-6));

    // A photographic Einstein ring. A second, faint image just outside it
    // adds optical thickness without turning the mouth into a neon circle.
    float near = R / max(th, R);
    float bent = th - R * R * 1.08 / max(th, R * 0.38);
    vec3 src = rotate(dir, axis, bent - th);
    src = rotate(src, uHoleDir, uTime * 0.002 + near * near * 0.035);
    float arc = 0.026 * pow(near, 4.0);
    vec3 exterior = (ours(rotate(src, uHoleDir, -arc)) + ours(src) * 2.0
      + ours(rotate(src, uHoleDir, arc))) * 0.25;
    exterior *= 1.0 + 0.42 * pow(near, 5.0);

    float u = th / R;
    vec3 forward = normalize(vec3(0.22 + sin(uTime * 0.006) * 0.08, 0.08, -1));
    vec3 right = normalize(cross(forward, vec3(0, 1, 0)));
    vec3 up = cross(right, forward);
    float farAngle = 2.95 * pow(min(u, 1.0), 1.72);
    vec3 through = cos(farAngle) * forward + sin(farAngle) * (radial.x * right + radial.y * up);
    vec3 interior = farSky(through);
    float crescent = pow(max(dot(radial, normalize(vec2(0.75, 0.55))), 0.0), 5.0);
    float edgeLight = gaussian(th - R, max(aa * 1.3, R * 0.009));
    float halo = gaussian(th - R, R * 0.16);
    vec3 col = mix(exterior, interior, 1.0 - smoothstep(R - aa, R + aa, th));
    col += IVORY * (edgeLight * (0.13 + crescent * 1.8) + halo * crescent * 0.12);
    col += farSky(rotate(through, forward, 0.4))
      * gaussian(th - R * 1.07, max(aa, R * 0.013)) * 0.22;

    if (uEnter > 0.001) {
      // Layered curved glass: broad folds carry fine photographic detail.
      // The ray meets three radii at different depths, giving true relative
      // motion as travel changes. Break up the old uniform radial streaks.
      float radius = max(tan(min(th, 1.4)), 0.009);
      float travel = uTravel;
      vec3 tunnel = vec3(0.001, 0.002, 0.004);
      for (int i = WORMHOLE_LAYERS - 1; i >= 0; i--) {
        float fi = float(i);
        float z = (0.42 + fi * 0.57) / radius;
        float depth = z + travel * (1.0 - fi * 0.09);
        // Bending the axis, rather than just rotating a flat radial image.
        float bend = sin(depth * 0.17 + fi * 1.8) * 0.62;
        float angle = phi + bend + depth * (0.065 - fi * 0.018);
        vec2 cylindrical = vec2(cos(angle), sin(angle));
        float clouds = noise(cylindrical * 2.8 + vec2(depth * 0.038, fi * 8.0));
        float folds = sin(angle * 2.0 + depth * 0.12 + clouds * 1.5 + fi * 1.9);
        float strata = sin(angle * 6.0 - depth * 0.09 + clouds * 3.0);
        float wall = smoothstep(-0.72, 0.8, folds + strata * 0.14);

        vec2 uv = vec2(fract(angle / (2.0 * PI) + fi * 0.23
            + depth * mix(0.009, 0.017, uSharp)),
          0.48 + mix(0.19, 0.26, uSharp)
            * sin(angle * 0.7 + depth * 0.14 + fi * 1.4)
            + mix(0.08, 0.1, uSharp) * clouds);
        vec3 plate = skySample(uFar, uv);
        // A restrained photographic smear length follows actual velocity.
        plate += skySample(uFar, uv + vec2(0.0015, 0.0004) * min(uSpeed, 2.0));
        plate = grade(plate * 0.5) * uFarOn;
        float extinction = exp(-z * 0.045);
        float bodyLight = pow(wall, 5.0);
        vec3 glassTint = mix(vec3(0.055, 0.075, 0.12), vec3(0.7, 0.48, 0.3), clouds);
        vec3 layer = (plate * (0.012 + 1.06 * bodyLight)
          + glassTint * bodyLight * (0.045 + clouds * 0.1)) * extinction;

        // Narrow caustics sit on the edge of broad shadowed folds. They are
        // pearl/gold, not an RGB outline, and recede with the glass layer.
        float foldAA = max(fwidth(folds), 0.012);
        float caustic = gaussian(folds - 0.68, max(0.035, foldAA * 0.85));
        float broken = 0.2 + 0.8 * smoothstep(0.42, 0.85, clouds);
        vec3 light = mix(vec3(0.6, 0.69, 0.85), IVORY, wall);
        layer += light * caustic * broken * extinction * (0.13 + plate * 1.55) * (1.0 + uCharge * 0.5);
        layer += IVORY * gaussian(folds - 0.68, 0.14) * broken * extinction * 0.032;

        // Widely spaced curved wavefronts reveal the depth of the throat.
        float phase = depth * 0.17 + clouds * 0.16;
        float ringDist = abs(fract(phase) - 0.5);
        float ringAA = max(fwidth(phase), 0.002);
        float ring = 1.0 - smoothstep(0.004, 0.004 + ringAA * 1.8, ringDist);
        float arcMask = pow(max(0.0, sin(angle * 2.0 + floor(phase) * 2.4)), 4.0);
        layer += light * ring * arcMask * extinction * 0.065;

        // Sparse points, with travel-direction trails, suspended between folds.
        vec2 cells = vec2(angle * 18.0, depth * 0.6);
        vec2 cell = floor(cells), local = fract(cells) - 0.5;
        float particle = step(0.982, hash(cell + fi * 31.0));
        vec2 footprint = max(fwidth(cells), vec2(0.012));
        float dust = gaussian(local.x, max(0.018, footprint.x))
          * gaussian(local.y, 0.035 + min(uSpeed, 2.0) * 0.1);
        layer += IVORY * particle * dust * extinction * 1.3;
        float alpha = i == WORMHOLE_LAYERS - 1 ? 1.0 : wall * (0.48 + 0.2 * clouds);
        tunnel = mix(tunnel, layer, alpha);
      }

      // An actual window at the vanishing point, surrounded by atmosphere.
      float exitRadius = 0.026;
      float exitMask = 1.0 - smoothstep(exitRadius - aa, exitRadius + aa, th);
      vec3 exitRay = normalize(forward + (radial.x * right + radial.y * up) * th / exitRadius);
      tunnel = mix(tunnel, farSky(exitRay) * 0.85, exitMask);
      float exitEdge = gaussian(th - exitRadius, max(aa, 0.0013));
      tunnel += IVORY * (exitEdge * 0.32 + exp(-th * 18.0) * (0.045 + uCharge * 0.15));
      // Soft anamorphic scatter belongs to this distant light, not the UI.
      tunnel += IVORY * gaussian(pr.y, 0.0018) * exp(-abs(pr.x) * 15.0) * 0.07;
      col = mix(col, tunnel, uEnter);
    }

    vec2 glow = (ndc - uGlow.xy) * vec2(uRes.x / uRes.y, 1.0);
    col += vec3(0.014, 0.019, 0.034) * exp(-dot(glow, glow) / 0.55) * uGlow.z;
    // The camera sees the AI collapse reflected through the throat before
    // the bots flash on their own. Two pulses: compression, then release.
    col += IVORY * exp(-dot(glow, glow) / 0.028) * uCharge * 0.9;
    col += vec3(0.08, 0.14, 0.3) * exp(-dot(glow, glow) / 0.18) * uCharge * 0.32;
    col *= uFade;
    // Stable sub-LSB dither; no time-dependent full-screen flicker.
    col = max(col + (hash(gl_FragCoord.xy) - 0.5) / 700.0, 0.0);
    float alpha = clamp(max(col.r, max(col.g, col.b)) * 1.5, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
`;
