import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private http: HttpClient) { }

  taxes(dto: any): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + '/taxes', { dto });
  }
}
