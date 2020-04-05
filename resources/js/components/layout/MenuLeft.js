import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ClickAwayListener } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {connect} from "react-redux";
import {logoutRequest} from "../../store/auth";
import {Link} from "react-router-dom";
import ChatIcon from '@material-ui/icons/Chat';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const MenuLeft = (props) => {
    const classes = useStyles();

    const handleLogout = () => {
        props.logout();
    };

    const sideList = () => (
        <ClickAwayListener onClickAway={() => props.setState(false)}>
            <div
                className={classes.list}
                role="presentation"
                onClick={() => props.setState(false)}
                onKeyDown={() => props.setState(false)}
            >
                <List>
                    <Link to="/home">
                        <ListItem button divider>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/chats">
                        <ListItem button divider>
                            <ListItemIcon><ChatIcon /></ListItemIcon>
                            <ListItemText>Chats</ListItemText>
                        </ListItem>
                    </Link>
                    <ListItem button onClick={handleLogout} divider>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </List>
            </div>
        </ClickAwayListener>
    );

    return (
        <div>
            <Drawer open={props.state} onClose={() => props.setState(true)}>
                {sideList()}
            </Drawer>
        </div>
    );
};

const mapDispatchToProps = {
    logout: logoutRequest
};

export default connect(null, mapDispatchToProps)(MenuLeft);
