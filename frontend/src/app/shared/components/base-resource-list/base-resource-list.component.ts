import { Directive, OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource-model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];
  loading: boolean = true;
  constructor( private resourceService: BaseResourceService<T> ) { }


  ngOnInit(): void {
    this.filterResources();
  }

  filterResources(pesquisa?: string): void {
    this.resourceService.getAll(pesquisa).subscribe(
      response => {
        this.resources = response.data;
        this.loading = false;
      },
      error => {
        console.log('Erro ao carregar a lista');
        this.loading = false;
      }
    );
  }

  deleteResource(resource: T) {

    const mustDelete = confirm('Deseja realmente excluir esse item?');
    if (mustDelete) {
      this.resourceService.delete(resource.id!).subscribe(
        () => this.resources = this.resources.filter(el => el !== resource),
        () => console.log('Error ao tentar excluir!')
      );
    }
  }

}
