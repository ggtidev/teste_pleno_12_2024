import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa.model';
import { DateFormatPipe } from '../../../../shared/pipes/date-format.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pessoa-detail',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    DateFormatPipe,
    RouterModule
  ],
  templateUrl: './pessoa-detail.component.html',
  styleUrls: ['./pessoa-detail.component.css']
})
export class PessoaDetailComponent implements OnInit {
  pessoaId!: string;
  pessoa!: Pessoa;

  constructor(private route: ActivatedRoute, private pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.pessoaId = this.route.snapshot.paramMap.get('id') ?? '';
    this.pessoaService.getById(this.pessoaId).subscribe(pessoa => {
      this.pessoa = pessoa.data as Pessoa;
    });
  }
}
