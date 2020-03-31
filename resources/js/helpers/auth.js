export const loggedIn = () => {
    return localStorage.setItem('isLoggedIn', 'true');
};

export const doNotLoggedIn = () => {
    return localStorage.removeItem('isLoggedIn');
};

export const isLoggedIn = () => {
    return localStorage.getItem('isLoggedIn');
};
