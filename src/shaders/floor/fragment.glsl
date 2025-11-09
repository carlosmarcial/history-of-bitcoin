varying vec2 vUv;
uniform vec3 uColor;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 42758.5453123);
}

void main()
    {
        gl_FragColor = vec4(uColor, 1.0);
    }

