import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { Pessoa } from '../../models/pessoa.model';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DateFormatPipe } from '../../../../shared/pipes/date-format.pipe';
import { PessoaService } from '../../services/pessoa.service';
import { BaseResourceListComponent } from '../../../../shared/components/base-resource-list/base-resource-list.component';
import { filter, Observable } from 'rxjs';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pessoa-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DateFormatPipe,
    PageHeaderComponent,
    BreadcrumbComponent,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule
  ],
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent extends BaseResourceListComponent<Pessoa> implements OnInit {
  formBuilder!: FormBuilder;
  pesquisa: string = '';
  pesquisaForm!: FormGroup;
  totalRegistros: number = 0;
  filtroAberto = false; // Controle do estado do painel

  exibirModal: boolean = true;
  pessoaModal: Pessoa = {
    id: '',
    nome: '',
    apelido: '',
    nascimento: ''
  };

  constructor(private pessoaService: PessoaService, private router: Router) {
    super(pessoaService as BaseResourceService<Pessoa>);
    this.countPessoas();
   }

   countPessoas(): void {
    this.pessoaService.countPessoas().subscribe(
      total => this.totalRegistros = total
    );
   }


  onPessoaClick(pessoa: Pessoa): void {
    this.router.navigate(['/pessoas', pessoa.id]);
  }

     // Método para alternar a visibilidade do painel
    toggleFiltro() {
      this.filtroAberto = !this.filtroAberto;
    }

}
