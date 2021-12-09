import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Card } from "../shared/models/card";
import { Movement } from "../shared/models/movement";
import { environment } from "../../environments/environment";

export type CardDto = {
  _id: string,
  type: 'visa' | 'mastercard',
  name: string,
  surname: string,
  number: string,
  csc: number
};
type MovementDto = {
  data: Movement[],
  total: number
}

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Card[]> {
    return this.http.get<Card[]>(environment.apiUrl +'/cards');
  }

  add(dto: CardDto): Observable<Card> {
    return this.http.post<Card>(environment.apiUrl +'/cards', dto);
  }

  update(dto: Card): Observable<Card> {
    return this.http.put<Card>(environment.apiUrl +'/cards', dto);
  }

  delete(): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl +'/cards/:cardId');
  }

  movements(limit: number, offset: number): Observable<MovementDto> {
    return this.http.get<MovementDto>(environment.apiUrl +'/cards/:cardId/movements', {
      params: {
        limit,
        offset,
      }
    });
  }
}
