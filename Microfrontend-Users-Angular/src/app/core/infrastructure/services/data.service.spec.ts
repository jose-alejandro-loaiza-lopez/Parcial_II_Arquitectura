import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { User, UserEngineering } from '../../domain/models/user.model';
import { DataService } from './data.service';

describe('DataService (Microfrontend Usuarios)', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const countUsers = 3;
  const userId = 1;
  const engineering: UserEngineering = 'Sistemas';
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
    it('debe devolver el listado local de usuarios', (done) => {
      service.getAllUsersLocal(countUsers).subscribe((users: User[]) => {
        expect(users.length).toEqual(countUsers);
        expect(users[0].id).toEqual(1);
        done();
      });
    });

    it('debe devolver un usuario local por id', (done) => {
      service.getUserByIdLocal(userId).subscribe((user: User) => {
        expect(user.id).toEqual(userId);
        done();
      });
    });

    it('debe devolver usuarios locales filtrados por ingeniería', (done) => {
      service
        .getUsersByEngineeringLocal(engineering)
        .subscribe((users: User[]) => {
          expect(users.length).toBeGreaterThan(0);
          users.forEach((user) => expect(user.engineering).toBe(engineering));
          done();
        });
    });
  });

  describe('Implementación Node', () => {
    it('debe obtener usuarios desde Node por HTTP', () => {
      service.getAllUsersNode(countUsers).subscribe((users) => {
        expect(users).toEqual(USERS_MOCK);
      });
      const req = httpMock.expectOne(`${pathUrlNode}/users/${countUsers}`);
      expect(req.request.method).toBe('GET');
      req.flush(USERS_MOCK);
    });

    it('debe obtener un usuario por id desde Node por HTTP', () => {
      service.getUserByIdNode(userId).subscribe((user) => {
        expect(user).toEqual(USERS_MOCK[0]);
      });
      const req = httpMock.expectOne(`${pathUrlNode}/users/id/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(USERS_MOCK[0]);
    });

    it('debe obtener usuarios por ingeniería desde Node por HTTP', () => {
      service.getUsersByEngineeringNode(engineering).subscribe((users) => {
        expect(users).toEqual(USERS_MOCK);
      });
      const req = httpMock.expectOne(
        `${pathUrlNode}/users/engineering/${engineering}`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(USERS_MOCK);
    });
  });
});
