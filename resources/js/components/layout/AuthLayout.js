import React from "react";
import {Container, Box, Typography} from "@material-ui/core";
import logo from "../../../static/logo.png";

const AuthLayout = (props) => {
    return (
        <Container style={{textAlign: "center"}}>
            <Box>
                <img alt="Remy Sharp" src={logo} />
                <h1>{props.title}</h1>
                {props.children}
            </Box>
        </Container>
    );
};

export default AuthLayout;
