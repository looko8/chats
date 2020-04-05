import React from 'react';
import AppLayout from "../layout/AppLayout";
import {connect} from 'react-redux';
import {getUser} from "../../store/selectors/auth";
import {Typography, List, ListItem} from "@material-ui/core";

const Home = (props) => {
    return (
        <AppLayout>
            <div className="col-sm-12">
                <Typography variant="h6">Welcome to app, {props.user.name}</Typography>
                <Typography variant="h6">Your info:</Typography>
                <List>
                    <ListItem>Id: {props.user.id}</ListItem>
                    <ListItem>Email: {props.user.email}</ListItem>
                    <ListItem>Created at: {props.user.created_at}</ListItem>
                </List>
            </div>
        </AppLayout>
    );
};

const mapStateToProps = (state) => {
    return {
        user: getUser(state)
    }
};

export default connect(mapStateToProps)(Home);
