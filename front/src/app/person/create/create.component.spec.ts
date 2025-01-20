import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { PersonService } from '../../services/person.service';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let personService: jasmine.SpyObj<PersonService>;

  beforeEach(async () => {
    const personServiceSpy = jasmine.createSpyObj('PersonService', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ CreateComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [
        { provide: PersonService, useValue: personServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    personService = TestBed.inject(PersonService) as jasmine.SpyObj<PersonService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate fields correctly', () => {
    component.person.name = '';
    component.person.nickname = '';
    component.person.birth = '';

    component.validateField('name', component.person.name);
    component.validateField('nickname', component.person.nickname);
    component.validateField('birth', component.person.birth);

    expect(component.errors.name).toBe('O campo nome é obrigatório');
    expect(component.errors.nickname).toBe('O campo apelido é obrigatório');
    expect(component.errors.birth).toBe('O campo data de nascimento é obrigatório');
  });


  it('should handle form submission errors', () => {
    const mockError = { error: { errors: { name: 'Nome inválido' } } };
    personService.create.and.returnValue(throwError(mockError));

    component.person.name = 'Invalid Name';
    component.person.nickname = 'Johnny';
    component.person.birth = '1990-01-01';

    component.onSubmit();

    expect(personService.create).toHaveBeenCalledWith(component.person);
    expect(component.errors.name).toBe('Nome inválido');
  });
});
