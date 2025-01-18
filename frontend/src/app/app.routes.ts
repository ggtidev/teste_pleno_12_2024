import { Routes } from '@angular/router';
import { PessoaListComponent } from './features/pessoas/components/pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './features/pessoas/components/pessoa-form/pessoa-form.component';
import { PessoaDetailComponent } from './features/pessoas/components/pessoa-detail/pessoa-detail.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/pessoas', pathMatch: 'full' },
  { path: 'pessoas', component: PessoaListComponent }, // Listagem de pessoas
  { path: 'pessoas/new', component: PessoaFormComponent }, // Criar nova pessoa
  { path: 'pessoas/:id/edit', component: PessoaFormComponent }, // Editar pessoa existente
  { path: 'pessoas/:id', component: PessoaDetailComponent }, // Visualizar detalhes da pessoa
  { path: '**', redirectTo: '/pessoas' }, // Rota para página não encontrada
];

