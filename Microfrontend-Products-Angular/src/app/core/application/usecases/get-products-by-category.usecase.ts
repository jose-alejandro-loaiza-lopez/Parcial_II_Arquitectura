import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Product,
  ProductCategory,
} from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

/**
 * Caso de uso: obtener los productos por categoría.
 *
 * @description
 * Pertenece a la **capa de aplicación** y encapsula la acción de negocio
 * de recuperar los productos que pertenecen a una categoría concreta.
 * Depende únicamente del contrato {@link ProductRepository}.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Product
 * @see ProductRepository
 */
@Injectable()
export class GetProductsByCategoryUseCase {
  /** Repositorio de productos inyectado por contrato. */
  private productRepository = inject(ProductRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param category Categoría por la cual filtrar.
   * @returns Observable que emite el listado de productos filtrados.
   */
  execute(category: ProductCategory): Observable<Product[]> {
    return this.productRepository.getByCategory(category);
  }
}
