import React from 'react'
import TodoItem from "./TodoItem"
import List from '@material-ui/core/List'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  list: {
    width: '100%'
  },
}))

const TodoList = ({ todos }) => {
  const classes = useStyles()

  return (
    <List className={ classes.list }>
      { todos.map((todo, index) =>
        <TodoItem key={ index } id={ todo.id } todo={ todo }/>) }
    </List>
  )
}

export default TodoList
