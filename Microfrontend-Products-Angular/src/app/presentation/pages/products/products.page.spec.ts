import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllProductsUseCase } from '../../../core/application/usecases/get-all-products.usecase';
import { GetProductByIdUseCase } from '../../../core/application/usecases/get-product-by-id.usecase';
import { GetProductsByCategoryUseCase } from '../../../core/application/usecases/get-products-by-category.usecase';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';
import { ProductsPage } from './products.page';

describe('ProductsPage (Microfrontend Productos)', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;

  const GetAllProductsUseCaseMock = { execute: jest.fn() };
  const GetProductByIdUseCaseMock = { execute: jest.fn() };
  const GetProductsByCategoryUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPage, ProductsTableComponent],
    })
      .overrideComponent(ProductsPage, {
        set: {
          providers: [
            { provide: GetAllProductsUseCase, useValue: GetAllProductsUseCaseMock },
            { provide: GetProductByIdUseCase, useValue: GetProductByIdUseCaseMock },
            {
              provide: GetProductsByCategoryUseCase,
              useValue: GetProductsByCategoryUseCaseMock,
            },
          ],
        },
      })
      .compileComponents();

    GetAllProductsUseCaseMock.execute.mockReturnValue(of(PRODUCTS_MOCK));

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.products).toEqual([]);
  });

  it('debe listar los productos al inicializar (getAll)', () => {
    fixture.detectChanges();
    expect(GetAllProductsUseCaseMock.execute).toHaveBeenCalledWith(10);
    expect(component.products).toEqual(PRODUCTS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debe buscar un producto por id (getById)', () => {
    fixture.detectChanges();
    GetProductByIdUseCaseMock.execute.mockReturnValue(of(PRODUCTS_MOCK[0]));
    component.productId = 1;
    component.loadById();
    expect(GetProductByIdUseCaseMock.execute).toHaveBeenCalledWith(1);
    expect(component.products).toEqual([PRODUCTS_MOCK[0]]);
    expect(component.state).toBe('success');
  });

  it('debe filtrar productos por categoría (getByCategory)', () => {
    fixture.detectChanges();
    GetProductsByCategoryUseCaseMock.execute.mockReturnValue(of(PRODUCTS_MOCK));
    component.category = 'Lacteos';
    component.loadByCategory();
    expect(GetProductsByCategoryUseCaseMock.execute).toHaveBeenCalledWith(
      'Lacteos',
    );
    expect(component.products).toEqual(PRODUCTS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debe cambiar el estado a error si falla el listado', () => {
    GetAllProductsUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error')),
    );
    fixture.detectChanges();
    expect(component.products).toEqual([]);
    expect(component.state).toBe('error');
  });

  it('debe cambiar el estado a error si falla la búsqueda por id', () => {
    fixture.detectChanges();
    GetProductByIdUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error')),
    );
    component.loadById();
    expect(component.state).toBe('error');
  });

  it('debe cambiar el estado a error si falla el filtrado', () => {
    fixture.detectChanges();
    GetProductsByCategoryUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error')),
    );
    component.loadByCategory();
    expect(component.state).toBe('error');
  });
});
