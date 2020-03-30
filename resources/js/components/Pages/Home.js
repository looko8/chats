import React from 'react';
import TabMenu from "../layout/TabMenu";
import AppLayout from "../layout/AppLayout";
import axios from "axios";

const Home = () => {

    let messages = [];

    const [values, setValues] = React.useState({
        message: '',
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSendMessage = () => {
        axios.post('api/messages', {body: values.message});
        messages.push(values.message);
    };

    React.useEffect(() => {
        window.Echo.channel('chat').listen('Message', ({message}) => {
            console.log(message);
            messages.push(message);
        });
    }, []);

    return (
        <AppLayout>
            <div className="col-sm-12">
                <textarea className="form-control" rows={10} readOnly>{messages.join('\n')}</textarea>
                {console.log(messages)}
                <hr />
                <input className="form-control" onChange={handleChange('message')}/>
                <button onClick={handleSendMessage}>Отправить</button>
            </div>
        </AppLayout>
    );
};

export default Home;
