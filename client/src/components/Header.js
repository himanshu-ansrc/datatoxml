import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';

const styles = theme => ({
});

class Header extends Component{
      render(){
          const {classes} = this.props;
          return(
            <header>
              <AppBar>
                <Toolbar>
                 <Grid container direction="row" justify="center" alignItems="center" spacing={24}>
                   <Grid item xs={6}>
                      <Typography color="inherit">
                      </Typography>
                   </Grid>
                 </Grid>
                </Toolbar>
              </AppBar>
            </header>
          )
      }
}


export default withStyles(styles)(Header);
//export default withStyles(styles)(Header);
