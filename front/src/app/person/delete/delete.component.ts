import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent {
  errorMessage: string | null = null;
  @Input() id: string = '';
  @Output() onDelete = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(private personService: PersonService) {}

  deletePerson() {
    this.personService.delete(this.id).subscribe({
      next: () => {
        this.onDelete.emit(`Pessoa excluída com sucesso! ID: ${this.id}`);
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = 'Erro ao excluir a pessoa.';
      }
    });
  }
}
