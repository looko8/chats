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
    Button
} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
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

const Register = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        second_name: '',
        patronymic: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
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

    const handleRegister = () => {
        axios.post('api/register', {
            name: values.name,
            second_name: values.second_name,
            patronymic: values.patronymic,
            phone: values.phone,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation
        }).then(response => console.log(response));
    };

    return (
        <AuthLayout title="Регистрация">
            <FormGroup>
                <TextField required id="name" label="Имя" variant="filled" className={clsx(classes.margin)} onChange={handleChange('name')} />
                <TextField required id="second_name" label="Фамилия" variant="filled" className={clsx(classes.margin)} onChange={handleChange('second_name')} />
                <TextField required id="patronymic" label="Отчество" variant="filled" className={clsx(classes.margin)} onChange={handleChange('patronymic')} />
                <TextField required id="phone" label="Телефон" variant="filled" className={clsx(classes.margin)} onChange={handleChange('phone')} />
                <TextField id="email" label="Email" variant="filled" className={clsx(classes.margin)} onChange={handleChange('email')} />
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
                <FormControl className={clsx(classes.margin)} variant="filled">
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
                    />
                </FormControl>
                <Button onClick={handleRegister} variant="contained" color="primary">Зарегистрироваться</Button>
            </FormGroup>
        </AuthLayout>
    );
};

export default Register;
