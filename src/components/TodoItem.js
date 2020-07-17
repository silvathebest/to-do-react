import React, {useContext} from "react";
import Context from "../context";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%'
  },
}));

const TodoItem = ({ todo, id }) => {
  const classes = useStyles()

  const { toggleTodo, editTodo, deleteTodo } = useContext(Context)

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          checked={ todo.completed }
          edge="start"
          tabIndex={ -1 }
          onChange={ () => toggleTodo(id) }
        />
      </ListItemIcon>
      <TextField className={ classes.input } defaultValue={ todo.title } onBlur={ (event) => editTodo(event, id) }/>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={ () => deleteTodo(id) }>
          <DeleteIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
export default TodoItem
