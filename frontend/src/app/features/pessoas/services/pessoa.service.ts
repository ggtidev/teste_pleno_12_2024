import { Injectable, Injector } from '@angular/core';
import { Pessoa } from '../../../shared/models/pessoa.model';

import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PessoaService extends BaseResourceService<Pessoa> {

  constructor(override injector: Injector) {
    super('http://localhost:8000/api/pessoas', injector, Pessoa.fromJson);
  }

  countPessoas(): Observable<number> {
    return this.http.get<number>(`http://localhost:8000/api/contagem-pessoas`);
  }

}
