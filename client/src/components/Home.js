import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Fillinblanks from './QuestionTypes/Fillinblanks';
import Multiplechoise from './QuestionTypes/Multiplechoise';
import Truefalse from './QuestionTypes/Truefalse';
import Header from './Header'

import {connect} from 'react-redux'
import * as actions  from '../actions'

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
    },
    verticalDivider: {
       marginTop: 25
    }
});

class Login extends Component{
      constructor(){
         super();
         this.state = {
            ques_type: "tf",
            meta: {},
            loadtypeofdata : 1 //1-truefalse 2-fillinblanks 3- Multiplechoise
         }
      }
      componentDidMount(){
         this.props.jsondata.ques_type = "tf"
      }
      handleChange = event => {
        let qType = event.target.value=="tf"? 1: (event.target.value=="fib"? 2: 3);
        this.props.jsondata.ques_type = qType;
        this.setState({
          [event.target.name]: event.target.value,
          loadtypeofdata: qType
        });
      };
      exportXML = (e)=>{
          let a = this.props.jsondata;
          console.log(a);
          // let dataToXml = {};
          // for(let x in a){
          //     if(x!='loadtypeofdata'){
          //         let y = a[x].match(/\w+:(\/?\/?).+(.jpg|png)/g);
          //            if(y){
          //               let k = false;
          //               y.map(e=>{
          //                 if(k){
          //                    k = k.replace(e, `<img><href>${e}</href></img>`);
          //                 }else
          //                    k = a[x].replace(e, `<img><href>${e}</href></img>`);
          //               })
          //               dataToXml[x] = k;
          //            }else {
          //                  dataToXml[x] = a[x];
          //            }
          //     }
          // }
          this.props.dataToXml(a, (res)=>{
            let downloadLink = document.getElementById('downloadxml');
                downloadLink.href = res.url; downloadLink.download = '';
                downloadLink.click();
          });
      }
      render(){
          const {classes} = this.props;
          return(
             <Fragment>
                 <Header/>
                 <Card className={classes.card}>
                   <CardContent>
                     <Typography type="headline" component="h2" className={classes.title}>
                        Export to XML
                     </Typography>
                     <FormControl className={classes.textField}>
                         <InputLabel htmlFor="ques_type">Qustion type</InputLabel>
                         <Select
                           value={this.state.ques_type}
                           onChange={this.handleChange}
                           inputProps={{
                             name:  "ques_type"
                           }}
                         >
                           <MenuItem value="tf">
                             True/False
                           </MenuItem>
                           <MenuItem value='multiple'>Multiple Choise</MenuItem>
                           <MenuItem value='fib'>Fill in blanks</MenuItem>
                         </Select>
                     </FormControl>
                     <TextField id="learning-standard" multiline  rowsMax="20" type="text" label="Learning Standard" name="learning-standard" className={classes.textField} onChange={(e)=>{this.props.jsondata.meta[e.target.name] = e.target.value}} margin="normal"/><br/>
                     <TextField id="concept-type" multiline  rowsMax="20" type="text" label="Concept Type" name="concept-type" className={classes.textField} onChange={(e)=>{this.props.jsondata.meta[e.target.name] = e.target.value}} margin="normal"/><br/>
                     <TextField id="complexity" multiline  rowsMax="20" type="text" label="Complexity" name="complexity" className={classes.textField} onChange={(e)=>{this.props.jsondata.meta[e.target.name] = e.target.value}} margin="normal"/><br/>
                     <TextField id="Depth Of Knowledge Level" multiline  rowsMax="20" type="text" label="Depth Of Knowledge Level" name="depth-of-knowledge-level" className={classes.textField} onChange={(e)=>{this.props.jsondata.meta[e.target.name] = e.target.value}} margin="normal"/><br/>
                     <TextField id="Domain" multiline  rowsMax="20" type="text" label="Domain" name="domain" className={classes.textField} onChange={(e)=>{this.props.jsondata.meta[e.target.name] = e.target.value}} margin="normal"/><br/>
                     <Divider className={classes.verticalDivider}/>
                      {this.state.loadtypeofdata==1 && <Multiplechoise/>}
                      {this.state.loadtypeofdata==2 && <Fillinblanks/>}
                      {this.state.loadtypeofdata==3 && <Truefalse/>}
                    </CardContent>
                     <CardActions className={classes.submitlogin}>
                       <Button color="primary" variant="contained" onClick={this.exportXML} className={classes.submit} component="a">export</Button>
                       <Button color="primary" id="downloadxml" variant="contained" style={{'display': 'none'}} component="a">download</Button>
                     </CardActions>
                 </Card>
             </Fragment>
          )
      }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(state=>state, actions)(withStyles(styles)(Login));
