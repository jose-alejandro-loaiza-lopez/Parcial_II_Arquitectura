import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MoviesTableComponent } from './movies-table.component';

describe('MoviesTableComponent (Microfrontend Películas)', () => {
  let component: MoviesTableComponent;
  let fixture: ComponentFixture<MoviesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('debería renderizar una fila por cada película', () => {
    component.movies = MOVIES_MOCK;
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.movies.length);
  });

  it('debería mostrar los datos de la película en cada columna', () => {
    component.movies = MOVIES_MOCK;
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const movie = component.movies[index];
      expect(columns[0].nativeElement.textContent.trim()).toBe(String(movie.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(movie.title);
      expect(columns[3].nativeElement.textContent.trim()).toBe(
        String(movie.releaseYear),
      );
      expect(columns[4].nativeElement.textContent.trim()).toBe(
        String(movie.rating),
      );
    });
  });

  it('debería mapear cada género a su BadgeType correcto', () => {
    expect(component.genreMap['Accion']).toBe('danger');
    expect(component.genreMap['Comedia']).toBe('warning');
    expect(component.genreMap['Drama']).toBe('primary');
    expect(component.genreMap['Terror']).toBe('secondary');
    expect(component.genreMap['Ciencia Ficcion']).toBe('success');
  });
});
