import {Observable} from "rxjs";
import {OpaqueToken} from "@angular/core";

interface IContactsService {
    getAll(): Observable<any>;
}

const IContactsServiceType = new OpaqueToken("IContactService");

export {
    IContactsService,
    IContactsServiceType
};