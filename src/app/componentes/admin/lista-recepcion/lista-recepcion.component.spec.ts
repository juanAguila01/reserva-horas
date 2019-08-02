import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecepcionComponent } from './lista-recepcion.component';

describe('ListaRecepcionComponent', () => {
  let component: ListaRecepcionComponent;
  let fixture: ComponentFixture<ListaRecepcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRecepcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
