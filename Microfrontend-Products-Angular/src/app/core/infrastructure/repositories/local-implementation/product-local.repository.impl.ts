import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Product,
  ProductCategory,
} from '../../../domain/models/product.model';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación **Local** del repositorio de productos.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura** y actúa como *Adapter*
 * entre el dominio y el {@link DataService}. Usa datos simulados con
 * faker, por lo que no requiere que el microservicio esté en ejecución.
 *
 * @see ProductRepository
 * @see DataService
 */
@Injectable()
export class ProductLocalRepositoryImpl extends ProductRepository {
  /** Data source de infraestructura. */
  private dataService = inject(DataService);

  /** {@inheritDoc ProductRepository.getAll} */
  getAll(countProducts: number): Observable<Product[]> {
    return this.dataService.getAllProductsLocal(countProducts);
  }

  /** {@inheritDoc ProductRepository.getById} */
  getById(id: number): Observable<Product> {
    return this.dataService.getProductByIdLocal(id);
  }

  /** {@inheritDoc ProductRepository.getByCategory} */
  getByCategory(category: ProductCategory): Observable<Product[]> {
    return this.dataService.getProductsByCategoryLocal(category);
  }
}
