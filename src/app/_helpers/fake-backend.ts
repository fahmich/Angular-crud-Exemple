import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';


// array in local storage for registered users
const usersKey = 'angular-master-details-crud-example-users';
let persons = JSON.parse(localStorage.getItem(usersKey)) || [
    {
    id: 1,
    adress: 'tunis',
    firstName: 'Fahmi',
    lastName: 'Chibani',
    email: 'fahmichibani@gmail.com',
 },
 {
    id: 2,
    adress: 'Ben Arous',
    firstName: 'sami',
    lastName: 'dridi',
    email: 'sami@gmail.com',
 },
 {
    id: 3,
    adress: 'Ariana',
    firstName: 'Jihen',
    lastName: 'twati',
    email: 'jihen@gmail.com',
 }

];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/persons') && method === 'GET':
                    return getPersons();
                case url.match(/\/persons\/\d+$/) && method === 'GET':
                    return getPersonById();
                case url.endsWith('/persons') && method === 'POST':
                    return createPerson();
                case url.match(/\/persons\/\d+$/) && method === 'PUT':
                    return updatePerson();
                case url.match(/\/persons\/\d+$/) && method === 'DELETE':
                    return deletePerson();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function getPersons() {
            return ok(persons.map(x => basicDetails(x)));
        }

        function getPersonById() {
            const person = persons.find(x => x.id === idFromUrl());
            return ok(basicDetails(person));
        }

        function createPerson() {
            const person = body;

            if (persons.find(x => x.email === person.email)) {
                return error(`User with the email ${person.email} already exists`);
            }

            // assign user id and a few other properties then save
            person.id = newPersonId();
            delete person.confirmPassword;
            persons.push(person);
            localStorage.setItem(usersKey, JSON.stringify(persons));

            return ok();
        }

        function updatePerson() {
            let params = body;
            let person = persons.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(person, params);
            localStorage.setItem(usersKey, JSON.stringify(persons));

            return ok();
        }

        function deletePerson() {
            persons = persons.filter(x => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(persons));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); 
                // call materialize and dematerialize to ensure delay even if an error is thrown. 
        }

        function basicDetails(person) {
            const { id, adress, firstName, lastName, email} = person;
            return { id, adress, firstName, lastName, email};
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function newPersonId() {
            return persons.length ? Math.max(...persons.map(x => x.id)) + 1 : 1;
        }
    } 
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};