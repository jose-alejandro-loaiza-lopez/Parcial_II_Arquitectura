import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import {
  Product,
  ProductCategory,
} from '../../../core/domain/models/product.model';

/**
 * Componente de tabla de productos.
 *
 * @description
 * Muestra un listado de productos en una tabla, incluyendo un *badge*
 * cuyo color depende de la categoría del producto y el precio formateado
 * como moneda. Recibe los datos del componente padre a través del `Input`
 * `products`.
 *
 * @example
 * ```html
 * <app-products-table [products]="productsList"></app-products-table>
 * ```
 *
 * @architecture Clean Architecture
 * @layer Presentation
 */
@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  imports: [CommonModule, BadgeAtom],
})
export class ProductsTableComponent {
  /** Listado de productos que se mostrarán en la tabla. */
  @Input() products: Product[] = [];

  /**
   * Mapeo de categorías a tipos de *badge*.
   *
   * @remarks
   * - 'Carnes' → 'danger'
   * - 'Frutas' → 'warning'
   * - 'Lacteos' → 'primary'
   * - 'Verduras' → 'success'
   */
  categoryMap: Record<ProductCategory, BadgeType> = {
    Carnes: 'danger',
    Frutas: 'warning',
    Lacteos: 'primary',
    Verduras: 'success',
  };
}
