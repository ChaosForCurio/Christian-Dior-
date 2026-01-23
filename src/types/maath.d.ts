declare module 'maath/random/dist/maath-random.esm' {
    export function inSphere(buffer: Float32Array, options?: { radius?: number }): Float32Array;
    export function inBox(buffer: Float32Array, options?: { sides?: [number, number, number] }): Float32Array;
    export function inCircle(buffer: Float32Array, options?: { radius?: number }): Float32Array;
    export function inRect(buffer: Float32Array, options?: { sides?: [number, number] }): Float32Array;
    export function onSphere(buffer: Float32Array, options?: { radius?: number }): Float32Array;
    export function onBox(buffer: Float32Array, options?: { sides?: [number, number, number] }): Float32Array;
    export function onCircle(buffer: Float32Array, options?: { radius?: number }): Float32Array;
    export function onRect(buffer: Float32Array, options?: { sides?: [number, number] }): Float32Array;
}
