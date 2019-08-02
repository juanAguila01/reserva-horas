import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialSucursalComponent } from './historial-sucursal.component';

describe('HistorialSucursalComponent', () => {
  let component: HistorialSucursalComponent;
  let fixture: ComponentFixture<HistorialSucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
