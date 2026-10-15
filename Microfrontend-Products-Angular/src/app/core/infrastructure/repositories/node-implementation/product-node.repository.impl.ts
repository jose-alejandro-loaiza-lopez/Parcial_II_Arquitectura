import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Product,
  ProductCategory,
} from '../../../domain/models/product.model';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación **Node** del repositorio de productos.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura** y actúa como *Adapter*
 * entre el dominio y el microservicio de productos
 * (Microservice-Products-NodeJS, `http://localhost:3002`). Consume los
 * endpoints del microservicio a través del {@link DataService}.
 *
 * @see ProductRepository
 * @see DataService
 */
@Injectable()
export class ProductNodeRepositoryImpl extends ProductRepository {
  /** Data source de infraestructura. */
  private dataService = inject(DataService);

  /** {@inheritDoc ProductRepository.getAll} */
  getAll(countProducts: number): Observable<Product[]> {
    return this.dataService.getAllProductsNode(countProducts);
  }

  /** {@inheritDoc ProductRepository.getById} */
  getById(id: number): Observable<Product> {
    return this.dataService.getProductByIdNode(id);
  }

  /** {@inheritDoc ProductRepository.getByCategory} */
  getByCategory(category: ProductCategory): Observable<Product[]> {
    return this.dataService.getProductsByCategoryNode(category);
  }
}
