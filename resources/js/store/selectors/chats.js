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
    return state.chats.list.subscribed.filter(chat => Number(chat.id) === Number(id))[0];
};

export const getSubscribedChats = (state) => {
    return state.chats.list.subscribed;
};

export const getUnsubscribedChats = (state) => {
    return state.chats.list.unsubscribed;
};

export const getMessages = (state) => {
    return state.chats.messages.data;
};

export const getCurrentPage = (state) => {
    return state.chats.messages.current_page
};

export const getLastPage = (state) => {
    return state.chats.messages.last_page
};

