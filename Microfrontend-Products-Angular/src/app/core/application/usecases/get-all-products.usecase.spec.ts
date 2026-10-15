import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetAllProductsUseCase } from './get-all-products.usecase';

describe('GetAllProductsUseCase', () => {
  let useCase: GetAllProductsUseCase;

  const countProducts = 5;
  const ProductRepositoryMock: jest.Mocked<ProductRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByCategory: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetAllProductsUseCase,
        { provide: ProductRepository, useValue: ProductRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetAllProductsUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllProductsUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    ProductRepositoryMock.getAll.mockReturnValue(of(PRODUCTS_MOCK));
    const result = await firstValueFrom(useCase.execute(countProducts));
    expect(ProductRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(ProductRepositoryMock.getAll).toHaveBeenCalledWith(countProducts);
    expect(result).toEqual(PRODUCTS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la búsqueda de productos';
    ProductRepositoryMock.getAll.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(firstValueFrom(useCase.execute(countProducts))).rejects.toThrow(
      errorMessage,
    );
    expect(ProductRepositoryMock.getAll).toHaveBeenCalledWith(countProducts);
  });
});
