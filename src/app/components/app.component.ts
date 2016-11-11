import {Component} from "@angular/core";
import {select} from "ng2-redux";
import {Observable} from "rxjs";
import {ContactHolder, ContactId} from "../declarations";

@Component({
    selector: "app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    @select("people")
    contacts: Observable<ContactHolder>;

    selectedContactId: ContactId;

    changeSelectedContact(id: string) {
        this.selectedContactId = id;
    }
}