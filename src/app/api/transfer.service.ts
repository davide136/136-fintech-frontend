import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

type Transfer = {
  name: string,
  surname: string,
  iban: string,
  amount: number,
  cardId: string
}

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  transfer(dto: Transfer): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl+'/transfer', dto);
  }
}
