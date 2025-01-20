import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { PersonService } from '../../services/person.service';
import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let personService: jasmine.SpyObj<PersonService>;

  beforeEach(async () => {
    const personServiceSpy = jasmine.createSpyObj('PersonService', ['update']);

    await TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [
        { provide: PersonService, useValue: personServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    personService = TestBed.inject(PersonService) as jasmine.SpyObj<PersonService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update person successfully', () => {
    const mockResponse = { id: '123', name: 'John Doe', nickname: 'Johnny', birth: '1990-01-01' };
    personService.update.and.returnValue(of(mockResponse));

    component.person = { id: '123', name: 'John Doe', nickname: 'Johnny', birth: '1990-01-01' };
    component.updatePerson();

    expect(personService.update).toHaveBeenCalledWith('123', component.person);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle error when updating person', () => {
    personService.update.and.returnValue(throwError('Erro ao atualizar a pessoa.'));

    component.person = { id: '123', name: 'Invalid Name', nickname: 'Johnny', birth: '1990-01-01' };
    component.updatePerson();

    expect(personService.update).toHaveBeenCalledWith('123', component.person);
    expect(component.errorMessage).toBe('Erro ao atualizar a pessoa.');
  });
});
