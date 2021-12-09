import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment";
import { Contact } from "../shared/models/contact";


@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.apiUrl +'/contacts');
  }

  add(dto: Partial<Contact>): Observable<Contact> | null {
    if (dto._id || !(dto.iban && dto.name && dto.surname))
      return null;
    return this.http.post<Contact>(environment.apiUrl +'/contacts', dto);
  }

  update(dto: Partial<Contact>): Observable<Contact> | null {
    if (!(dto._id && dto.iban && dto.name && dto.surname))
      return null;
    return this.http.put<Contact>(environment.apiUrl +'/contacts/:contactId', dto);
  }

  delete(): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl +'/contacts/:contactId');
  }
}
