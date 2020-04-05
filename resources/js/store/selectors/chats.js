export const getErrors = (state) => {
    return state.chats.errors;
};

export const getLoading = (state) => {
    return state.chats.loading;
};

export const getList = (state) => {
    return state.chats.list
};

export const getChat = (state, id) => {
    return state.chats.list.filter(chat => Number(chat.id) === Number(id))[0];
};
