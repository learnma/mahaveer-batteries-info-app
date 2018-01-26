import React, { Component } from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import DoneIcon from 'material-ui-icons/Done';
import DeleteIcon from 'material-ui-icons/Delete';
import CancelIcon from 'material-ui-icons/Cancel';
import TextField from 'material-ui/TextField';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import { connect } from "react-redux";

import { getVehiclesWithBatteryModel, addVehicle, deleteVehicle } from '../store/actions';

class VehicleList extends Component {
    constructor(props) {
        super(props);
        this.deletedVehicles = [];
        this.state = {
            addedVehicles: [],
            newVehicle: null
        }
    }

    componentDidMount() {
        this.props.getVehiclesWithBatteryModel(this.props.batteryModel);
    }

    handleAddVehicle = () => {
        const { batteryModel } = this.props;
        this.setState({
            newVehicle: {
                type: '',
                make: '',
                model: '',
                batterymodel: batteryModel.model,
                batteryname: batteryModel.name,
                batteryfullwarrenty: batteryModel.fullwarrenty,
                batteryproratawarrenty: batteryModel.proratawarrenty,
                batterylandingprice: batteryModel.landingprice,
                batterymrp: batteryModel.mrp
            }
        });
    }

    handleChange = name => event => {
        this.setState({
            newVehicle: {
                ...this.state.newVehicle,
                [name]: event.target.value
            }
        });
    };

    handleNewVehicleSave = () => {
        this.setState({
            addedVehicles: [...this.state.addedVehicles, this.state.newVehicle],
            newVehicle: null
        });
    }

    handleNewVehicleCancel = () => {
        this.setState({
            newVehicle: null
        })
    }

    handleVehicleDelete = vehicle => {
        const deletedVehicle = this.props.vehicleModels.find(vm => vm.make === vehicle.make && vm.model === vehicle.model && vm.type === vehicle.type)
        if (deletedVehicle) {
            this.deletedVehicles.push(deletedVehicle);
        }
        this.setState({
            addedVehicles: this.state.addedVehicles.filter(v => v.model !== vehicle.model && v.make !== vehicle.make)
        });
    }

    handleSave = () => {
        this.state.addedVehicles.forEach(v => this.props.addVehicle(v));
        this.setState({
            addedVehicles: []
        });
        this.deletedVehicles.forEach(v => this.props.deleteVehicle(v));
        this.deletedVehicles = [];
        this.props.onClose();
    }

    canSave = () => {
        return this.state.addedVehicles.length !== 0 || this.deletedVehicles.length !== 0;
    }

    renderRow() {
        let vechileModelsForBatteryModel = this.props.vehicleModels.filter(v => {
            if (v.batterymodel === this.props.batteryModel.model
                && !this.deletedVehicles.find(dv => dv.make === v.make && dv.model === v.model && dv.type === v.type)) {
                return true;
            }
            return false;
        });
        this.state.addedVehicles.forEach(v => vechileModelsForBatteryModel.push(v));
        return vechileModelsForBatteryModel.map(vehicle => {
            return (
                <TableRow key={vehicle.model}>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.make}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>
                        <div style={{ cursor: 'pointer' }}>
                            <DeleteIcon onClick={() => this.handleVehicleDelete(vehicle)} />
                        </div>
                    </TableCell>
                </TableRow>
            )
        })
    }

    renderNewRow() {
        if (this.state.newVehicle) {
            return (
                <TableRow key="newrow">
                    <TableCell>
                        <TextField
                            autoFocus
                            id="vehicletype"
                            margin="normal"
                            value={this.state.newVehicleType}
                            onChange={this.handleChange('type')}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="vehiclemake"
                            margin="normal"
                            value={this.state.newVehicle.make}
                            onChange={this.handleChange('make')}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="vehiclemodel"
                            margin="normal"
                            value={this.state.newVehicle.model}
                            onChange={this.handleChange('model')}
                        />
                    </TableCell>
                    <TableCell>
                        <div style={{ cursor: 'pointer' }}>
                            <DoneIcon onClick={() => this.handleNewVehicleSave()} />
                            <CancelIcon onClick={this.handleNewVehicleCancel} />
                        </div>
                    </TableCell>
                </TableRow>
            )
        }
    }

    render() {
        const { model, open, onClose } = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Vechicles for Battery {model} </DialogTitle>
                    <DialogContent>
                        <Button fab mini color="primary" aria-label="add" onClick={this.handleAddVehicle}>
                            <AddIcon />
                        </Button>
                        <Table style={{ padding: '10px' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Make</TableCell>
                                    <TableCell>Model</TableCell>
                                    <TableCell>Operations</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderRow()}
                                {this.renderNewRow()}
                            </TableBody>
                        </Table>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleSave()} color="primary" disabled={!this.canSave()}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        vehicleModels: state.vehicleModels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addVehicle: vehicle => dispatch(addVehicle(vehicle)),
        deleteVehicle: vehicle => dispatch(deleteVehicle(vehicle)),
        getVehiclesWithBatteryModel: batterymodel => dispatch(getVehiclesWithBatteryModel(batterymodel))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleList);
