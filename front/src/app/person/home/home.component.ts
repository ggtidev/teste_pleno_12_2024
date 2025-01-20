import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  persons: Person[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  searchTerm: string = '';
  isCreateMode: boolean = false;
  isEditMode: boolean = false;
  isDeleteMode: boolean = false;
  isDetailsMode: boolean = false;
  selectedPerson: Person | null = null;
  selectedPersonId: string = '';

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  handleSavePerson(event: { person: Person; message: string }): void {
    this.successMessage = event.message;
    this.isCreateMode = false;
    this.loadPersons();

    setTimeout(() => (this.successMessage = null), 2000);
  }

  handleUpdatePerson(event: { person: Person; message: string }): void {
    const index = this.persons.findIndex(p => p.id === event.person.id);
    if (index !== -1) {
      this.persons[index] = event.person;
    }
    this.isEditMode = false;
    this.selectedPerson = null;
    this.successMessage = event.message;

    setTimeout(() => (this.successMessage = null), 2000);
  }

  handleDeletePerson(message: string): void {
    this.persons = this.persons.filter(person => person.id !== this.selectedPersonId);
    this.isDeleteMode = false;
    this.successMessage = message;

    setTimeout(() => (this.successMessage = null), 2000);
  }

  openDetailsModal(id: string): void {
    this.selectedPersonId = id;
    this.isDetailsMode = true;
  }

  openDeleteModal(id: string): void {
    this.selectedPersonId = id;
    this.isDeleteMode = true;
  }

  openEditModal(person: Person): void {
    this.selectedPerson = { ...person };
    this.isEditMode = true;
  }

  openCreateModal(): void {
    this.selectedPerson = null;
    this.isCreateMode = true;
  }

  closeModals(): void {
    this.isCreateMode = false;
    this.isEditMode = false;
    this.isDeleteMode = false;
    this.selectedPerson = null;
    this.errorMessage = null;
    this.successMessage = null;
    this.isDetailsMode = false;
  }

  loadPersons(): void {
    this.personService.getAll().subscribe({
      next: (data: Person[]) => {
        this.persons = data;
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = 'Erro ao buscar os dados.';
      }
    });
  }

  searchPersons(): void {
    if (!this.searchTerm.trim()) {
      this.loadPersons();
    } else {
      this.personService.search(this.searchTerm).subscribe({
        next: (data: Person[]) => {
          this.persons = data;
          this.errorMessage = null;
        },
        error: () => {
          this.errorMessage = 'Erro ao buscar os dados.';
        }
      });
    }
  }
}
