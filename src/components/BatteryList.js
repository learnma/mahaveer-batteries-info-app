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
import TextField from 'material-ui/TextField';
import { connect } from "react-redux";

import BatteryDetail from './BatteryDetail';
import VehicleList from './VehicleList';
import BatteryFilterDialog from './BatteryFilterDialog';
import BatteryModelCard from './BatteryModelCard';

import {
    getBatteryModels,
    createBatteryModel,
    updateBatteryModel,
    deleteBatteryModel,
    loadAllVehicles,
    getBatteryModel
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
        editBatteryModel: null,
        editVehicleDetails: null,
        showBatteryFilterDialog: false,
        filterByVehicleModel: null,
        batteryModelToSearch: '',
        batteryModelFilterOn: false
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
            showAddBatteryDialog: false,
            editBatteryModel: null
        })
    }

    handleBatteryDetailSaved = detail => {
        if (detail.ref) {
            this.props.updateBatteryModel(detail);
        } else {
            this.props.createBatteryModel(detail);
        }
        this.setState({
            showAddBatteryDialog: false,
            editBatteryModel: null
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

    handleBatteryModelEdit = batteryModel => {
        this.setState({
            editBatteryModel: batteryModel
        });
    }

    handleBatterryModelChange = () => event => {
        this.setState({
            batteryModelToSearch: event.target.value
        });
    };

    handleSearchBatteryModel = () => {
        const { batteryModelToSearch, batteryModelFilterOn } = this.state;
        if (batteryModelFilterOn) {
            this.setState({
                batteryModelToSearch: ''
            });
        }
        if (batteryModelToSearch) {
            this.props.getBatteryModel(batteryModelToSearch);
        }

        this.setState({
            batteryModelFilterOn: !batteryModelFilterOn
        });
    }

    renderRow() {
        const { classes } = this.props;
        let batteryModels = this.props.batteryModels;
        if (this.state.batteryModelFilterOn) {
            batteryModels = this.props.batteryModels.filter(bm => bm.model === this.state.batteryModelToSearch);
        }
        return batteryModels.map(model => {
            return (
                <TableRow key={model.ref}>
                    <TableCell><a href="#" style={{ cursor: 'pointer' }} onClick={() => this.handleBatteryModelEdit(model)}>{model.model}</a></TableCell>
                    <TableCell>{model.name}</TableCell>
                    <TableCell numeric>{model.fullwarrenty}</TableCell>
                    <TableCell numeric>{model.proratawarrenty}</TableCell>
                    <TableCell numeric>{model.landingprice}</TableCell>
                    <TableCell numeric>{model.mrp}</TableCell>
                    <TableCell numeric>{model.stock}</TableCell>
                    <TableCell numeric>{model.ah}</TableCell>
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
            addBatteryDialog = <BatteryDetail batteryModel={null} open={true} onClose={this.handleOnCloseDetail} onBatteryDetailSaved={data => this.handleBatteryDetailSaved(data)} />
        }
        if (this.state.editBatteryModel) {
            addBatteryDialog = <BatteryDetail batteryModel={this.state.editBatteryModel} open={true} onClose={this.handleOnCloseDetail} onBatteryDetailSaved={data => this.handleBatteryDetailSaved(data)} />
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
                    Select Vehicle
                </Button>
                <TextField
                    id="searchbatterymodel"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleBatterryModelChange()}
                    value={this.state.batteryModelToSearch}
                    placeholder="Enter battery model"
                    margin="normal"
                />
                <Button raised color="primary" className={classes.button} onClick={this.handleSearchBatteryModel}>
                    {this.state.batteryModelFilterOn ? 'Show all batteries' : 'Search battery model'}
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
                            <TableCell numeric>Stock</TableCell>
                            <TableCell numeric>AH</TableCell>
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
                    < BatteryModelCard
                        key={b.ref}
                        model={b.batterymodel} />
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
        getBatteryModel: batteryModel => dispatch(getBatteryModel(batteryModel)),
        createBatteryModel: batteryModel => dispatch(createBatteryModel(batteryModel)),
        updateBatteryModel: batteryModel => dispatch(updateBatteryModel(batteryModel)),
        deleteBatteryModel: batteryModel => dispatch(deleteBatteryModel(batteryModel)),
        loadAllVehicles: () => dispatch(loadAllVehicles())
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BatteryList));
