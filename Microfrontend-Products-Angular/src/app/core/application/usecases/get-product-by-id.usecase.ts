import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

/**
 * Caso de uso: obtener un producto por su identificador.
 *
 * @description
 * Pertenece a la **capa de aplicación** y encapsula la acción de negocio
 * de recuperar un único producto. Depende únicamente del contrato
 * {@link ProductRepository}.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Product
 * @see ProductRepository
 */
@Injectable()
export class GetProductByIdUseCase {
  /** Repositorio de productos inyectado por contrato. */
  private productRepository = inject(ProductRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param id Identificador único del producto.
   * @returns Observable que emite el producto encontrado.
   */
  execute(id: number): Observable<Product> {
    return this.productRepository.getById(id);
  }
}
