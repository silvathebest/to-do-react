import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TodoItem from "./TodoItem";
import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:5000/';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TodoList({ todos, toggleTodo, editTodo, deleteTodo }) {
  const classes = useStyles();

  return (
    <List className={ classes.root }>
      { todos.map((value, index) =>
        <TodoItem key={ index } value={ value.id } handleToggle={ toggleTodo } deleteTodo={ deleteTodo }
                  todos={ value } editTodo={ editTodo }/>) }
    </List>
  );
}
