import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DayWithSlot } from "../shared/models/days-with-slot";
import { DayWithSlots } from "../shared/models/days-with-slots";
import { environment } from "../../environments/environment";
import { Location } from "../shared/models/location";


@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(environment.apiUrl +'/locations');
  }

  getSlots(): Observable<DayWithSlots[]> {
    return this.http.get<DayWithSlots[]>(environment.apiUrl +'/slots/:locationId');
  }

  schedule(dto: DayWithSlot): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl +'/schedule', dto);
  }
}
