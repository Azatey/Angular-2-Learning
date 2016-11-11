import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ContactManipulations} from "../actions/contact-manipulations";
import {IPerson, ContactId} from "../declarations/state.declaration";

@Component({
    selector: "contact",
    templateUrl: "contact.component.html"
})
export class ContactComponent {
    constructor(private contactManipulations: ContactManipulations) {
    }

    @Input()
    id: ContactId;

    @Input()
    details: IPerson;

    @Input()
    selected: boolean;

    @Output()
    onSelected = new EventEmitter<ContactId>();

    handleSelection() {
        this.onSelected.emit(this.id);
    }

    deleteContact() {
        this.contactManipulations.removeContact(this.id);
    }
}