import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { PersonService } from '../../services/person.service';
import { DeleteComponent } from './delete.component';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;
  let personService: jasmine.SpyObj<PersonService>;

  beforeEach(async () => {
    const personServiceSpy = jasmine.createSpyObj('PersonService', ['delete']);

    await TestBed.configureTestingModule({
      declarations: [ DeleteComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: PersonService, useValue: personServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    personService = TestBed.inject(PersonService) as jasmine.SpyObj<PersonService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete person successfully', () => {
    personService.delete.and.returnValue(of({}));

    component.id = '123';
    component.deletePerson();

    expect(personService.delete).toHaveBeenCalledWith('123');
    expect(component.errorMessage).toBeNull();
  });

  it('should handle error when deleting person', () => {
    personService.delete.and.returnValue(throwError('Erro ao excluir a pessoa.'));

    component.id = '123';
    component.deletePerson();

    expect(personService.delete).toHaveBeenCalledWith('123');
    expect(component.errorMessage).toBe('Erro ao excluir a pessoa.');
  });
});
