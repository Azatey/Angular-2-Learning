interface IPerson {
    name: string,
    surname: string,
    phoneNumber: string
}

interface IKeyedPerson {
    [id: string]: IPerson
}

declare type ContactId = string;

declare type ContactIdsCollection = Array<ContactId>;

declare type ContactHolder = {
    byId: IKeyedPerson,
    allIds: ContactIdsCollection
};

interface IAppState {
    people: ContactHolder
}

export {
    IAppState,
    IPerson,
    IKeyedPerson,
    ContactId,
    ContactHolder,
    ContactIdsCollection
};