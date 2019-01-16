import React, {PureComponent, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {connect} from 'react-redux'
import * as actions  from '../../actions'

const styles = theme => ({
    card:{
       maxWidth: 800,
       margin: 'auto',
       marginTop: '100px',
       textAlign: 'center'
    },
    textField: {
        width: 600
    },
    submit: {
      margin: 'auto',
      marginBottom: 5
    },
    submitlogin:{
      paddingBottom: 20,
      borderBottom: '1px solid #e3e3e3'
    },
    closeButton:{
       position: 'absolute',
       verticalAlign: 'bottom'
    }
});


class Multiplechoise extends PureComponent{
        constructor(){
           super();
           this.state = {
              count : [1, 2],
              options: []
           }
        }
        componentDidMount(){
           this.prevElements();
        }
        exportXML = (e)=>{
            let a = this.state;
            let dataToXml = {};
            // console.log(a);
            for(let x in a){
                if(x!='count' && x!='options'){
                    let y = a[x].match(/\w+:(\/?\/?).+(.jpg|png)/g);
                       if(y){
                          let k = false;
                          y.map(e=>{
                            if(k){
                               k = k.replace(e, `<img><href>${e}</href></img>`);
                            }else
                               k = a[x].replace(e, `<img><href>${e}</href></img>`);
                          })
                          dataToXml[x] = k;
                       }else {
                             dataToXml[x] = a[x];
                       }
                }
            }
            this.props.dataToXml(dataToXml, (res)=>{
              let downloadLink = document.getElementById('downloadxml');
                  downloadLink.href = res.url; downloadLink.download = '';
                  downloadLink.click();
            });
        }
        prevElements = ()=>{
             const {classes} = this.props;
             this.setState({
                options: [
                  <TextField key="option_1" multiline  rowsMax="20" type="text" label="Option 1" name="Option1" className={classes.textField} onChange={(e)=>{this.props.jsondata.question[e.target.name] = e.target.value}} margin="normal"/>,
                  <TextField key="option_2"  multiline  rowsMax="20" type="text" label="Option 2" name="Option2" className={classes.textField} onChange={(e)=>{this.props.jsondata.question[e.target.name] = e.target.value}} margin="normal"/>
                ]
             })
        }
        eletoAdd = (count)=>{
          const {classes} = this.props;
           return(
                <TextField multiline  rowsMax="20" key={`option_${count}`} inputProps={{'data-count': 2}} name={`option${count}`}  type="text" label={`Option ${count}`} className={classes.textField} onChange={(e)=>{this.props.jsondata.question[e.target.name] = e.target.value}} margin="normal"/>
           )
        }
        addMoreItems = ()=>{
            let ele = this.state.options;
            this.setState({
                options: [...ele, this.eletoAdd(parseInt(ele.length)+1)]
            });
            if(ele.length==4){ document.getElementById('add_more').style.display="none"}
        }
          render(){
             const {classes} = this.props;
             return (
                <Fragment>
                      <TextField id="question-text" multiline  rowsMax="20" type="text" label="Question" name="question-text" className={classes.textField} onChange={(e)=>{this.props.jsondata.question[e.target.name] = e.target.value}} margin="normal"/><br/>
                      <span id="question_hints" data-count="2">
                         {this.state.options.map((ele)=>ele)}
                      </span>
                      <CardActions id="add_more">
                        <Fab color="primary" aria-label="Add" className={classes.submit} onClick={this.addMoreItems}>
                           <AddIcon />
                        </Fab>
                      </CardActions>
                </Fragment>
             )
          }
}

Multiplechoise.propTypes = {
  classes: PropTypes.object.isRequired
}
export default connect(state=>state, actions)(withStyles(styles)(Multiplechoise));
