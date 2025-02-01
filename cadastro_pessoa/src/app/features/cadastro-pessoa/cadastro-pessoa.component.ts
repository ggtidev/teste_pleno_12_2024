import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroPessoaService } from '../../service/cadastro-pessoa.service';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastro-pessoa',
  imports: [ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './cadastro-pessoa.component.html',
  styleUrl: './cadastro-pessoa.component.css'
})
export class CadastroPessoaComponent {

  public cadastroForm!: FormGroup;
  sucesso: boolean = false;
  mensagemErro: string = '';
  idPessoa: string = '';

  constructor(private fb: FormBuilder, private cadastroPessoaService: CadastroPessoaService, private router: Router){
  // Criação do formulário reativo com validações
  this.cadastroForm = this.fb.group({
    apelido: ['', [Validators.required, Validators.maxLength(32)]],
    nome: ['', [Validators.required, Validators.maxLength(100)]],
    nascimento: ['', [Validators.required]]
  });
  }

  onSubmit() {
    // if (this.cadastroForm.invalid) {
    //   return;
    // }
  
    this.cadastroPessoaService.postCadastroPessoa(this.cadastroForm.value).subscribe(
      (response) => {
        this.idPessoa = response.id;
  
        Swal.fire({
          title: 'Cadastro realizado!',
          text: 'Seu cadastro foi concluído com sucesso. Seu Id de cadastro é '+ this.idPessoa,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/']); 
        });
      },
      (error) => {
        const errorMessage = this.formatErrors(error?.error?.errors);

        Swal.fire({
          title: 'Erro no Cadastro!',
          html: errorMessage,
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
      }
    );
  }

  private formatErrors(errors: any): string {
    let errorMessage = '';
  
    if (errors && typeof errors === 'object') {
      Object.keys(errors).forEach((field) => {
        if (Array.isArray(errors[field])) {
          errorMessage += `<strong>${field}:</strong> ${errors[field].join(', ')}<br>`;
        }
      });
    }
  
    return errorMessage || 'Ocorreu um erro inesperado. Tente novamente.';
  }

  // Função para obter mensagens de erro
  //  private getErrorMessage(error: any): string {
  //   if (error.status === 422) {
  //     return 'Erro de validação no backend.';
  //   } else if (error.status === 400) {
  //     return 'Dados inválidos, por favor verifique os campos.';
  //   }
  //   return 'Erro desconhecido, por favor tente novamente mais tarde.';
  // }

}
