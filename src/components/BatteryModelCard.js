import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { connect } from "react-redux";

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

class BatteryModelCard extends Component {
  render() {
    const { classes } = this.props;
    const { model } = this.props;
    const batteryModel = this.props.batteryModels.find(bm => bm.model === this.props.model);
    let content = null;
    if (batteryModel) {
      const { name, fullwarrenty, proratawarrenty, landingprice, mrp, stock, ah } = batteryModel;
      content = (
        <Typography>
          Name: {name}
          <br />
          Full Warrenty: {fullwarrenty} months
          <br />
          Prorata Warrenty: {proratawarrenty} months
          <br />
          Landing Price: {landingprice} INR
        < br />
          MRP: {mrp} INR
          < br />
          Stock: {stock}
          <br />
          AH: {ah}
        </Typography >
      );
    }

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography type="headline" component="h5">
              {model}
            </Typography>
            {content}
          </CardContent>
          <CardActions>
            <Button dense>Learn More</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

BatteryModelCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    batteryModels: state.batteryModels
  }
}

export default withStyles(styles)(connect(mapStateToProps)(BatteryModelCard));