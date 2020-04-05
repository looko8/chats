import React from 'react';
import { Link } from 'react-router-dom';
import {
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
import AuthLayout from "../../layout/AuthLayout";
import Alert from '@material-ui/lab/Alert'
import {getErrors, getLoading, userIsRegistered} from "../../../store/selectors/auth";
import {registerRequest} from "../../../store/auth";
import {connect} from 'react-redux';

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
        const data = {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation
        };
        props.register(data);
    };

    React.useEffect(() => {
        props.registered && props.history.push('/login');
    },[props.registered]);

    return (
        <AuthLayout title="Регистрация">
            {props.errors.message && <Alert severity="error">{props.errors.message}</Alert>}
            <FormGroup>
                <TextField
                    required
                    id="name"
                    label="Name"
                    variant="filled"
                    className={classes.margin}
                    onChange={handleChange('name')}
                    error={Boolean(props.errors.name)}
                    helperText={props.errors.name}
                />
                <TextField
                    required
                    id="email"
                    label="Email"
                    variant="filled"
                    className={classes.margin}
                    onChange={handleChange('email')}
                    error={Boolean(props.errors.email)}
                    helperText={props.errors.email}
                />
                <FormControl className={classes.margin} variant="filled" error={Boolean(props.errors.password)}>
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
                        aria-describedby="password"
                    />
                    <FormHelperText>{props.errors.password}</FormHelperText>
                </FormControl>
                <FormControl className={classes.margin} variant="filled" error={Boolean(props.errors.password)}>
                    <InputLabel htmlFor="password_confirmation">Password confirm</InputLabel>
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
                    <FormHelperText>{props.errors.password}</FormHelperText>
                </FormControl>
                <Button onClick={handleRegister} variant="contained" color="primary">Register</Button>
                <Link to="/login">Login</Link>
            </FormGroup>
        </AuthLayout>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: getLoading(state),
        errors: getErrors(state),
        registered: userIsRegistered(state),
    }
};

const mapDispatchToProps = {
    register: registerRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
