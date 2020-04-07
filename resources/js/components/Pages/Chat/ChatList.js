import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppLayout from "../../layout/AppLayout";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {getErrors, getList, getLoading, getSubscribedChats, getUnsubscribedChats} from "../../../store/selectors/chats";
import {fetchChatListRequest, subscribeToChatRequest} from "../../../store/chats";
import {CircularProgress} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    link: {
        textDecoration: 'none',
        color: 'unset'
    }
}));

const ChatList = (props) => {
    const classes = useStyles();

    React.useEffect(() => {
        props.fetchChatList();
    }, []);

    const handleSubscribe = (user_id, chat_id) => {
        const data = {
            user_id: user_id,
            chat_id: chat_id
        };
        props.subscribe(data);
    };

    return (
        <AppLayout>
            {props.loading &&
            <Backdrop open={props.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            }
            {props.errors && <Alert severity="error">{props.errors.message}</Alert>}
            <div className={classes.root}>
                <Grid container spacing={2}>
                    {props.subscribed && props.subscribed.length > 0 &&
                        <Grid item xs>
                            <Typography variant="h6" className={classes.title}>
                                Subscribed chats
                            </Typography>
                            <List>
                                {props.subscribed.map((item,index) => {
                                    return (
                                        <Link to={`/chats/${item.id}`} className={classes.link} key={index}>
                                            <ListItem divider key={index}>
                                                <ListItemAvatar>
                                                    <Avatar src={"/storage/" + item.image} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={item.title}
                                                    secondary="message"
                                                />
                                                <ListItemSecondaryAction>
                                                    <ListItemText
                                                        primary={"31.08.1997"}
                                                        secondary={
                                                            <span>10</span>
                                                        }
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </Link>
                                    )
                                })}
                            </List>
                        </Grid>
                    }
                    {props.unsubscribed && props.unsubscribed.length > 0 &&
                        <Grid item xs>
                            <Typography variant="h6" className={classes.title}>
                                Unsubscribed chats
                            </Typography>
                            <List>
                                {props.unsubscribed.map((item,index) => {
                                    return (
                                        <ListItem divider key={index}>
                                            <ListItemAvatar>
                                                <Avatar src={"/storage/" + item.image} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.title}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={() => handleSubscribe(props.user.id, item.id)}>
                                                    <AddIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Grid>
                    }
                </Grid>
            </div>

        </AppLayout>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: getLoading(state),
        errors: getErrors(state),
        subscribed: getSubscribedChats(state),
        unsubscribed: getUnsubscribedChats(state),
        user: state.auth.user
    }
};

const mapDispatchToProps =  {
    fetchChatList: fetchChatListRequest,
    subscribe: subscribeToChatRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
