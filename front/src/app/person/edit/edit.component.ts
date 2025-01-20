import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent {
  errorMessage: string | null = null;
  errors: { [key: string]: string } = {};
  @Input() person: any = { name: '', nickname: '', birth: '' };
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(private personService: PersonService) {}

  validateField(field: string, value: string) {
    if (!value) {
      this.errors[field] = `O campo ${field} é obrigatório.`;
    } else {
      delete this.errors[field];
    }
  }

  updatePerson() {
    this.validateField('nickname', this.person.nickname);
    this.validateField('name', this.person.name);
    this.validateField('birth', this.person.birth);

    if (Object.keys(this.errors).length > 0) {
      this.errorMessage = 'Por favor, corrija os erros no formulário.';
      return;
    }

    this.personService.update(this.person.id, this.person).subscribe({
      next: (updatedPerson) => {
        this.onUpdate.emit({
          person: updatedPerson,
          message: `Pessoa atualizada com sucesso! ID: ${updatedPerson.id}`
        });
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = 'Erro ao atualizar a pessoa.';
      }
    });
  }

  cancel() {
    this.onCancel.emit();
  }
}
