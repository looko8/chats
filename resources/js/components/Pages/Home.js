import React from 'react';
import AppLayout from "../layout/AppLayout";
import axios from "axios";

const ChatWindow = (props) => {
    return <ul>{props.messages.map((message, index) => {
        return <li key={index}>{message}</li>
    })}</ul>
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: ''
        }
    }

    handleChangeMessage(event) {
        this.setState({
            message: event.target.value
        });
    };

    handleSaveMessage(message) {
        this.setState({
            messages: this.state.messages.concat(message)
        });
    };

    handleSendMessage() {
        axios.post('api/messages', {body: this.state.message, chat_id: 1});
        this.handleSaveMessage(this.state.message);
        this.setState({
            message: ''
        })
    };

    render() {
        return (
            <AppLayout>
                <div className="col-sm-12">
                    <ChatWindow messages={this.state.messages} />
                    <hr />
                    <input className="form-control" value={this.state.message} onChange={this.handleChangeMessage.bind(this)}/>
                    <button onClick={this.handleSendMessage.bind(this)}>Отправить</button>
                </div>
            </AppLayout>
        )
    }
}

export default Home;
