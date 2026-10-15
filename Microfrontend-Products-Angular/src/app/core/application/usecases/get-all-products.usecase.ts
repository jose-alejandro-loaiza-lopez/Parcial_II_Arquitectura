import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

/**
 * Caso de uso: obtener el listado completo de productos.
 *
 * @description
 * Pertenece a la **capa de aplicación** y encapsula la acción de negocio
 * de recuperar todos los productos del sistema. Desacopla la capa de
 * presentación de los detalles de acceso a datos mediante el contrato
 * {@link ProductRepository}.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Product
 * @see ProductRepository
 */
@Injectable()
export class GetAllProductsUseCase {
  /** Repositorio de productos inyectado por contrato. */
  private productRepository = inject(ProductRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param countProducts Cantidad de productos a recuperar.
   * @returns Observable que emite el listado de productos.
   */
  execute(countProducts: number): Observable<Product[]> {
    return this.productRepository.getAll(countProducts);
  }
}
