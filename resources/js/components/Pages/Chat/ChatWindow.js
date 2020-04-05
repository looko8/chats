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
import {getChat} from "../../../store/selectors/chats";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const ChatWindow = (props) => {
    const classes = useStyles();
    console.log(props.chat);
    return (
        <AppLayout>
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
                    <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
            </Card>
        </AppLayout>
    )
};

const mapStateToProps = (state, {match: {params: {id}}}) => {
    return {
        chat: getChat(state, id),
    }
};

export default connect(mapStateToProps)(ChatWindow);
