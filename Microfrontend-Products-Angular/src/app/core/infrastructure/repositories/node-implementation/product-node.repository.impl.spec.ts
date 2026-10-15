import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../../mocks/products.mocks';
import { ProductCategory } from '../../../domain/models/product.model';
import { DataService } from '../../services/data.service';
import { ProductNodeRepositoryImpl } from './product-node.repository.impl';

describe('ProductNodeRepositoryImpl (Infrastructure)', () => {
  let repository: ProductNodeRepositoryImpl;

  const countProducts = 5;
  const id = 1;
  const category: ProductCategory = 'Lacteos';
  const DataServiceMock = {
    getAllProductsNode: jest.fn(),
    getProductByIdNode: jest.fn(),
    getProductsByCategoryNode: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductNodeRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock },
      ],
    }).compileComponents();
    repository = TestBed.inject(ProductNodeRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar getAll a DataService.getAllProductsNode()', (done) => {
    DataServiceMock.getAllProductsNode.mockReturnValue(of(PRODUCTS_MOCK));
    repository.getAll(countProducts).subscribe((products) => {
      expect(products).toEqual(PRODUCTS_MOCK);
      expect(DataServiceMock.getAllProductsNode).toHaveBeenCalledWith(
        countProducts,
      );
      done();
    });
  });

  it('debe delegar getById a DataService.getProductByIdNode()', (done) => {
    DataServiceMock.getProductByIdNode.mockReturnValue(of(PRODUCTS_MOCK[0]));
    repository.getById(id).subscribe((product) => {
      expect(product).toEqual(PRODUCTS_MOCK[0]);
      expect(DataServiceMock.getProductByIdNode).toHaveBeenCalledWith(id);
      done();
    });
  });

  it('debe delegar getByCategory a DataService.getProductsByCategoryNode()', (done) => {
    DataServiceMock.getProductsByCategoryNode.mockReturnValue(of(PRODUCTS_MOCK));
    repository.getByCategory(category).subscribe((products) => {
      expect(products).toEqual(PRODUCTS_MOCK);
      expect(DataServiceMock.getProductsByCategoryNode).toHaveBeenCalledWith(
        category,
      );
      done();
    });
  });
});
