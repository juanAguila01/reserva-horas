import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRecepcionistaComponent } from './editar-recepcionista.component';

describe('EditarRecepcionistaComponent', () => {
  let component: EditarRecepcionistaComponent;
  let fixture: ComponentFixture<EditarRecepcionistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRecepcionistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
