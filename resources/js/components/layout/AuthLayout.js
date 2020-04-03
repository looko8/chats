import React from "react";
import {Container, Box} from "@material-ui/core";

const AuthLayout = (props) => {
    return (
        <Container style={{textAlign: "center"}}>
            <Box>
                <h1>{props.title}</h1>
                {props.children}
            </Box>
        </Container>
    );
};

export default AuthLayout;
