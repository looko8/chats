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
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import {Divider} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    link: {
        textDecoration: 'none',
        color: 'unset'
    }
}));

const ChatList = () => {
    const classes = useStyles();
    const [list, setList] = React.useState([]);

    React.useEffect(() => {
        axios.get("api/chats").then(response => {
            setList(response.data.data);
        });
    }, []);

    return (
        <AppLayout>
            <Grid item>
                <div className={classes.demo}>
                    <List>
                        {list.map((item,index) => {
                            return (
                                <>
                                    <Link to={`/chats/${item.id}`} className={classes.link}>
                                        <ListItem key={index}>
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
                                                        <Chip color="primary" size="small" label={'1'} />
                                                    }
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </Link>
                                    <Divider />
                                </>
                            )
                        })}
                    </List>
                </div>
            </Grid>
        </AppLayout>
    );
};

export default ChatList;
