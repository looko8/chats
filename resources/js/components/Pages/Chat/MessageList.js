import React from "react";
import useInfiniteScroll from "../../../helpers/useInfiniteScroll";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import {getChat, getCurrentPage, getErrors, getLastPage, getLoading, getMessages} from "../../../store/selectors/chats";
import {getUser} from "../../../store/selectors/auth";
import {fetchMessageListRequest, saveMessage, sendMessageRequest} from "../../../store/chats";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 600,
        overflowY: 'scroll'
    },
    inline: {
        display: 'inline',
    }
}));

/*TODO focus on firstitem on mount and load*/
const MessageList = (props) => {
    const classes = useStyles();

    React.useEffect(() => {
        props.fetchMessageList(props.chatId)
    },[]);

    const loadMoreItems = (event) => {
        if (event.target.scrollTop === 0 && props.currentPage !== props.lastPage) {
            let nextPage = props.currentPage + 1;
            props.fetchMessageList(props.chatId, nextPage);
        }

    };

    return (
          <List className={classes.root} onScroll={loadMoreItems}>
              {props.messages && props.messages.length > 0 &&
                  props.messages.map((item, index) => {
                      return (
                          <ListItem alignItems="flex-start" divider key={index}>
                              <ListItemAvatar>
                                  <Avatar alt={item.user.name} src="#"/>
                              </ListItemAvatar>
                              <ListItemText
                                  primary={item.text}
                                  secondary={
                                      <React.Fragment>
                                          <Typography
                                              component="span"
                                              variant="body2"
                                              className={classes.inline}
                                              color="textPrimary"
                                          >
                                              {item.user.name}
                                          </Typography>
                                          {` — ${new Date(item.created_at).toLocaleString()}`}
                                      </React.Fragment>
                                  }
                              />
                          </ListItem>
                      )
                  })
              }
          </List>
      )
};

const mapStateToProps = (state) => {
    return {
        user: getUser(state),
        messages: getMessages(state),
        currentPage: getCurrentPage(state),
        lastPage: getLastPage(state)
    }
};

const mapDispatchToProps = {
    fetchMessageList: fetchMessageListRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
