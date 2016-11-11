import {Component, Input, Output, EventEmitter} from "@angular/core";
import {select} from "ng2-redux";
import {Observable} from "rxjs";
import {ContactId, ContactHolder} from "../declarations";

@Component({
    selector: "contacts",
    templateUrl: "contacts.component.html"
})
export class ContactsComponent {
    @Input()
    data: Array<string>;

    @select("people")
    contacts: Observable<ContactHolder>;

    @Output()
    onContactSelected = new EventEmitter<ContactId>();

    selectedContactId: ContactId;

    handleContactSelection(id: ContactId) {
        this.updateSelection(id);
    }

    clearSelection() {
        this.updateSelection(null);
    }

    private updateSelection(id: ContactId) {
        this.selectedContactId = id;
        this.onContactSelected.emit(id);
    }
}