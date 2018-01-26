import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import MotorcycleIcon from 'material-ui-icons/Motorcycle';
import Typography from 'material-ui/Typography';
import { connect } from "react-redux";

import BatteryDetail from './BatteryDetail';
import VehicleList from './VehicleList';
import BatteryFilterDialog from './BatteryFilterDialog';
import BatteryModelCard from './BatteryModelCard';

import {
    getBatteryModels,
    createBatteryModel,
    deleteBatteryModel,
    loadAllVehicles
} from '../store/actions';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class BatteryList extends Component {
    state = {
        showAddBatteryDialog: false,
        editVehicleDetails: null,
        showBatteryFilterDialog: false,
        filterByVehicleModel: null
    }

    componentDidMount() {
        this.props.getBatteryModels();
        this.props.loadAllVehicles();
    }

    handleOnAddBattery = () => {
        this.setState({
            showAddBatteryDialog: true
        })
    }

    handleOnCloseDetail = () => {
        this.setState({
            showAddBatteryDialog: false
        })
    }

    handleBatteryDetailSaved = detail => {
        this.props.createBatteryModel(detail);
        this.setState({
            showAddBatteryDialog: false
        });
    }

    handleVehicleDetails = model => {
        this.setState({
            editVehicleDetails: model
        })
    }

    handleOnCloseVehicleDetail = () => {
        this.setState({
            editVehicleDetails: null
        })
    }

    handleDeleteModel = batteryModel => {
        this.props.deleteBatteryModel(batteryModel);
    }

    handleBatteryFilterDialogOpen = () => {
        this.setState({
            showBatteryFilterDialog: true
        });
    }

    handleBatteryFilterDialogClose = () => {
        this.setState({
            showBatteryFilterDialog: false
        });
    }

    handleVehicleModelSelect = (type, make, model) => {
        this.setState({
            showBatteryFilterDialog: false,
            filterByVehicleModel: {
                type, make, model
            }
        });
    }

    handleOnShowAllBattery = () => {
        this.setState({
            filterByVehicleModel: null
        });
    }

    renderRow() {
        const { classes } = this.props;
        return this.props.batteryModels.map(model => {
            return (
                <TableRow key={model.model}>
                    <TableCell>{model.model}</TableCell>
                    <TableCell>{model.name}</TableCell>
                    <TableCell numeric>{model.fullwarrenty}</TableCell>
                    <TableCell numeric>{model.proratawarrenty}</TableCell>
                    <TableCell numeric>{model.landingprice}</TableCell>
                    <TableCell numeric>{model.mrp}</TableCell>
                    <TableCell>
                        <IconButton
                            className={classes.button}
                            aria-label="Edit Vehicles"
                            onClick={() => this.handleVehicleDetails(model.model)}>
                            <MotorcycleIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        <IconButton
                            className={classes.button}
                            aria-label="Edit"
                            onClick={() => this.handleDeleteModel(model)}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    }

    render() {
        const { classes } = this.props;
        let addBatteryDialog = null;
        let vehicleDetailsDialog = null;
        let batteryFilterDialog = null;
        if (this.state.showAddBatteryDialog) {
            addBatteryDialog = <BatteryDetail open={true} onClose={this.handleOnCloseDetail} onBatteryDetailSaved={data => this.handleBatteryDetailSaved(data)} />
        }
        if (this.state.editVehicleDetails) {
            const batteryModel = this.props.batteryModels.find(m => m.model === this.state.editVehicleDetails);
            vehicleDetailsDialog = <VehicleList
                open={true}
                batteryModel={batteryModel}
                onClose={this.handleOnCloseVehicleDetail} />
        }
        if (this.state.showBatteryFilterDialog) {
            batteryFilterDialog = <BatteryFilterDialog
                open={true}
                onSelect={this.handleVehicleModelSelect}
                onClose={this.handleBatteryFilterDialogClose} />
        }

        const allBatteryModels = (
            <Paper className={classes.root}>
                <Button raised color="primary" className={classes.button} onClick={this.handleOnAddBattery}>
                    Add Battery Model
                </Button>
                <Button raised color="primary" className={classes.button} onClick={this.handleBatteryFilterDialogOpen}>
                    Search Battery Model
                </Button>
                {addBatteryDialog}
                {vehicleDetailsDialog}
                {batteryFilterDialog}
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Model</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Warrenty</TableCell>
                            <TableCell numeric>Prorata Warrenty</TableCell>
                            <TableCell numeric>LandingPrice</TableCell>
                            <TableCell numeric>MRP</TableCell>
                            <TableCell>Add Vehicle</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderRow()}
                    </TableBody>
                </Table>
            </Paper>
        );

        if (!this.state.filterByVehicleModel) {
            return allBatteryModels;
        } else {
            const { type, make, model } = this.state.filterByVehicleModel;
            const batteryModels = this.props.vehicleModels.filter(vm => {
                return vm.type === type && vm.make === make && vm.model === model;
            });
            const batteryCards = batteryModels.map(b => {
                return (
                    <BatteryModelCard
                        key={b.ref}
                        name={b.batteryname}
                        model={b.batterymodel}
                        fullwarrenty={b.batteryfullwarrenty}
                        proratawarrenty={b.batteryproratawarrenty}
                        landingprice={b.batterylandingprice}
                        mrp={b.batterymrp} />
                );
            });
            return (
                <Paper className={classes.root}>
                    {batteryFilterDialog}
                    <Typography type="headline" component="h3">
                        Battery Models for <span style={{ color: 'green' }}>{type} - {make} - {model}</span>
                        <Button raised color="primary" className={classes.button} onClick={this.handleOnShowAllBattery}>
                            Show All Batteries
                        </Button>
                        <Button raised color="primary" className={classes.button} onClick={this.handleBatteryFilterDialogOpen}>
                            Search Battery Model
                        </Button>
                    </Typography>
                    {batteryCards}
                </Paper>
            )
        }
    }
}

BatteryList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        batteryModels: state.batteryModels,
        vehicleModels: state.vehicleModels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBatteryModels: () => dispatch(getBatteryModels()),
        createBatteryModel: batteryModel => dispatch(createBatteryModel(batteryModel)),
        deleteBatteryModel: batteryModel => dispatch(deleteBatteryModel(batteryModel)),
        loadAllVehicles: () => dispatch(loadAllVehicles())
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BatteryList));
