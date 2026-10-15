import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../../mocks/products.mocks';
import { ProductCategory } from '../../../domain/models/product.model';
import { DataService } from '../../services/data.service';
import { ProductLocalRepositoryImpl } from './product-local.repository.impl';

describe('ProductLocalRepositoryImpl (Infrastructure)', () => {
  let repository: ProductLocalRepositoryImpl;

  const countProducts = 5;
  const id = 1;
  const category: ProductCategory = 'Lacteos';
  const DataServiceMock = {
    getAllProductsLocal: jest.fn(),
    getProductByIdLocal: jest.fn(),
    getProductsByCategoryLocal: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductLocalRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock },
      ],
    }).compileComponents();
    repository = TestBed.inject(ProductLocalRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar getAll a DataService.getAllProductsLocal()', (done) => {
    DataServiceMock.getAllProductsLocal.mockReturnValue(of(PRODUCTS_MOCK));
    repository.getAll(countProducts).subscribe((products) => {
      expect(products).toEqual(PRODUCTS_MOCK);
      expect(DataServiceMock.getAllProductsLocal).toHaveBeenCalledWith(
        countProducts,
      );
      done();
    });
  });

  it('debe delegar getById a DataService.getProductByIdLocal()', (done) => {
    DataServiceMock.getProductByIdLocal.mockReturnValue(of(PRODUCTS_MOCK[0]));
    repository.getById(id).subscribe((product) => {
      expect(product).toEqual(PRODUCTS_MOCK[0]);
      expect(DataServiceMock.getProductByIdLocal).toHaveBeenCalledWith(id);
      done();
    });
  });

  it('debe delegar getByCategory a DataService.getProductsByCategoryLocal()', (done) => {
    DataServiceMock.getProductsByCategoryLocal.mockReturnValue(of(PRODUCTS_MOCK));
    repository.getByCategory(category).subscribe((products) => {
      expect(products).toEqual(PRODUCTS_MOCK);
      expect(DataServiceMock.getProductsByCategoryLocal).toHaveBeenCalledWith(
        category,
      );
      done();
    });
  });
});
