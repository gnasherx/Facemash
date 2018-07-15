import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withRoot from "../withRoot";
import * as axios from "axios";
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        width: "500px",
        marginTop: "200px",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "10px",
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    login: {
        ...theme.mixins.gutters(),
        width: "500px",
        margin: "0 auto",
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        ...theme.mixins.gutters(),
        margin: theme.spacing.unit,
        marginTop: "40px"
    },
    logButton: {
        marginLeft: "2px"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },

});

class Signup extends Component {
    state = {
        name: "",
        email: "",
        password: ""
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };


    createNewUser() {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/signup',
            data: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            },
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(response => {
                console.log(`New user crated: ${response}`);
                this.props.history.push('/home');
            })
            .catch(function (response) {
                console.log(`Error while creating user: ${response}`);
            });


        this.setState({
            name: "",
            email: "",
            password: "",
            showPassword: false,
        })
    }

    render() {

        const {classes} = this.props;

        return (
            <Fragment>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="headline" align="center" gutterBottom>
                        Facemash
                    </Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange.bind(this)}
                            margin="normal"
                            fullWidth
                            name="name"
                        />
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange.bind(this)}
                            margin="normal"
                            name="email"
                            fullWidth
                        />
                        <FormControl fullWidth className={classNames(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChange.bind(this)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button
                            variant="outlined"
                            fullWidth={true}
                            color="primary"
                            className={classes.button}
                            onClick={this.createNewUser.bind(this)}>
                            Create Account
                        </Button>
                        <div className={classes.login}>
                            <Typography variant="subheading" align="center">
                                have an account?
                            </Typography>
                            <Button className={classes.logButton}>Log in</Button>
                        </div>
                    </form>
                </Paper>
            </Fragment>

        )
    }
}


export default withRoot(withStyles(styles)(Signup));
