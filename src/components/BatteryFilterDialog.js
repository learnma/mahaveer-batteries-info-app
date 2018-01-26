import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

import { connect } from "react-redux";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class BatteryFilterDialog extends React.Component {
    state = {
        type: '',
        make: '',
        model: ''
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClose = () => {
        this.props.onClose();
    };

    handleSelect = () => {
        const { type, make, model } = this.state;
        this.props.onSelect(type, make, model);
    }

    canSelect = () => {
        const { type, make, model } = this.state;
        return type && make && model;
    }

    render() {
        const { classes } = this.props;
        const types = this.props.vehicleModels.map(vm => vm.type);
        const uniqueTypes = [...new Set(types)];
        const typeItems = uniqueTypes.map(type => {
            return (<MenuItem key={type} value={type}>{type}</MenuItem>)
        });

        let makeItems = null;
        if (this.state.type) {
            const { vehicleModels } = this.props;
            const makes = vehicleModels.filter(vm => vm.type === this.state.type).map(vm => vm.make);
            const uniqueMakes = [...new Set(makes)];
            makeItems = uniqueMakes.map(make => <MenuItem key={make} value={make}>{make}</MenuItem>);
        }

        let modelItems = null;
        if (this.state.type && this.state.make) {
            const { vehicleModels } = this.props;
            const models = vehicleModels.filter(vm => vm.type === this.state.type && vm.make === this.state.make).map(vm => vm.model);
            const uniqueModels = [...new Set(models)];
            modelItems = uniqueModels.map(model => <MenuItem key={model} value={model}>{model}</MenuItem>);
        }

        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.props.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Select Vehicle Details</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="type">Type</InputLabel>
                                <Select
                                    value={this.state.type}
                                    onChange={this.handleChange('type')}
                                    input={<Input id="type" />}
                                >
                                    {typeItems}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-simple">Make</InputLabel>
                                <Select
                                    value={this.state.make}
                                    onChange={this.handleChange('make')}
                                    input={<Input id="make" />}
                                >
                                    {makeItems}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="model">Model</InputLabel>
                                <Select
                                    value={this.state.model}
                                    onChange={this.handleChange('model')}
                                    input={<Input id="model" />}
                                >
                                    {modelItems}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleSelect} color="primary" disabled={!this.canSelect()}>
                            Ok
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

BatteryFilterDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        vehicleModels: state.vehicleModels
    }
}

export default withStyles(styles)(connect(mapStateToProps)(BatteryFilterDialog));