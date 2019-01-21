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
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

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
    },
    addImageCheck:{
      width: 600,
      margin: 'auto',
      textAlign: 'left'
    },
    verticalDivider: {
       marginTop: 25
    },
});


class Multiplechoise extends PureComponent{
        constructor(){
           super();
           this.state = {
              count : [1, 2],
              options: [],
              showQuestionImage: false,
              feedYesImage: false,
              feedNoImage: false,
              guideImage: false
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
                  <TextField key="option_1" multiline  rowsMax="20" type="text" label="Option 1" name="option-1" className={classes.textField} onChange={(e)=>{this.props.jsondata.question[e.target.name] = e.target.value}} margin="normal"/>,
                  <TextField key="option_2"  multiline  rowsMax="20" type="text" label="Option 2" name="option-2" className={classes.textField} onChange={(e)=>{this.props.jsondata.question[e.target.name] = e.target.value}} margin="normal"/>
                ]
             })
        }
        eletoAdd = (count)=>{
          const {classes} = this.props;
           return(
                <TextField multiline  rowsMax="20" key={`option_${count}`} inputProps={{'data-count': 2}} name={`option-${count}`}  type="text" label={`Option ${count}`} className={classes.textField} onChange={(e)=>{this.props.jsondata.question[e.target.name] = e.target.value}} margin="normal"/>
           )
        }
        addMoreItems = ()=>{
            let ele = this.state.options;
            this.setState({
                options: [...ele, this.eletoAdd(parseInt(ele.length)+1)]
            });
            if(ele.length==4){ document.getElementById('add_more').style.display="none"}
        }
        // checkQuestionImage = (e)=>{
        //     this.setState({
        //        showQuestionImage: e.target.checked
        //     })
        // }
        showHideImageOptions = (e)=>{ this.setState({[e.target.id]: e.target.checked})}
          render(){
             const {classes} = this.props;
             return (
                <Fragment>
                      <TextField id="question-text" multiline  rowsMax="20" type="text" label="Question" name="question-text" className={classes.textField} onChange={(e)=>{this.props.jsondata.question[e.target.name] = e.target.value}} margin="normal"/><br/>
                      <div className={classes.addImageCheck}>
                        <Checkbox
                          onChange={this.showHideImageOptions}
                          color="primary"
                          id="showQuestionImage"
                        />
                        <InputLabel>Include image</InputLabel>
                      </div>
                      {this.state.showQuestionImage && (
                        <Fragment>
                        <TextField id="question-image" multiline  rowsMax="20" type="text" label="Image Url" name="question-text" className={classes.textField} onChange={(e)=>{this.props.jsondata['question-img']['href'] = e.target.value}} margin="normal"/><br/>
                        <TextField id="question-image-des" multiline  rowsMax="20" type="text" label="Image Description" name="question-text" className={classes.textField} onChange={(e)=>{this.props.jsondata['question-img']['description'] = e.target.value}} margin="normal"/><br/>
                        </Fragment>
                      )}
                      <span id="question_hints" data-count="2">
                         {this.state.options.map((ele)=>ele)}
                      </span>
                      <CardActions id="add_more">
                        <Fab color="primary" aria-label="Add" className={classes.submit} onClick={this.addMoreItems}>
                           <AddIcon />
                        </Fab>
                      </CardActions>


                      <TextField id="hint1-text" multiline  rowsMax="20" type="text" label="Hint 1" name="hint1-text" className={classes.textField} onChange={(e)=>{this.props.jsondata.question[e.target.name] = e.target.value}}  margin="normal"/><br/>
                      <TextField id="hint2-text" multiline  rowsMax="20" type="text" label="Hint 2" name="hint2-text" className={classes.textField} onChange={(e)=>{this.props.jsondata.question[e.target.name] = e.target.value}}  margin="normal"/><br/>

                      <Divider className={classes.verticalDivider}/>
                      <div>
                       <TextField id="answer" multiline  rowsMax="20" type="text" label="Answer" name="answer" className={classes.textField} onChange={(e)=>{this.props.jsondata.answer['txt'][e.target.name] = e.target.value}}  margin="normal"/><br/>
                       <TextField id="feedback-yes-text" multiline  rowsMax="20" type="text" label="Feedback Yes Text" name="feedback-yes-text" className={classes.textField} onChange={(e)=>{this.props.jsondata.answer['feedback']['yes'][e.target.name] = e.target.value}}  margin="normal"/><br/>
                       <div className={classes.addImageCheck}>
                         <Checkbox
                           onChange={this.showHideImageOptions}
                           color="primary"
                           id="feedYesImage"
                         />
                         <InputLabel>Include image</InputLabel>
                       </div>
                       {this.state.feedYesImage && (
                         <Fragment>
                         <TextField id="feedyes-image" multiline  rowsMax="20" type="text" label="Image Url" name="question-text" className={classes.textField} onChange={(e)=>{this.props.jsondata.answer['feedback']['yes']['feedback-yes-img']['href'] = e.target.value}} margin="normal"/><br/>
                         <TextField id="feedyes-image-des" multiline  rowsMax="20" type="text" label="Image Description" name="question-text" className={classes.textField} onChange={(e)=>{this.props.jsondata.answer['feedback']['yes']['feedback-yes-img']['description'] = e.target.value}} margin="normal"/><br/>
                         </Fragment>
                       )}
                       <TextField id="feedback-no-text" multiline  rowsMax="20" type="text" label="Feedback No Text" name="feedback-no-text" className={classes.textField} onChange={(e)=>{this.props.jsondata.answer['feedback']['no'][e.target.name] = e.target.value}}  margin="normal"/><br/>
                       <div className={classes.addImageCheck}>
                         <Checkbox
                           onChange={this.showHideImageOptions}
                           color="primary"
                           id="feedNoImage"
                         />
                         <InputLabel>Include image</InputLabel>
                       </div>
                       {this.state.feedNoImage && (
                         <Fragment>
                           <TextField id="feedno-image" multiline  rowsMax="20" type="text" label="Image Url" name="feedno-image" className={classes.textField} onChange={(e)=>{this.props.jsondata.answer['feedback']['no']['feedback-no-img']['href'] = e.target.value}} margin="normal"/><br/>
                           <TextField id="feedno-image-des" multiline  rowsMax="20" type="text" label="Image Description" name="feedno-image-des" className={classes.textField} onChange={(e)=>{this.props.jsondata.answer['feedback']['no']['feedback-no-img']['description'] = e.target.value}} margin="normal"/><br/>
                         </Fragment>
                       )}
                      </div>

                      <Divider className={classes.verticalDivider}/>
                      <TextField id="step-text" multiline  rowsMax="20" type="text" label="Step Text" name="step-text" className={classes.textField} onChange={(e)=>{this.props.jsondata.guide[e.target.name] = e.target.value}}  margin="normal"/><br/>
                      <div className={classes.addImageCheck}>
                        <Checkbox
                          onChange={this.showHideImageOptions}
                          color="primary"
                          id="guideImage"
                        />
                        <InputLabel>Include image</InputLabel>
                      </div>
                      {this.state.guideImage &&
                        <Fragment>
                         <TextField id="step-text-href" multiline  rowsMax="20" type="text" label="Image Url" name="feedback-yes-text" className={classes.textField} onChange={(e)=>{this.props.jsondata.guide['step-img']['href'] = e.target.value}}  margin="normal"/><br/>
                         <TextField id="step-text-description" multiline  rowsMax="20" type="text" label="Image Description" name="feedback-yes-text" className={classes.textField} onChange={(e)=>{this.props.jsondata.guide['step-img']['description'] = e.target.value}}  margin="normal"/><br/>
                        </Fragment>
                      }
                </Fragment>
             )
          }
}

Multiplechoise.propTypes = {
  classes: PropTypes.object.isRequired
}
export default connect(state=>state, actions)(withStyles(styles)(Multiplechoise));
