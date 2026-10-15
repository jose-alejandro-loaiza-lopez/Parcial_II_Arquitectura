import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { ProductCategory } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetProductsByCategoryUseCase } from './get-products-by-category.usecase';

describe('GetProductsByCategoryUseCase', () => {
  let useCase: GetProductsByCategoryUseCase;

  const category: ProductCategory = 'Lacteos';
  const ProductRepositoryMock: jest.Mocked<ProductRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByCategory: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetProductsByCategoryUseCase,
        { provide: ProductRepository, useValue: ProductRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetProductsByCategoryUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetProductsByCategoryUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    ProductRepositoryMock.getByCategory.mockReturnValue(of(PRODUCTS_MOCK));
    const result = await firstValueFrom(useCase.execute(category));
    expect(ProductRepositoryMock.getByCategory).toHaveBeenCalledTimes(1);
    expect(ProductRepositoryMock.getByCategory).toHaveBeenCalledWith(category);
    expect(result).toEqual(PRODUCTS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo el filtrado de productos';
    ProductRepositoryMock.getByCategory.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(firstValueFrom(useCase.execute(category))).rejects.toThrow(
      errorMessage,
    );
    expect(ProductRepositoryMock.getByCategory).toHaveBeenCalledWith(category);
  });
});
