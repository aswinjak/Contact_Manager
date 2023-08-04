import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Contacts } from '../contacts';
import { Mygroup } from '../mygroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseURL: string = "  http://localhost:4000";

  constructor(private http:HttpClient) { }

  //Get all contact
  public getAllContact(): Observable<Contacts[]> {
    let dataURL: string = `${this.baseURL}/contacts`;
    return this.http.get<Contacts[]>(dataURL).pipe(catchError(this.handleError));
  }

  //Get single contact
  public getContact(contactId:string): Observable<Contacts> {
    let dataURL: string = `${this.baseURL}/contacts/${contactId}`;
    return this.http.get<Contacts>(dataURL).pipe(catchError(this.handleError));
  }

  //Create contact
  public createContact(contact:Contacts): Observable<Contacts> {
    let dataURL: string = `${this.baseURL}/contacts`;
    return this.http.post<Contacts>(dataURL,contact).pipe(catchError(this.handleError));
  }

  //Update contact
  public updateContact(contact:Contacts, contactId:string): Observable<Contacts> {
    let dataURL: string = `${this.baseURL}/contacts/${contactId}`;
    return this.http.put<Contacts>(dataURL,contact).pipe(catchError(this.handleError));
  }

  //Delete contact
  public deleteContact(contactId:string): Observable<Contacts> {
    let dataURL: string = `${this.baseURL}/contacts/${contactId}`;
    return this.http.delete<Contacts>(dataURL).pipe(catchError(this.handleError));
  }

  //Get all groups
  public getAllGroups(): Observable<Mygroup[]> {
    let dataURL: string = `${this.baseURL}/groups`;
    return this.http.get<Mygroup[]>(dataURL).pipe(catchError(this.handleError));
  }

    //Get single group
    public getGroup(contact:Contacts): Observable<Mygroup> {
      let dataURL: string = `${this.baseURL}/groups/${contact.groupId}`;
      return this.http.get<Mygroup>(dataURL).pipe(catchError(this.handleError));
    }

  //Handle error
  public handleError(errors:HttpErrorResponse) {
    let errorMessage: string = '';
    if(errors.error instanceof ErrorEvent)
    {
      errorMessage = `Error :${errors.error.message}`
    }
    else
    {
      errorMessage = `Status: ${errors.status} \n Message:${errors.message}`;
    }
    return throwError(errorMessage);
  }
}
