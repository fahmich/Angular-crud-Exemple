import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PersonService } from '@app/_services/person.service';
import { Router } from '@angular/router';

 
@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    persons = null;

    constructor(private personService: PersonService,private router: Router ) {}

    ngOnInit() {
        this.personService.getAll()
            .pipe(first())
            .subscribe(persons => this.persons = persons);
    }

    deletePerson(id: string) {
        const person = this.persons.find(x => x.id === id);
        person.isDeleting = true;
        this.personService.delete(id)
            .pipe(first())
            .subscribe(() => this.persons = this.persons.filter(x => x.id !== id));
    }

    redirectTo(id: string) {
        this.router.navigate(['/detail/'+id ])        
      }
}