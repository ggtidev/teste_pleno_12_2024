import {Component, EventEmitter, Output} from '@angular/core';
import { PersonService } from '../../services/person.service';

type FormFields = 'nickname' | 'name' | 'birth';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent {
  person = { name: '', nickname: '', birth: '' };
  errors = { name: '', nickname: '', birth: '' };
  @Output() onCreate = new EventEmitter<{person: any, message: string}>();

  constructor(private personService: PersonService) {}

  validateField(fieldName: FormFields, value: string) {
    const fieldLabels = {
      name: 'nome',
      nickname: 'apelido',
      birth: 'data de nascimento'
    };

    if (!value.trim()) {
      this.errors[fieldName] = `O campo ${fieldLabels[fieldName]} é obrigatório`;
      return false;
    }

    this.errors[fieldName] = '';
    return true;
  }

  onSubmit() {
    const isNameValid = this.validateField('name', this.person.name);
    const isNicknameValid = this.validateField('nickname', this.person.nickname);
    const isBirthValid = this.validateField('birth', this.person.birth);

    if (!isNameValid || !isNicknameValid || !isBirthValid) {
      return;
    }

    this.personService.create(this.person).subscribe({
      next: (response) => {
        this.onCreate.emit({
          person: response,
          message: `Pessoa criada com sucesso! ID: ${response.id}`
        });
        this.person = { name: '', nickname: '', birth: '' };
        this.errors = { name: '', nickname: '', birth: '' };
      },
      error: (error) => {
        const serverErrors = error.error.errors || {};

        this.errors = { name: '', nickname: '', birth: '' };

        (Object.keys(serverErrors) as FormFields[]).forEach(field => {
          if (field in this.errors) {
            this.errors[field] = serverErrors[field];
          }
        });
      }
    });
  }
}
