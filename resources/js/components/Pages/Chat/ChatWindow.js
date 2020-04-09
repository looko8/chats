import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {connect} from "react-redux";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppLayout from "../../layout/AppLayout";
import {getChat, getErrors, getLoading, getMessages} from "../../../store/selectors/chats";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import {TextField, FormControl, CircularProgress} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import CardActions from "@material-ui/core/CardActions";
import {getUser} from "../../../store/selectors/auth";
import {saveMessage, sendMessageRequest} from "../../../store/chats";
import Backdrop from "@material-ui/core/Backdrop";
import Alert from "@material-ui/lab/Alert";
import MessageList from "./MessageList";

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: red[500],
    },
}));

const ChatWindow = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        message: ''
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSendMessage = () => {
        const data = {
            chat_id: props.chat.id,
            user_id: props.user.id,
            text: values.message,
            reply_message_id: null
        };
        setValues({...values, message: ''});
        props.send(data);
    };

    React.useEffect(() => {
        props.chat && window.Echo.private(`chat.${props.chat.id}`).listen('Message', ({data}) => {
            props.save(data);
        });

        return () => {
            window.Echo.leave(`chat.${props.chat.id}`);
        }
    });

    return (
        <AppLayout>
            {props.loading &&
            <Backdrop open={props.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            }
            {props.errors && <Alert severity="error">{props.errors.message}</Alert>}
            {props.chat &&
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} src={"/storage/" + props.chat.image} />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.chat.title}
                />
                <CardContent>
                    <Container>
                        <MessageList chatId={props.chat.id} />
                        <CardActions>
                            <FormControl fullWidth>
                                <TextField
                                    id="standard-textarea"
                                    placeholder="Enter your message"
                                    value={values.message}
                                    multiline
                                    onChange={handleChange('message')}
                                />
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<SendIcon />}
                                onClick={handleSendMessage}
                            >
                                Send
                            </Button>
                        </CardActions>
                    </Container>
                </CardContent>
            </Card>
            }
        </AppLayout>
    )
};

const mapStateToProps = (state, {match: {params: {id}}}) => {
    return {
        loading: getLoading(state),
        errors: getErrors(state),
        chat: getChat(state, id),
        user: getUser(state),
        messages: getMessages(state)
    }
};

const mapDispatchToProps = {
    send: sendMessageRequest,
    save: saveMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
