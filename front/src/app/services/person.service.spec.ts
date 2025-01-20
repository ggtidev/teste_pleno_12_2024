import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PersonService } from './person.service';
import { Person } from '../models/person.model';

describe('PersonService', () => {
  let service: PersonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PersonService ]
    });
    service = TestBed.inject(PersonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all persons', () => {
    const mockPersons: Person[] = [
      { id: '1', name: 'John Doe', nickname: 'Johnny', birth: '1990-01-01' },
      { id: '2', name: 'Jane Doe', nickname: 'Janie', birth: '1992-02-02' }
    ];

    service.getAll().subscribe(persons => {
      expect(persons.length).toBe(2);
      expect(persons).toEqual(mockPersons);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPersons);
  });

  it('should retrieve a person by ID', () => {
    const mockPerson: Person = { id: '1', name: 'John Doe', nickname: 'Johnny', birth: '1990-01-01' };

    service.getById('1').subscribe(person => {
      expect(person).toEqual(mockPerson);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPerson);
  });

  it('should create a new person', () => {
    const newPerson: Person = { id: '3', name: 'Sam Smith', nickname: 'Sammy', birth: '1995-03-03' };

    service.create(newPerson).subscribe(person => {
      expect(person).toEqual(newPerson);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush(newPerson);
  });

  it('should update an existing person', () => {
    const updatedPerson: Person = { id: '1', name: 'John Doe', nickname: 'Johnny', birth: '1990-01-01' };

    service.update('1', updatedPerson).subscribe(person => {
      expect(person).toEqual(updatedPerson);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPerson);
  });

  it('should delete a person', () => {
    service.delete('1').subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
