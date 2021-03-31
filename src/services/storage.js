//Local Storage - save data locally to the web 
export function getLocalItem(key, defaultValue) {
    let value = localStorage.getItem(key);
    /* if value of the key in the localStorage is not null */
    if (value) {
        /* parsing JSON type value to whatever the type it should be in JS */
        value = JSON.parse(value);
        return value;
    }
    return defaultValue;
}

export function setLocalItem(key, value) {
    /* parsing any type value to JSON type value */
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

export function removeLocalItem(key) {
    localStorage.removeItem(key)
}


//Session Storage -- save data temporary (while the browser is open, and not refreshed)
export function getSessionItem(key, defaultValue) {
    let value = sessionStorage.getItem(key);
    if (value) {
        value = JSON.parse(value); 
        return value;
    }
    return defaultValue;
}

export function setSessionItem(key, value) {
    value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
}

export function removeSessionItem(key) {
    sessionStorage.removeItem(key);
}