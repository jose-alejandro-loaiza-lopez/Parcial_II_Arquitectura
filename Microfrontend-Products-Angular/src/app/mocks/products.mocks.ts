import { Product } from '../core/domain/models/product.model';

/**
 * Datos simulados de productos utilizados en las pruebas unitarias.
 *
 * @remarks
 * Este arreglo permite verificar el comportamiento de los casos de uso,
 * repositorios y componentes sin necesidad de realizar peticiones HTTP
 * reales ni de depender de la generación aleatoria de faker.
 */
export const PRODUCTS_MOCK: Product[] = [
  {
    id: 1,
    name: 'Leche entera',
    category: 'Lacteos',
    price: 4500,
  },
  {
    id: 2,
    name: 'Manzana roja',
    category: 'Frutas',
    price: 3200,
  },
];
