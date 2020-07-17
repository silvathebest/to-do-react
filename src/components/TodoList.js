import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TodoItem from "./TodoItem";

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%'
  },
}));

export default function TodoList({ todos }) {
  const classes = useStyles();

  return (
    <List className={ classes.list }>
      { todos.map((todo, index) =>
        <TodoItem key={ index } id={ todo.id } todo={ todo }/>) }
    </List>
  );
}
