import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { ClickAwayListener } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from "axios";
import {doNotLoggedIn} from "../../helpers/auth";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function MenuLeft(props) {
    const classes = useStyles();

    const [user, setUser] = React.useState({
        name: '',
        email: ''
    });

    React.useEffect(() => {
        axios.get('api/user').then(response => {
            console.log(response);
            setUser({...user, name: response.data.name, email: response.data.email})
        });
    }, []);

    const handleLogout = () => {
        axios.post('api/logout').then(response => doNotLoggedIn());
    };

    const sideList = () => (
        <ClickAwayListener onClickAway={() => props.setState(false)}>
            <div
                className={classes.list}
                role="presentation"
                onClick={() => props.setState(false)}
                onKeyDown={() => props.setState(false)}
            >
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                {user.name}
                            </Typography>
                            <Typography>
                                {user.email}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Редактировать профиль
                        </Button>
                    </CardActions>
                </Card>

                <Divider />

                <List>
                    <ListItem onClick={handleLogout}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText>Выйти</ListItemText>
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
}
