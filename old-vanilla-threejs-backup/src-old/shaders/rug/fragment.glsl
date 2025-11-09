varying vec2 vUv;
uniform vec3 uColor;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)) + random(vUv);
    

    // vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(uvColor, uColor, strength);

    gl_FragColor = vec4(mixedColor, 0.5);
}