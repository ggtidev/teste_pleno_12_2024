import { BaseResourceModel } from '../models/base-resource-model';

import { HttpClient } from '@angular/common/http';
import { Injector, resource } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;
  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(pesquisa?: string): Observable<{data: T[]}> {
    let url = pesquisa ? `${this.apiPath}?t=${pesquisa}` : this.apiPath;
    return this.http.get<{data: T[]}>(url).pipe(
      map(response => {
        response.data = this.jsonDataToResources(response.data);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<{data: T}> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get<{data: T}>(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<{status: string, message: string, data: T}> {
    return this.http.post<{data: T}>(this.apiPath, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
      );
    }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;
    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
      );
    }

  delete(id: string): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  // Métodos protegidos
  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(
      el => resources.push( this.jsonDataToResourceFn(el) )
      );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log('Erro na requisição -> ', error);
    return throwError(error);
  }
}
