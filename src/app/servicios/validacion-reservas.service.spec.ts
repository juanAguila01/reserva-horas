import { TestBed, inject } from '@angular/core/testing';

import { ValidacionReservasService } from './validacion-reservas.service';

describe('ValidacionReservasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidacionReservasService]
    });
  });

  it('should be created', inject([ValidacionReservasService], (service: ValidacionReservasService) => {
    expect(service).toBeTruthy();
  }));
});
