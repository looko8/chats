import React from 'react';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import {
    InputLabel,
    FilledInput,
    InputAdornment,
    IconButton,
    FormGroup,
    FormControl,
    Typography,
    Button
} from "@material-ui/core";
import {Visibility, VisibilityOff, Person} from '@material-ui/icons';
import AuthLayout from "../../layout/AuthLayout";
import axios from "axios";

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

const Login = () => {
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
        axios.get("/sanctum/csrf-cookie").then(response => {
            axios.post("api/login", {
                phone: values.login,
                password: values.password
            }).then(response2 => console.log(response2));
        });
    };

    return (
        <AuthLayout title="Авторизация">
            <Typography>При вводе номера телефона, указывайте его ТОЛЬКО в формате +ХХХХХХХХХХХ</Typography>
            <FormGroup>
                <FormControl className={clsx(classes.margin)} variant="filled">
                    <InputLabel htmlFor="login">Телефон</InputLabel>
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
                <FormControl className={clsx(classes.margin)} variant="filled">
                    <InputLabel htmlFor="password">Пароль</InputLabel>
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
                <Button variant="contained" color="primary" onClick={handleLogin}>Войти</Button>
                <Link to="fogrot-password">Забыли пароль?</Link>
                <Link to="register">Зарегестрироваться</Link>
            </FormGroup>
        </AuthLayout>
    )
};

export default Login;
