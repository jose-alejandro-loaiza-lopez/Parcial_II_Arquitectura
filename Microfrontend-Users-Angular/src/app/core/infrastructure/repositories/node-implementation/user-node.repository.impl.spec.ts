import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { USERS_MOCK } from '../../../../mocks/users.mocks';
import { UserEngineering } from '../../../domain/models/user.model';
import { DataService } from '../../services/data.service';
import { UserNodeRepositoryImpl } from './user-node.repository.impl';

describe('UserNodeRepositoryImpl (Infrastructure)', () => {
  let repository: UserNodeRepositoryImpl;

  const countUsers = 5;
  const id = 1;
  const engineering: UserEngineering = 'Sistemas';
  const DataServiceMock = {
    getAllUsersNode: jest.fn(),
    getUserByIdNode: jest.fn(),
    getUsersByEngineeringNode: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserNodeRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock },
      ],
    }).compileComponents();
    repository = TestBed.inject(UserNodeRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar getAll a DataService.getAllUsersNode()', (done) => {
    DataServiceMock.getAllUsersNode.mockReturnValue(of(USERS_MOCK));
    repository.getAll(countUsers).subscribe((users) => {
      expect(users).toEqual(USERS_MOCK);
      expect(DataServiceMock.getAllUsersNode).toHaveBeenCalledWith(countUsers);
      done();
    });
  });

  it('debe delegar getById a DataService.getUserByIdNode()', (done) => {
    DataServiceMock.getUserByIdNode.mockReturnValue(of(USERS_MOCK[0]));
    repository.getById(id).subscribe((user) => {
      expect(user).toEqual(USERS_MOCK[0]);
      expect(DataServiceMock.getUserByIdNode).toHaveBeenCalledWith(id);
      done();
    });
  });

  it('debe delegar getByEngineering a DataService.getUsersByEngineeringNode()', (done) => {
    DataServiceMock.getUsersByEngineeringNode.mockReturnValue(of(USERS_MOCK));
    repository.getByEngineering(engineering).subscribe((users) => {
      expect(users).toEqual(USERS_MOCK);
      expect(DataServiceMock.getUsersByEngineeringNode).toHaveBeenCalledWith(
        engineering,
      );
      done();
    });
  });
});
