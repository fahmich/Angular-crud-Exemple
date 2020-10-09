import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Person } from '@app/_models';

const baseUrl = `${environment.apiUrl}/persons`;

@Injectable({ providedIn: 'root' })
export class PersonService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Person[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Person>(`${baseUrl}/${id}`);
    }

    create(params) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}