import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Luggage } from '../entities/luggage';

@Injectable({ providedIn: 'root' })
export class LuggageDataService {
  constructor(private http: HttpClient) {}

  load(): Observable<Luggage[]> {
    // Uncomment if needed
    /*
        const url = '...';
        const params = new HttpParams().set('param', 'value');
        const headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<Luggage[]>(url, {params, headers});
        */

    return of([
      {
        id: 1,
        name: '1 hand luggage',
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        id: 2,
        name: '1x luggage to checkin',
        description: 'At vero eos et accusam et justo duo dolores',
      },
      {
        id: 3,
        name: '2x luggage to checkin',
        description: 'Duis autem vel eum iriure dolor in hendrerit',
      },
    ]);
  }
}
