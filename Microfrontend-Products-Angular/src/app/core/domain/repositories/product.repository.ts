import { Observable } from 'rxjs';
import { Product, ProductCategory } from '../models/product.model';

/**
 * Contrato del repositorio de productos.
 *
 * @description
 * Define el contrato de acceso a datos para la entidad `Product` dentro
 * de la **capa de dominio**, siguiendo los principios de Clean
 * Architecture. Desacopla la lógica de negocio de los detalles de
 * implementación de la infraestructura (API REST, almacenamiento local,
 * mocks, etc.).
 *
 * @remarks
 * La implementación concreta se provee mediante inyección de dependencias
 * desde la capa de infraestructura. Los casos de uso dependen únicamente
 * de esta abstracción.
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see Product
 */
export abstract class ProductRepository {
  /**
   * Obtiene el listado completo de productos.
   *
   * @param countProducts Cantidad de productos a recuperar.
   * @returns Observable que emite un arreglo de productos del dominio.
   */
  abstract getAll(countProducts: number): Observable<Product[]>;

  /**
   * Obtiene un producto por su identificador.
   *
   * @param id Identificador único del producto.
   * @returns Observable que emite el producto encontrado.
   */
  abstract getById(id: number): Observable<Product>;

  /**
   * Obtiene los productos que pertenecen a una categoría específica.
   *
   * @param category Categoría por la cual filtrar.
   * @returns Observable que emite un arreglo de productos filtrados.
   */
  abstract getByCategory(category: ProductCategory): Observable<Product[]>;
}
