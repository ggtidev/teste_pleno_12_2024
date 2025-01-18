import { Component, Injector } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { BaseResourceFormComponent } from '../../../../shared/components/base-resource-form/base-resource-form.component';

import { Pessoa } from '../../../../shared/models/pessoa.model';
import { PessoaService } from '../../services/pessoa.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { FormFieldErrorComponent } from '../../../../shared/components/form-field-error/form-field-error.component';

@Component({
  selector: 'app-pessoa-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    PageHeaderComponent,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormFieldErrorComponent
  ],
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})

export class PessoaFormComponent extends BaseResourceFormComponent<Pessoa> {

  public pesquisaForm!: FormGroup;

  constructor(
    protected pessoaService: PessoaService,
    protected override injector: Injector,
  ) {
    super(injector, {data: new Pessoa()}, pessoaService, Pessoa.fromJson);
   }

  protected override buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      apelido: ['', [Validators.required, Validators.maxLength(32)]],
      nascimento: ['', [Validators.required]],
    });
  }

  protected override creationPageTitle(): string {
    return 'Cadastro de Nova Pessoa';
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource?.data?.nome || '';
    return 'Editando Pessoa: ' + resourceName;
  }
}
