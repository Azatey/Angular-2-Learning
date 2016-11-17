import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {NgReduxModule, NgRedux} from "ng2-redux";
import {IAppState} from "./declarations/state.declaration";
import {rootReducer} from "./reducers/root";
import {AppComponent, ContactsComponent, ContactComponent, ContactEditComponent} from "./components";
import {ContactManipulations} from "./actions/contact-manipulations";
import {IContactsServiceType} from "./declarations/contacts-service.declaration";
import {FakeContactsService} from "./services/fake-contacts.service";
import thunk from "redux-thunk";

const Redux = NgReduxModule.forRoot();

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        Redux
    ],
    declarations: [
        AppComponent,
        ContactEditComponent,
        ContactsComponent,
        ContactComponent
    ],
    providers: [
        ContactManipulations,
        {
            provide: IContactsServiceType,
            useClass: FakeContactsService
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
    constructor(private redux: NgRedux<IAppState>) {
        redux.configureStore(rootReducer, <IAppState>{}, [thunk]);
    }
}