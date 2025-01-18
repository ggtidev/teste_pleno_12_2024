import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { PessoaDetailComponent } from './components/pessoa-detail/pessoa-detail.component';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';

const routes: Routes = [
  { path: '', component: PessoaListComponent },
  { path: 'nova', component: PessoaFormComponent },
  { path: ':id', component: PessoaDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule {}
