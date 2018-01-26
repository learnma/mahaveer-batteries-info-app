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
        fullwarrenty: 0,
        proratawarrenty: 0,
        landingprice: 0.00,
        mrp: 0.00
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleAdd} color="primary" disabled={!this.canSave()}>
                            Add
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default BatteryDetail;