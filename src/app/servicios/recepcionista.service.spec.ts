import { TestBed, inject } from '@angular/core/testing';

import { RecepcionistaService } from './recepcionista.service';

describe('RecepcionistaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecepcionistaService]
    });
  });

  it('should be created', inject([RecepcionistaService], (service: RecepcionistaService) => {
    expect(service).toBeTruthy();
  }));
});
