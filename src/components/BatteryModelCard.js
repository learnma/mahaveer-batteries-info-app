import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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

function BatteryModelCard(props) {
  const { classes } = props;
  const { name, model, fullwarrenty, proratawarrenty, landingprice, mrp } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>{name}</Typography>
          <Typography type="headline" component="h2">
            {model}
          </Typography>
          <Typography component="p">
            Full Warrenty: {fullwarrenty}
            <br />
            Prorata Warrenty: {proratawarrenty}
            <br />
            Landing Price: {landingprice} INR
            <br />
            MRP: {mrp} INR
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

BatteryModelCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BatteryModelCard);