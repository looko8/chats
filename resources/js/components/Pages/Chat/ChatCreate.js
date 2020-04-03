import React from "react";
import AppLayout from "../../layout/AppLayout";
import {TextField, Button, FormControl, FormGroup} from "@material-ui/core";
import axios from 'axios';

const ChatCreate = () => {

    const [title, setTitle] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [path, setPath] = React.useState(null);

    const handleCreateChat = () => {
        let formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.post('api/chats',
            formData,
            {headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then(response => {setPath(response)})
    };

    return (
        <AppLayout>
            <FormGroup>
                <TextField
                    id="title"
                    name="title"
                    label="Название чата"
                    variant="filled"
                    value={title}
                    onChange={(event => {setTitle(event.target.value)})}
                />
                <FormControl>
                    <label htmlFor="image">Картинка чата</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(event => {setImage(event.target.files[0])})}
                    />
                </FormControl>
                <Button variant="contained" onClick={handleCreateChat}>Сохранить</Button>
            </FormGroup>
        </AppLayout>
    );
};

export default ChatCreate;
