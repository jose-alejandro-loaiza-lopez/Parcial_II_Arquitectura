import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent (Microfrontend Películas)', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.alertState = 'loading';
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el texto vacío por defecto', () => {
    expect(component.text).toBe('');
  });

  it('debería aplicar la clase correcta cuando el estado es "loading"', () => {
    component.alertState = 'loading';
    expect(component.getClass()).toContain('alert-primary');
  });

  it('debería aplicar la clase correcta cuando el estado es "error"', () => {
    component.alertState = 'error';
    expect(component.getClass()).toContain('alert-danger');
  });

  it('debería mapear correctamente los estados en alertClassMap', () => {
    expect(component.alertClassMap['loading']).toBe('primary');
    expect(component.alertClassMap['error']).toBe('danger');
  });

  it('debería renderizar el texto recibido por input', () => {
    component.alertState = 'loading';
    component.text = 'Cargando datos...';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Cargando datos...');
  });
});
