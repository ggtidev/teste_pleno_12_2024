import { TestBed } from '@angular/core/testing';

import { CadastroPessoaService } from './cadastro-pessoa.service';

describe('CadastroPessoaService', () => {
  let service: CadastroPessoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroPessoaService);
  });
});
