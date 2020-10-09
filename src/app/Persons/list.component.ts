import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PersonService } from '@app/_services/person.service';

 
@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    persons = null;

    constructor(private personService: PersonService) {}

    ngOnInit() {
        this.personService.getAll()
            .pipe(first())
            .subscribe(persons => this.persons = persons);
    }

    deleteUser(id: string) {
        const user = this.persons.find(x => x.id === id);
        user.isDeleting = true;
        this.personService.delete(id)
            .pipe(first())
            .subscribe(() => this.persons = this.persons.filter(x => x.id !== id));
    }
}