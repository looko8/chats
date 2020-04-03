import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Container,
    TextField,
    InputLabel,
    FilledInput,
    InputAdornment,
    IconButton,
    FormControl,
    FormGroup,
    Button,
    FormHelperText
} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import AuthLayout from "../../layout/AuthLayout";
import axios from "axios";
import Alert from '@material-ui/lab/Alert'

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

const Register = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        showPassword: false,
        errors: {
            message: false,
            name: false,
            email: false,
            password: false
        }
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

    const handleRegister = () => {
        axios.post('api/register', {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation
        }).then(props.history.push('/login'))
        .catch(error => {
            setValues(Object.assign({}, values, {errors: {
                message: error.response.data.message,
                name: error.response.data.errors.name,
                email: error.response.data.errors.email,
                password: error.response.data.errors.password
            }}));
        });
    };

    return (
        <AuthLayout title="Регистрация">
            {values.errors.message && <Alert severity="error">{values.errors.message}</Alert>}
            <FormGroup>
                <TextField
                    required
                    id="name"
                    label="Имя"
                    variant="filled"
                    className={clsx(classes.margin)}
                    onChange={handleChange('name')}
                    error={Boolean(values.errors.name)}
                    helperText={values.errors.name}
                />
                <TextField
                    required
                    id="email"
                    label="Email"
                    variant="filled"
                    className={clsx(classes.margin)}
                    onChange={handleChange('email')}
                    error={Boolean(values.errors.email)}
                    helperText={values.errors.email}
                />
                <FormControl className={clsx(classes.margin)} variant="filled" error={Boolean(values.errors.password)}>
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
                        aria-describedby="password"
                    />
                    <FormHelperText>{values.errors.password}</FormHelperText>
                </FormControl>
                <FormControl className={clsx(classes.margin)} variant="filled" error={Boolean(values.errors.password)}>
                    <InputLabel htmlFor="password_confirmation">Подтверждение пароля</InputLabel>
                    <FilledInput
                        id="password_confirmation"
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password_confirmation}
                        onChange={handleChange('password_confirmation')}
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
                        aria-describedby="password"
                    />
                    <FormHelperText>{values.errors.password}</FormHelperText>
                </FormControl>
                <Button onClick={handleRegister} variant="contained" color="primary">Зарегистрироваться</Button>
            </FormGroup>
        </AuthLayout>
    );
};

export default withRouter(Register);
