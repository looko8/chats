import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
    InputLabel,
    FilledInput,
    InputAdornment,
    IconButton,
    FormGroup,
    FormControl,
    Button,
    CircularProgress
} from "@material-ui/core";
import {Visibility, VisibilityOff, Person} from '@material-ui/icons';
import AuthLayout from "../../layout/AuthLayout";
import {connect} from 'react-redux';
import {loginRequest} from "../../../store/auth";
import {getStatus, getErrors, getLoading} from "../../../store/selectors/auth";
import Alert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    }
}));

const Login = (props) => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        login: '',
        password: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleLogin = () => {
        const data = {
            email: values.login,
            password: values.password
        };
        props.login(data);
    };

    return (
        <AuthLayout title="Авторизация">
            {props.loading &&
            <Backdrop open={props.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            }
            {props.errors.message && <Alert severity="error">{props.errors.message}</Alert>}
            <FormGroup>
                <FormControl className={classes.margin} variant="filled">
                    <InputLabel htmlFor="login">Email</InputLabel>
                    <FilledInput
                        id="login"
                        required
                        onChange={handleChange('login')}
                        endAdornment={
                            <InputAdornment position="end">
                                <Person />
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={classes.margin} variant="filled">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <FilledInput
                        id="password"
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                <Link to="/register">Register</Link>
            </FormGroup>
        </AuthLayout>
    )
};

const mapDispatchToProps = {
    login: loginRequest
};

const mapStateToProps = (state) => {
    return {
        loading: getLoading(state),
        errors: getErrors(state),
        isLoggedIn: getStatus(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
