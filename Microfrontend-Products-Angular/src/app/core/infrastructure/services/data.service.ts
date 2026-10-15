import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Product,
  ProductCategory,
} from '../../domain/models/product.model';

/**
 * Servicio de infraestructura (Data Source) del microfrontend de Productos.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura** y provee los datos desde dos
 * orígenes posibles:
 *
 * - Datos locales simulados con `faker` (implementación **Local**).
 * - Microservicio de productos vía HTTP (implementación **Node**).
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser consumido directamente por los casos de uso; lo usan los
 * repositorios de infraestructura, que adaptan los datos al dominio.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  /** Cliente HTTP de Angular. */
  private httpClient = inject(HttpClient);

  /** URL base del microservicio de productos (Microservice-Products-NodeJS). */
  private readonly nodeUrl = `${environment.baseUrl}/api`;

  /** Categorías disponibles para la generación de datos locales. */
  private readonly categories: ProductCategory[] = [
    'Lacteos',
    'Carnes',
    'Frutas',
    'Verduras',
  ];

  /**
   * Constructor de un producto simulado a partir de un identificador.
   *
   * @param id Identificador del producto.
   * @returns Un producto generado con datos aleatorios.
   * @internal
   */
  private buildProduct(id: number): Product {
    return {
      id,
      name: faker.commerce.productName(),
      category: faker.helpers.arrayElement(this.categories),
      price: Number(faker.commerce.price({ min: 1000, max: 100000, dec: 0 })),
    };
  }

  // ---------------------------------------------------------------------
  // Implementación LOCAL (datos simulados con faker)
  // ---------------------------------------------------------------------

  /**
   * Obtiene un listado de productos desde datos locales simulados.
   *
   * @param countProducts Cantidad de productos a generar.
   * @returns Observable que emite un arreglo de {@link Product}.
   */
  getAllProductsLocal(countProducts: number): Observable<Product[]> {
    const products: Product[] = [];
    for (let i = 1; i <= countProducts; i++) {
      products.push(this.buildProduct(i));
    }
    return of(products);
  }

  /**
   * Obtiene un producto por su id desde datos locales simulados.
   *
   * @param id Identificador único del producto.
   * @returns Observable que emite un {@link Product}.
   */
  getProductByIdLocal(id: number): Observable<Product> {
    return of(this.buildProduct(id));
  }

  /**
   * Obtiene los productos de una categoría desde datos locales simulados.
   *
   * @param category Categoría por la cual filtrar.
   * @returns Observable que emite un arreglo de {@link Product}.
   */
  getProductsByCategoryLocal(category: ProductCategory): Observable<Product[]> {
    const products: Product[] = [];
    for (let i = 1; i <= 5; i++) {
      products.push({ ...this.buildProduct(i), category });
    }
    return of(products);
  }

  // ---------------------------------------------------------------------
  // Implementación NODE (consumo del microservicio vía HTTP)
  // ---------------------------------------------------------------------

  /**
   * Obtiene el listado de productos desde el microservicio Node.
   *
   * @remarks Realiza `GET /api/products/{countProducts}`.
   * @param countProducts Cantidad de productos a solicitar.
   * @returns Observable que emite un arreglo de {@link Product}.
   */
  getAllProductsNode(countProducts: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.nodeUrl}/products/${countProducts}`,
    );
  }

  /**
   * Obtiene un producto por su id desde el microservicio Node.
   *
   * @remarks Realiza `GET /api/products/id/{id}`.
   * @param id Identificador único del producto.
   * @returns Observable que emite un {@link Product}.
   */
  getProductByIdNode(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.nodeUrl}/products/id/${id}`);
  }

  /**
   * Obtiene los productos de una categoría desde el microservicio Node.
   *
   * @remarks Realiza `GET /api/products/category/{category}`.
   * @param category Categoría por la cual filtrar.
   * @returns Observable que emite un arreglo de {@link Product}.
   */
  getProductsByCategoryNode(
    category: ProductCategory,
  ): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.nodeUrl}/products/category/${category}`,
    );
  }
}
