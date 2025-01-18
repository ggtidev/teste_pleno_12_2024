import { OnInit, AfterContentChecked, Inject, Injector, Component, Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseResourceModel } from '../../models/base-resource-model';
import { BaseResourceService } from '../../services/base-resource.service';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction!: string;
  resourceForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessages: string[] = [];
  submittingForm = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  private toastr: ToastrService;

  constructor(
    protected injector: Injector,
    public resource: {data: T},
    protected resourceService: BaseResourceService<T>,
    public jsonDataToResourceFn: (jsonData: any) => T,
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
    this.toastr = this.injector.get(ToastrService);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  protected setCurrentAction() {
    if (this.route.snapshot.url[this.route.snapshot.url.length - 1].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }


  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle() {
    return 'Novo';
  }

  protected editionPageTitle() {
    return 'Edição';
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource)
    .subscribe(
      resource =>{
        this.actionsForSuccess(resource.data);
      },
      error => this.actionsForError(error)
    );
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    console.log(resource);
    this.resourceService.update(resource)
    .subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected actionsForSuccess(resource: T) {
    this.toastr.success(
      `Solicitação processada com sucesso! ID: ${resource.id}`,
      'Operação Concluída',
      {
        timeOut: 5000, // duração de 5 segundos
        positionClass: 'toast-top-right', // posição personalizada
        toastClass: 'toast-success',
        closeButton: true, // botão de fechar
        progressBar: true, // barra de progresso
        tapToDismiss: false, // não fecha ao clicar
      }
    );


    // toastr.success('Solicitação processada com sucesso! ', resource.id);
    const baseComponentPath: string = this.route.snapshot.parent?.url[this.route.snapshot.parent?.url.length - 1]?.path ?? '';

    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
    );
  }

  protected actionsForError(error: any) {
    this.toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    if (error && error.error && error.error.errors) {

      // Percorrendo todos os campos com erros
      Object.keys(error.error.errors).forEach((fieldName: string) => {
        const field = this.resourceForm.get(fieldName);

        if (field) {
          // Obtenha as mensagens de erro para o campo
          const errorMessages = error.error.errors[fieldName];

          // Adiciona o erro ao campo específico
          field.setErrors({
            ...field.errors, // Preserva os erros existentes, se houver
            serverError: errorMessages.join(', ') // Junta as mensagens de erro em uma string
          });

          // Marca como tocado para garantir que o erro será exibido
          field.markAsTouched();
        }
      });
    } else {
      // Pode adicionar um log para verificar se o erro não contém a estrutura esperada
      console.log('Erro não contém o formato esperado:', error);
    }

    this.submittingForm = false;


    // if (error.status === 422) {
    //   this.serverErrorMessages = JSON.parse(error._body).errors;
    // } else {
    //   this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
    // }

    // this.resourceForm.reset();
  }

  protected abstract buildResourceForm(): void;
}
