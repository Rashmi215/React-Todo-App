import React, { Component } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root:{
    margin: "150px 0px 0px 450px",
    padding: 20,
    maxWidth: 400
  },
  btn: {
    margin: "30px 0px 0px 0px"
  },
  form: {
    display: 'flex',
    alignItem: 'baseline',
    justifyContent: 'space-evenly'
  }
};

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
          exercises : [
            { id:1, title: 'Bench Press'},
            { id:2, title: 'Deadlift'},
            { id:3, title: 'Squats'}
          ],
           title: ''
    };
  }

  handleChange = ({ target: {name, value}}) =>{
    this.setState({ [name]: value});
  };

  handleCreate = (e) =>{
    e.preventDefault();

    if(this.state.title){
      this.setState(({ exercises, title }) =>({
        exercises: [
          ...exercises,
          {
            title: title,
            id: Date.now()
          }
        ],
        title: ''
      }));
    }
  };

  handleDelete = (id)=>{
    this.setState(({ exercises}) =>({
      exercises: exercises.filter(ex => ex.id !== id)
    }));
  };

  render() {
    const { title, exercises } = this.state;
    const { classes } = this.props;
     return (
       <Paper className={classes.root}>
           <Typography variant='display1' align='center' color='primary' gutterBottom>
                Exercises
           </Typography>
           <form onSubmit = { this.handleCreate } className={classes.form}>
              <TextField
                 name = 'title'
                 label = 'Exercise'
                 value = {title}
                 onChange = {this.handleChange}
                 margin = 'normal'
              />
              <Button type = 'submit' color = 'primary' variant = 'raised' className={classes.btn}>
                Create
              </Button>
           </form>

           <List>
              {exercises.map(({ id, title }) =>
                <ListItem key={id}>
                   <ListItemText primary={title} />
                   <ListItemSecondaryAction>
                     <IconButton color='primary' onClick= {()=>this.handleDelete(id)}>
                          <Delete />
                     </IconButton>
                   </ListItemSecondaryAction>
                </ListItem>
              )}
           </List>

       </Paper>
     );
   }

}

export default withStyles(styles)(App);
