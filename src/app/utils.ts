//Got from the internet
export const newId = (placeholder: number | any = null) => {
    const cryptoObj = window.crypto;
    return placeholder           // if the placeholder was passed, return
        ? (              // a random number from 0 to 15
        placeholder ^            // unless b is 8,
        cryptoObj.getRandomValues(new Uint8Array(1))[0]  // in which case
        % 16           // a random number from
        >> placeholder / 4         // 8 to 11
    ).toString(16) // in hexadecimal
        : (              // or otherwise a concatenated string:
        [1e7].toString() +        // 10000000 +
        -1e3 +         // -1000 +
        -4e3 +         // -4000 +
        -8e3 +         // -80000000 +
        -1e11          // -100000000000,
    ).replace(     // replacing
        /[018]/g,    // zeroes, ones, and eights with
        newId            // random hex digits
    );
};

export const updateObject = (state: any, mutations: any) => {
    return Object.assign({}, state, mutations);
};