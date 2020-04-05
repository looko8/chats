export const getStatus = (state) => {
    return state.auth.isLoggedIn;
};

export const getErrors = (state) => {
    return state.auth.errors;
};

export const getLoading = (state) => {
    return state.auth.loading;
};

export const getUser = (state) => {
    return state.auth.user;
};

export const userIsRegistered = (state) => {
    return state.auth.registered;
};
