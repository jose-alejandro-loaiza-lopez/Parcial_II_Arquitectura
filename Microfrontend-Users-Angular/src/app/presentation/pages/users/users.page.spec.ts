import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllUsersUseCase } from '../../../core/application/usecases/get-all-users.usecase';
import { GetUserByIdUseCase } from '../../../core/application/usecases/get-user-by-id.usecase';
import { GetUsersByEngineeringUseCase } from '../../../core/application/usecases/get-users-by-engineering.usecase';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { UsersTableComponent } from '../../components/users-table/users-table.component';
import { UsersPage } from './users.page';

describe('UsersPage (Microfrontend Usuarios)', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;

  const GetAllUsersUseCaseMock = { execute: jest.fn() };
  const GetUserByIdUseCaseMock = { execute: jest.fn() };
  const GetUsersByEngineeringUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPage, UsersTableComponent],
    })
      .overrideComponent(UsersPage, {
        set: {
          providers: [
            { provide: GetAllUsersUseCase, useValue: GetAllUsersUseCaseMock },
            { provide: GetUserByIdUseCase, useValue: GetUserByIdUseCaseMock },
            {
              provide: GetUsersByEngineeringUseCase,
              useValue: GetUsersByEngineeringUseCaseMock,
            },
          ],
        },
      })
      .compileComponents();

    GetAllUsersUseCaseMock.execute.mockReturnValue(of(USERS_MOCK));

    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.users).toEqual([]);
  });

  it('debe listar los usuarios al inicializar (getAll)', () => {
    fixture.detectChanges();
    expect(GetAllUsersUseCaseMock.execute).toHaveBeenCalledWith(10);
    expect(component.users).toEqual(USERS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debe buscar un usuario por id (getById)', () => {
    fixture.detectChanges();
    GetUserByIdUseCaseMock.execute.mockReturnValue(of(USERS_MOCK[0]));
    component.userId = 1;
    component.loadById();
    expect(GetUserByIdUseCaseMock.execute).toHaveBeenCalledWith(1);
    expect(component.users).toEqual([USERS_MOCK[0]]);
    expect(component.state).toBe('success');
  });

  it('debe filtrar usuarios por ingeniería (getByEngineering)', () => {
    fixture.detectChanges();
    GetUsersByEngineeringUseCaseMock.execute.mockReturnValue(of(USERS_MOCK));
    component.engineering = 'Sistemas';
    component.loadByEngineering();
    expect(GetUsersByEngineeringUseCaseMock.execute).toHaveBeenCalledWith(
      'Sistemas',
    );
    expect(component.users).toEqual(USERS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debe cambiar el estado a error si falla el listado', () => {
    GetAllUsersUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error')),
    );
    fixture.detectChanges();
    expect(component.users).toEqual([]);
    expect(component.state).toBe('error');
  });

  it('debe cambiar el estado a error si falla la búsqueda por id', () => {
    fixture.detectChanges();
    GetUserByIdUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error')),
    );
    component.loadById();
    expect(component.state).toBe('error');
  });

  it('debe cambiar el estado a error si falla el filtrado', () => {
    fixture.detectChanges();
    GetUsersByEngineeringUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error')),
    );
    component.loadByEngineering();
    expect(component.state).toBe('error');
  });
});
