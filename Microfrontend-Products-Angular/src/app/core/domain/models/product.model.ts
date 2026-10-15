/**
 * Interfaz que representa un producto del sistema.
 *
 * Contiene la información básica necesaria para mostrar un producto
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada producto debe tener un `id` único, un `name` descriptivo, una
 * `category` válida y un `price` en pesos colombianos.
 *
 * @example
 * ```ts
 * const producto: Product = {
 *   id: 1,
 *   name: 'Leche entera',
 *   category: 'Lacteos',
 *   price: 4500
 * };
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export interface Product {
  /** Identificador único del producto */
  id: number;

  /** Nombre o descripción del producto */
  name: string;

  /** Categoría del producto */
  category: ProductCategory;

  /** Precio del producto en pesos */
  price: number;
}

/**
 * Tipo de categoría de producto.
 *
 * @remarks
 * Restringe las categorías a los valores predefinidos. Se utiliza
 * principalmente para mapear *badges* de color en la UI y como
 * criterio del caso de uso de filtrado.
 */
export type ProductCategory = 'Lacteos' | 'Carnes' | 'Frutas' | 'Verduras';
