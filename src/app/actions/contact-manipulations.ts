import {IPerson, IAppState} from "../declarations";
import {ActionTypes} from "../constants";
import {newId} from "../utils";
import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux";

@Injectable()
export class ContactManipulations {
    constructor(private redux: NgRedux<IAppState>) {
    }

    private addNewContactAction = (person: IPerson) => ({
        type: ActionTypes.ADD_CONTACT,
        id: newId(),
        name: person.name,
        surname: person.surname,
        phoneNumber: person.phoneNumber
    });

    addNewContact(person: IPerson) {
        this.redux.dispatch(this.addNewContactAction(person));
    }

    private editContactAction = (id, person: IPerson) => ({
        type: ActionTypes.EDIT_CONTACT,
        id,
        name: person.name,
        surname: person.surname,
        phoneNumber: person.phoneNumber
    });

    editContact(id: string, person: IPerson) {
        this.redux.dispatch(this.editContactAction(id, person));
    }

    private removeContactAction = (id) => ({
        type: ActionTypes.REMOVE_CONTACT,
        id
    });

    removeContact(id: string) {
        this.redux.dispatch(this.removeContactAction(id));
    }
}