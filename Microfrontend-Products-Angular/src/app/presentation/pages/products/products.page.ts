import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetAllProductsUseCase } from '../../../core/application/usecases/get-all-products.usecase';
import { GetProductByIdUseCase } from '../../../core/application/usecases/get-product-by-id.usecase';
import { GetProductsByCategoryUseCase } from '../../../core/application/usecases/get-products-by-category.usecase';
import {
  Product,
  ProductCategory,
} from '../../../core/domain/models/product.model';
import { ProductRepository } from '../../../core/domain/repositories/product.repository';
import { ProductLocalRepositoryImpl } from '../../../core/infrastructure/repositories/local-implementation/product-local.repository.impl';
import { ProductNodeRepositoryImpl } from '../../../core/infrastructure/repositories/node-implementation/product-node.repository.impl';
import { AlertComponent } from '../../components/alert/alert.component';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Página contenedora del microfrontend de Productos.
 *
 * @description
 * Componente de la **capa de presentación** que consume los tres casos
 * de uso del microfrontend y renderiza la información a través de
 * {@link ProductsTableComponent}:
 *
 * 1. {@link GetAllProductsUseCase} — listar todos los productos.
 * 2. {@link GetProductByIdUseCase} — buscar un producto por id.
 * 3. {@link GetProductsByCategoryUseCase} — filtrar por categoría.
 *
 * Los *providers* del repositorio se registran aquí (a nivel de
 * componente) para que la inyección de dependencias funcione tanto en
 * ejecución standalone como cuando el host carga esta página vía Module
 * Federation. Para alternar entre datos locales y el microservicio Node
 * basta con comentar/descomentar el provider correspondiente.
 *
 * @architecture Clean Architecture
 * @layer Presentation
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  imports: [ProductsTableComponent, AlertComponent, FormsModule],
  providers: [
    GetAllProductsUseCase,
    GetProductByIdUseCase,
    GetProductsByCategoryUseCase,

    // Implementación MICROSERVICIO (consume Microservice-Products-SpringBoot en :3002)
    { provide: ProductRepository, useClass: ProductNodeRepositoryImpl },

    // Implementación LOCAL (datos simulados con faker, sin microservicio)
    // { provide: ProductRepository, useClass: ProductLocalRepositoryImpl },
  ],
})
export class ProductsPage implements OnInit {
  /** Listado de productos mostrado en la tabla. */
  products: Product[] = [];

  /** Estado actual del componente. */
  state: State = 'init';

  /** Identificador consultado en la búsqueda por id. */
  productId = 1;

  /** Categoría seleccionada para el filtrado. */
  category: ProductCategory = 'Lacteos';

  /** Categorías disponibles para el filtro. */
  readonly categories: ProductCategory[] = [
    'Lacteos',
    'Carnes',
    'Frutas',
    'Verduras',
  ];

  private getAllProducts = inject(GetAllProductsUseCase);
  private getProductById = inject(GetProductByIdUseCase);
  private getProductsByCategory = inject(GetProductsByCategoryUseCase);

  /** Carga inicial: lista los productos. */
  ngOnInit(): void {
    this.loadAll();
  }

  /** Caso de uso 1: listar todos los productos. */
  loadAll(): void {
    this.state = 'loading';
    this.getAllProducts.execute(10).subscribe({
      next: (products) => {
        this.products = products;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }

  /** Caso de uso 2: buscar un producto por id. */
  loadById(): void {
    this.state = 'loading';
    this.getProductById.execute(Number(this.productId)).subscribe({
      next: (product) => {
        this.products = [product];
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }

  /** Caso de uso 3: filtrar productos por categoría. */
  loadByCategory(): void {
    this.state = 'loading';
    this.getProductsByCategory.execute(this.category).subscribe({
      next: (products) => {
        this.products = products;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}
