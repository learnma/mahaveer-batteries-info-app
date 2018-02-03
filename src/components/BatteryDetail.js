import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

class BatteryDetail extends React.Component {
    state = {
        model: '',
        name: '',
        brand: 'Amron',
        fullwarrenty: 0,
        proratawarrenty: 0,
        landingprice: 0.00,
        mrp: 0.00,
        stock: 0,
        ah: 0,
        ref: null
    }

    constructor(props) {
        super(props);
        if (props.batteryModel) {
            this.state = {
                ref: props.batteryModel.ref,
                model: props.batteryModel.model,
                name: props.batteryModel.name,
                brand: props.batteryModel.brand,
                fullwarrenty: props.batteryModel.fullwarrenty,
                proratawarrenty: props.batteryModel.proratawarrenty,
                landingprice: props.batteryModel.landingprice,
                mrp: props.batteryModel.mrp,
                stock: props.batteryModel.stock,
                ah: props.batteryModel.ah
            };
        }
    }

    handleAdd = () => {
        this.props.onBatteryDetailSaved(this.state)
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    canSave = () => {
        return this.state.model &&
            this.state.name &&
            this.state.fullwarrenty &&
            this.state.landingprice &&
            this.state.mrp;
    }

    render() {
        const { open, onClose } = this.props;
        let addOrSave = (<span>Save</span>);
        if (this.props.batteryModel) {
            addOrSave = (<span>Update</span>);
        }
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Enter Battery Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="model"
                            label="Model"
                            fullWidth
                            value={this.state.model}
                            onChange={this.handleChange('model')}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                        />
                        <TextField
                            margin="dense"
                            id="fullwarrenty"
                            label="Full Warrenty (months)"
                            type="number"
                            fullWidth
                            value={this.state.fullwarrenty}
                            onChange={this.handleChange('fullwarrenty')}
                        />
                        <TextField
                            margin="dense"
                            id="proratawarrenty"
                            label="Prorata Warrenty (months)"
                            type="number"
                            fullWidth
                            value={this.state.proratawarrenty}
                            onChange={this.handleChange('proratawarrenty')}
                        />
                        <TextField
                            margin="dense"
                            id="landingprice"
                            label="Landing Price (INR) 0.00"
                            type="number"
                            fullWidth
                            value={this.state.landingprice}
                            onChange={this.handleChange('landingprice')}
                        />
                        <TextField
                            margin="dense"
                            id="mrp"
                            label="MRP (INR) 0.00"
                            type="number"
                            fullWidth
                            value={this.state.mrp}
                            onChange={this.handleChange('mrp')}
                        />
                        <TextField
                            margin="dense"
                            id="stock"
                            label="Stock"
                            type="number"
                            fullWidth
                            value={this.state.stock}
                            onChange={this.handleChange('stock')}
                        />
                        <TextField
                            margin="dense"
                            id="ag"
                            label="AH"
                            type="number"
                            fullWidth
                            value={this.state.ah}
                            onChange={this.handleChange('ah')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAdd} color="primary" disabled={!this.canSave()}>
                            {addOrSave}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default BatteryDetail;