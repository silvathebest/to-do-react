import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";


const TodoItem = ({ todos, value, handleToggle, deleteTodo, editTodo }) => {

  console.log(todos)
  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          checked={ todos.completed }
          edge="start"
          tabIndex={ -1 }
          onChange={ () => handleToggle(value) }
          disableRipple
        />
      </ListItemIcon>
      <TextField defaultValue={ todos.title } onBlur={ (event) => editTodo(event, value) }/>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon onClick={ () => deleteTodo(value) }/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
export default TodoItem
