import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetAllUsersUseCase } from '../../../core/application/usecases/get-all-users.usecase';
import { GetUserByIdUseCase } from '../../../core/application/usecases/get-user-by-id.usecase';
import { GetUsersByEngineeringUseCase } from '../../../core/application/usecases/get-users-by-engineering.usecase';
import {
  User,
  UserEngineering,
} from '../../../core/domain/models/user.model';
import { UserRepository } from '../../../core/domain/repositories/user.repository';
import { UserLocalRepositoryImpl } from '../../../core/infrastructure/repositories/local-implementation/user-local.repository.impl';
import { UserNodeRepositoryImpl } from '../../../core/infrastructure/repositories/node-implementation/user-node.repository.impl';
import { AlertComponent } from '../../components/alert/alert.component';
import { UsersTableComponent } from '../../components/users-table/users-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Página contenedora del microfrontend de Usuarios.
 *
 * @description
 * Componente de la **capa de presentación** que consume los tres casos
 * de uso del microfrontend y renderiza la información a través de
 * {@link UsersTableComponent}:
 *
 * 1. {@link GetAllUsersUseCase} — listar todos los usuarios.
 * 2. {@link GetUserByIdUseCase} — buscar un usuario por id.
 * 3. {@link GetUsersByEngineeringUseCase} — filtrar por ingeniería.
 *
 * Los *providers* del repositorio se registran aquí (a nivel de
 * componente) para que la inyección de dependencias funcione tanto en
 * ejecución standalone como cuando el host carga esta página vía Module
 * Federation. Para alternar entre datos locales y el microservicio Node
 * basta con comentar/descomentar el provider correspondiente.
 *
 * @architecture Clean Architecture
 * @layer Presentation
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  imports: [UsersTableComponent, AlertComponent, FormsModule],
  providers: [
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    GetUsersByEngineeringUseCase,

    // Implementación MICROSERVICIO (consume Microservice-Users-NodeJS en :3001)
    { provide: UserRepository, useClass: UserNodeRepositoryImpl },

    // Implementación LOCAL (datos simulados con faker, sin microservicio)
    // { provide: UserRepository, useClass: UserLocalRepositoryImpl },
  ],
})
export class UsersPage implements OnInit {
  /** Listado de usuarios mostrado en la tabla. */
  users: User[] = [];

  /** Estado actual del componente. */
  state: State = 'init';

  /** Identificador consultado en la búsqueda por id. */
  userId = 1;

  /** Ingeniería seleccionada para el filtrado. */
  engineering: UserEngineering = 'Sistemas';

  /** Ingenierías disponibles para el filtro. */
  readonly engineerings: UserEngineering[] = [
    'Sistemas',
    'Electronica',
    'Biomedica',
    'Industrial',
    'Ambiental',
  ];

  private getAllUsers = inject(GetAllUsersUseCase);
  private getUserById = inject(GetUserByIdUseCase);
  private getUsersByEngineering = inject(GetUsersByEngineeringUseCase);

  /** Carga inicial: lista los usuarios. */
  ngOnInit(): void {
    this.loadAll();
  }

  /** Caso de uso 1: listar todos los usuarios. */
  loadAll(): void {
    this.state = 'loading';
    this.getAllUsers.execute(10).subscribe({
      next: (users) => {
        this.users = users;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }

  /** Caso de uso 2: buscar un usuario por id. */
  loadById(): void {
    this.state = 'loading';
    this.getUserById.execute(Number(this.userId)).subscribe({
      next: (user) => {
        this.users = [user];
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }

  /** Caso de uso 3: filtrar usuarios por ingeniería. */
  loadByEngineering(): void {
    this.state = 'loading';
    this.getUsersByEngineering.execute(this.engineering).subscribe({
      next: (users) => {
        this.users = users;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}
