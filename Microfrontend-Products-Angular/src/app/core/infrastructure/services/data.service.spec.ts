import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { Product, ProductCategory } from '../../domain/models/product.model';
import { DataService } from './data.service';

describe('DataService (Microfrontend Productos)', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const countProducts = 3;
  const productId = 1;
  const category: ProductCategory = 'Lacteos';
  const pathUrlNode = `${environment.baseUrl}/api`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('Implementación Local', () => {
    it('debe devolver el listado local de productos', (done) => {
      service.getAllProductsLocal(countProducts).subscribe((products: Product[]) => {
        expect(products.length).toEqual(countProducts);
        expect(products[0].id).toEqual(1);
        done();
      });
    });

    it('debe devolver un producto local por id', (done) => {
      service.getProductByIdLocal(productId).subscribe((product: Product) => {
        expect(product.id).toEqual(productId);
        done();
      });
    });

    it('debe devolver productos locales filtrados por categoría', (done) => {
      service
        .getProductsByCategoryLocal(category)
        .subscribe((products: Product[]) => {
          expect(products.length).toBeGreaterThan(0);
          products.forEach((product) => expect(product.category).toBe(category));
          done();
        });
    });
  });

  describe('Implementación Node', () => {
    it('debe obtener productos desde Node por HTTP', () => {
      service.getAllProductsNode(countProducts).subscribe((products) => {
        expect(products).toEqual(PRODUCTS_MOCK);
      });
      const req = httpMock.expectOne(`${pathUrlNode}/products/${countProducts}`);
      expect(req.request.method).toBe('GET');
      req.flush(PRODUCTS_MOCK);
    });

    it('debe obtener un producto por id desde Node por HTTP', () => {
      service.getProductByIdNode(productId).subscribe((product) => {
        expect(product).toEqual(PRODUCTS_MOCK[0]);
      });
      const req = httpMock.expectOne(`${pathUrlNode}/products/id/${productId}`);
      expect(req.request.method).toBe('GET');
      req.flush(PRODUCTS_MOCK[0]);
    });

    it('debe obtener productos por categoría desde Node por HTTP', () => {
      service.getProductsByCategoryNode(category).subscribe((products) => {
        expect(products).toEqual(PRODUCTS_MOCK);
      });
      const req = httpMock.expectOne(
        `${pathUrlNode}/products/category/${category}`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(PRODUCTS_MOCK);
    });
  });
});
