import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Card, CardDto, MovementDto } from "../shared/models/card";
import { v4 as uuidv4 } from 'uuid';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Card[]> {
    return this.http.get<Card[]>(environment.apiUrl +'/cards');
  }

  add(dto: CardDto): Observable<Card> {    
    return this.http.post<Card>(environment.apiUrl + '/cards', {
      ...dto,
      _id: uuidv4(),
    });
  }

  delete(_id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl +'/cards/' + _id);
  }

  movements(_id: string, limit: number, offset: number): Observable<MovementDto> {
    return this.http.get<MovementDto>(environment.apiUrl +'/cards/' + _id + '/movements', {
      params: {
        limit,
        offset,
      }
    });
  }
}
