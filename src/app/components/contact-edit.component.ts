import {Component, Input, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {NgRedux} from "ng2-redux";
import {ContactManipulations} from "../actions/contact-manipulations";
import {ContactId, IPerson, IAppState} from "../declarations";

@Component({
    selector: "contact-edit",
    templateUrl: "contact-edit.component.html"
})
export class ContactEditComponent implements OnInit, OnChanges {
    @Input()
    id: ContactId;

    personDetails: IPerson;

    constructor(private ngRedux: NgRedux<IAppState>,
                private contactManipulations: ContactManipulations) {
    }

    ngOnInit(): void {
        this.updateInternalData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes["id"]) {
            this.updateInternalData();
        }
    }

    private updateInternalData() {
        if (!!this.id) {
            const state = this.ngRedux.getState();
            const peopleById = state.people.byId;
            if (!!peopleById) {
                const person = peopleById[this.id];
                this.personDetails = Object.assign({}, person);
                return;
            }
        }

        this.personDetails = <IPerson>{};
    }

    saveChanges() {
        const person = Object.assign({}, this.personDetails);
        if (!!this.id) {
            this.contactManipulations.editContact(this.id, person);
        } else {
            this.contactManipulations.addNewContact(person)
        }

        this.personDetails = <IPerson>{};
    }
}