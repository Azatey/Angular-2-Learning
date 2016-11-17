import {Injectable} from "@angular/core";
import {IContactsService} from "../declarations/contacts-service.declaration";
import {Observable} from "rxjs";
import data from "./data";

@Injectable()
export class FakeContactsService implements IContactsService {
    getAll(): Observable<any> {
        return Observable
            .from(data)     // Populate from data.ts
            .toArray()      // Convert to array observable
            .delay(3000);   // Mimic 3 sec network delay
    }
}