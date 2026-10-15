import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { USERS_MOCK } from '../../../../mocks/users.mocks';
import { UserEngineering } from '../../../domain/models/user.model';
import { DataService } from '../../services/data.service';
import { UserLocalRepositoryImpl } from './user-local.repository.impl';

describe('UserLocalRepositoryImpl (Infrastructure)', () => {
  let repository: UserLocalRepositoryImpl;

  const countUsers = 5;
  const id = 1;
  const engineering: UserEngineering = 'Sistemas';
  const DataServiceMock = {
    getAllUsersLocal: jest.fn(),
    getUserByIdLocal: jest.fn(),
    getUsersByEngineeringLocal: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserLocalRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock },
      ],
    }).compileComponents();
    repository = TestBed.inject(UserLocalRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar getAll a DataService.getAllUsersLocal()', (done) => {
    DataServiceMock.getAllUsersLocal.mockReturnValue(of(USERS_MOCK));
    repository.getAll(countUsers).subscribe((users) => {
      expect(users).toEqual(USERS_MOCK);
      expect(DataServiceMock.getAllUsersLocal).toHaveBeenCalledWith(countUsers);
      done();
    });
  });

  it('debe delegar getById a DataService.getUserByIdLocal()', (done) => {
    DataServiceMock.getUserByIdLocal.mockReturnValue(of(USERS_MOCK[0]));
    repository.getById(id).subscribe((user) => {
      expect(user).toEqual(USERS_MOCK[0]);
      expect(DataServiceMock.getUserByIdLocal).toHaveBeenCalledWith(id);
      done();
    });
  });

  it('debe delegar getByEngineering a DataService.getUsersByEngineeringLocal()', (done) => {
    DataServiceMock.getUsersByEngineeringLocal.mockReturnValue(of(USERS_MOCK));
    repository.getByEngineering(engineering).subscribe((users) => {
      expect(users).toEqual(USERS_MOCK);
      expect(DataServiceMock.getUsersByEngineeringLocal).toHaveBeenCalledWith(
        engineering,
      );
      done();
    });
  });
});
