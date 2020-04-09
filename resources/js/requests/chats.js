import axios from "axios";

export const fetchChatList = () => {
    return axios.get("api/chats");
};

export const subscribe = (data) => {
    return axios.post("api/chats/subscribe", data);
};

export const sendMessage = (data) => {
    return axios.post(`api/chats/${data.chat_id}/messages`, data);
};

export const fetchMessageList = (chat_id, page) => {
    return axios.get(`api/chats/${chat_id}/messages?page=${page}`);
};
