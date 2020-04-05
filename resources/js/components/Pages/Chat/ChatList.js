import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppLayout from "../../layout/AppLayout";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {getErrors, getList, getLoading} from "../../../store/selectors/chats";
import {fetchChatListRequest} from "../../../store/chats";
import {CircularProgress} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
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

    return (
        <AppLayout>
            {props.loading &&
            <Backdrop open={props.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            }
            {props.errors && <Alert severity="error">{props.errors.message}</Alert>}
            <List>
                {props.list.map((item,index) => {
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
        </AppLayout>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: getLoading(state),
        errors: getErrors(state),
        list: getList(state)
    }
};

const mapDispatchToProps =  {
    fetchChatList: fetchChatListRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
