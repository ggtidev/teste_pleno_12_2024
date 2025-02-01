import { Routes } from '@angular/router';
import { ListPessoaComponent } from './features/list-pessoa/list-pessoa.component';
import { CadastroPessoaComponent } from './features/cadastro-pessoa/cadastro-pessoa.component';

export const routes: Routes = [
    {
        path: '',
        component: ListPessoaComponent,
    },
    {
        path: 'cadastroPessoa',
        component: CadastroPessoaComponent 
    },
    // {
    //     path: 'pessoa/:id',
    //     component: pessoaComponent,
    // }
];
