import { Component, Input, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent implements OnInit {
  @Input() personId!: string;
  person: any;
  errorMessage: string | null = null;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.getPersonDetails();
  }

  getPersonDetails(): void {
    this.personService.getById(this.personId).subscribe({
      next: (data) => {
        this.person = data;
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar os detalhes da pessoa.';
      }
    });
  }
}
