import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import { connect } from "react-redux";

import { loginWithEmail } from '../store/actions';

class LoginDialog extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleClose = () => {
        this.props.onClose();
    };

    handleLogin = () => {
        this.props.login(this.state.email, this.state.password);
        this.props.onClose();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleLogin} color="primary">
                            Login
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(loginWithEmail(email, password))
    }
}

export default connect(null, mapDispatchToProps)(LoginDialog);