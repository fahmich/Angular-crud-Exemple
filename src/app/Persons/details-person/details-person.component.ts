import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '@app/_services/person.service';
import { Person } from '@app/_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-details-person',
  templateUrl: './details-person.component.html',
  styleUrls: ['./details-person.component.less']
})
export class DetailsPersonComponent implements OnInit {

  constructor( public route: ActivatedRoute,private personService: PersonService
    ) { }
    person:Person=new Person()
  ngOnInit()  {
    this.route.params.subscribe(param => {     
        console.log(param['id'])
    
        this.personService.getById(param['id'])
        .pipe(first())
        .subscribe(person => this.person = person);
        console.log(this.person)
    

     })}

}
