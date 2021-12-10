import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment";
import { Contact } from "../shared/models/contact";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.apiUrl +'/contacts');
  }

  add(dto: Partial<Contact>): Observable<Contact> | null {
    if (!(dto.iban && dto.name && dto.surname))
      return null;
    
    return this.http.post<Contact>(environment.apiUrl + '/contacts', {
      ...dto,
      _id: uuidv4()
    });
  }

  update(dto: Partial<Contact>): Observable<Contact> | null {
    if (!(dto.iban && dto.name && dto.surname && dto._id))
      return null;
    return this.http.put<Contact>(environment.apiUrl +'/contacts/' + dto._id, dto);
  }

  delete(_id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl + '/contacts/' + _id);
  }
}
