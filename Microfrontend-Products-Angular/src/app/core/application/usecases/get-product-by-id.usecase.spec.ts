import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetProductByIdUseCase } from './get-product-by-id.usecase';

describe('GetProductByIdUseCase', () => {
  let useCase: GetProductByIdUseCase;

  const productId = 1;
  const ProductRepositoryMock: jest.Mocked<ProductRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByCategory: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetProductByIdUseCase,
        { provide: ProductRepository, useValue: ProductRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetProductByIdUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetProductByIdUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    ProductRepositoryMock.getById.mockReturnValue(of(PRODUCTS_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(productId));
    expect(ProductRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(ProductRepositoryMock.getById).toHaveBeenCalledWith(productId);
    expect(result).toEqual(PRODUCTS_MOCK[0]);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Producto no encontrado';
    ProductRepositoryMock.getById.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(firstValueFrom(useCase.execute(productId))).rejects.toThrow(
      errorMessage,
    );
    expect(ProductRepositoryMock.getById).toHaveBeenCalledWith(productId);
  });
});
