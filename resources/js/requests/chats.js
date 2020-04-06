import axios from "axios";

export const fetchChatList = () => {
    return axios.get("api/chats");
};

export const subscribe = (data) => {
    return axios.post("api/chats/subscribe", data);
};
