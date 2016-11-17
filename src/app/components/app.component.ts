import {Component, OnInit} from "@angular/core";
import {select} from "ng2-redux";
import {Observable} from "rxjs";
import {ContactHolder, ContactId} from "../declarations";
import {ContactManipulations} from "../actions/contact-manipulations";

@Component({
    selector: "app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    @select("people")
    contacts: Observable<ContactHolder>;

    @select("isLoading")
    isLoading: Observable<boolean>;

    constructor(private manipulations: ContactManipulations) {
    }

    ngOnInit(): void {
        // Starts initial load of contacts
        this.manipulations.loadContacts();
    }

    selectedContactId: ContactId;

    changeSelectedContact(id: string) {
        this.selectedContactId = id;
    }
}