import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadastroPessoa } from '../models/cadastro-pessoa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroPessoaService {

  private readonly API = 'http://127.0.0.1:8000/api/pessoas';

  constructor(private http: HttpClient) { }

  public postCadastroPessoa(cadastroPessoa: CadastroPessoa): Observable<CadastroPessoa>{
    return this.http.post<CadastroPessoa>(this.API, cadastroPessoa);
  }

  public getBuscarTodasPessoasCadastradas(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  public getBuscarPessoas(termo: string | null): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}?t=${termo}`);
  }

  public getPessoaPorId(id: string): Observable<CadastroPessoa> {
    return this.http.get<CadastroPessoa>(`${this.API}/${id}`);
  }
}
