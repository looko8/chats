import axios from "axios";

export const fetchChatList = () => {
    return axios.get("api/chats");
};
