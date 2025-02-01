import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PessoaRoutingModule } from './pessoa-routing.module';

import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';
import { PessoaDetailComponent } from './components/pessoa-detail/pessoa-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PessoaRoutingModule,
    PessoaListComponent,
    PessoaFormComponent,
    PessoaDetailComponent
  ],
  exports: [
    PessoaListComponent,
    PessoaFormComponent,
    PessoaDetailComponent
  ]
})

export class PessoaModule {}
