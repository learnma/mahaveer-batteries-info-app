import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { connect } from "react-redux";

import LoginDialog from './LoginDialog';
import { logOff } from '../store/actions';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class AppHeaderBar extends Component {
    state = {
        showLoginDialog: false
    }

    handleShowLoginDialog = () => {
        this.setState({
            showLoginDialog: true
        })
    }

    handleHideLoginDialog = () => {
        this.setState({
            showLoginDialog: false
        })
    }

    handleLogoff = () => {
        this.props.logOff();
    }

    renderLoginOrLogoff() {
        let display = <Button color="contrast" onClick={this.handleShowLoginDialog}>Login</Button>;
        if (this.props.auth) {
            display = (
                <span>
                    <Button color="contrast" onClick={this.handleLogoff}>Logoff {this.props.auth.displayName}</Button>
                </span>
            )
        }
        return display;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <LoginDialog open={this.state.showLoginDialog} onClose={this.handleHideLoginDialog} />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            Mahaveer Batteries
                        </Typography>
                        {this.renderLoginOrLogoff()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

AppHeaderBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOff: () => dispatch(logOff())
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppHeaderBar));