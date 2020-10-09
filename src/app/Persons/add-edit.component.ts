import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {  AlertService, PersonService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private personService: PersonService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
 
        this.form = this.formBuilder.group({
            adress: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]], 
        });

             this.personService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
       
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        if (this.isAddMode) {
            this.createPerson();
        } else {
            this.updatePerson();
        }
    }

    private createPerson() {
        this.personService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Person added', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updatePerson() {
        this.personService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Person updated', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}