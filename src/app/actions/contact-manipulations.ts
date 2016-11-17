import {IPerson, IAppState} from "../declarations";
import {ActionTypes} from "../constants";
import {newId} from "../utils";
import {Injectable, Inject} from "@angular/core";
import {NgRedux} from "ng2-redux";
import {IContactsService, IContactsServiceType} from "../declarations/contacts-service.declaration";
import {ContactId} from "../declarations/state.declaration";
import {Action} from "redux";

@Injectable()
export class ContactManipulations {
    constructor(private redux: NgRedux<IAppState>,
                @Inject(IContactsServiceType) private contactsService: IContactsService) {
    }

    private fetchContactsAction = () => ({
        type: ActionTypes.FETCH_CONTACTS,
        isLoading: true
    });

    private populateContactsAction = data => ({
        type: ActionTypes.POPULATE_CONTACTS,
        isLoading: false,
        data
    });

    loadContacts() {
        // Bypass TS compilation error,
        // since NgRedux type doesn't support [thunk] middleware calls
        const dispatch: any = this.redux.dispatch;
        dispatch(this.fetchContacts());
    }

    fetchContacts = () => (dispatch: (action: Action) => any) => {
        dispatch(this.fetchContactsAction());

        return this.contactsService.getAll().subscribe(contacts => {
            dispatch(this.populateContactsAction(contacts))
        })
    };

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

    editContact(id: ContactId, person: IPerson) {
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