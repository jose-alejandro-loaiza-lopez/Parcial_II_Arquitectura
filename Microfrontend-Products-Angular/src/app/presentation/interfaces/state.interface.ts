/**
 * Representa los posibles estados de un proceso o flujo asincrónico.
 *
 * @remarks
 * Se utiliza para indicar el estado actual de una operación, como una
 * llamada HTTP o la carga de datos, y así decidir qué vista mostrar.
 *
 * @example
 * let state: State = 'loading';
 *
 * @architecture Clean Architecture
 * @layer Presentation
 */
export type State = 'init' | 'loading' | 'success' | 'error';

/**
 * Estados posibles de una alerta.
 *
 * @remarks
 * Define el estado visual o funcional de una alerta, normalmente
 * asociado a procesos en curso o fallidos.
 */
export type AlertState = 'loading' | 'error';
