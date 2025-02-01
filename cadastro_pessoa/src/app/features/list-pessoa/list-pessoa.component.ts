import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CadastroPessoaService } from '../../service/cadastro-pessoa.service';
import { CadastroPessoa } from '../../models/cadastro-pessoa';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
// import { BuscaPessoasComponent } from '../busca-pessoas/busca-pessoas.component';

@Component({
  selector: 'app-list-pessoa',
  imports: [CommonModule, RouterModule, FormsModule, NgFor, NgForOf],
  templateUrl: './list-pessoa.component.html',
  styleUrl: './list-pessoa.component.css'
})
export class ListPessoaComponent implements OnInit {

  public listPessoa:CadastroPessoa[] = [];
  public listFiltrada: CadastroPessoa[] = [];

  pesquisarPessoaCadastrada: string = '';
  startIndex: number = 0;
  pageSize: number = 10;

  private searchSubject = new BehaviorSubject<string>('');
  pessoaSelecionada: CadastroPessoa | null = null;

  constructor(private cadastroPessoaService: CadastroPessoaService, private reouter: Router){}

  onSearch(): void {
    this.searchSubject.next(this.pesquisarPessoaCadastrada);
  }

  ngOnInit(): void {
    this.getListPessoas();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((termo) => {
      this.filtrarLista(termo);
    });
  }

  getListPessoas(): void {
    this.cadastroPessoaService.getBuscarTodasPessoasCadastradas().subscribe((dados) => {
      this.listPessoa = dados;
      this.listFiltrada = dados;
    });
  }

  filtrarLista(termo: string): void {
    if (!termo.trim()) {
      this.listFiltrada = [...this.listPessoa];
    } else {
      this.listFiltrada = this.listPessoa.filter(pessoa =>
        pessoa.nome.toLowerCase().includes(termo.toLowerCase()) ||
        pessoa.apelido.toLowerCase().includes(termo.toLowerCase())
      );
    }
    this.startIndex = 0;
  }

  totalPages(): number {
    return Math.ceil(this.listFiltrada.length / this.pageSize);
  }

  nextPage(): void {
    if (this.startIndex + this.pageSize < this.listFiltrada.length) {
      this.startIndex += this.pageSize;
    }
  }
  
  prevPage() {
    if (this.startIndex > 0) {
      this.startIndex -= this.pageSize;
    }
  }

  abrirDetalhes(id: string): void {
    this.cadastroPessoaService.getPessoaPorId(id).subscribe((pessoa) => {
      this.pessoaSelecionada = pessoa;
    });
  }

  fecharModal(): void {
    this.pessoaSelecionada = null;
  }
}
