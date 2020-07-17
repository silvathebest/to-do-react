import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TodoList from "./TodoList";
import Button from "@material-ui/core/Button";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '300px',
    },
  },
}));

export default function Container() {
  const classes = useStyles();
  const [todos, setTodos] = React.useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(res => res.data)
      .then(todos => {
        setTodos(todos)
      })
  }, [])

  function toggleTodo(id) {
    const todo = todos.find((item) => item.id === id)
    axios.patch(`http://localhost:5000/todos/${ id }`, {
      completed: !todo.completed
    }).then(() => {
      setTodos(todos.map(todo => {
        if (todo.id === id) todo.completed = !todo.completed
        return todo
      }))
    }).catch(error => {
      console.log(error);
    })

  }

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${ id }`).then(() => {
      setTodos(todos.filter(todo => todo.id !== id))
    }).catch(error => {
      console.log(error)
    })
  }

  const editTodo = (event, id) => {
    const title = event.target.value
    console.log(title)
    axios.patch(`http://localhost:5000/todos/${ id }`, {
      title
    }).then(res => {
      console.log(res)
      setTodos(todos.map(todo => {
        if (todo.id === id) todo.title = title
        return todo
      }))
    }).catch(error => {
      console.log(error);
    })
  }
  let title = ''

  const handleChange = (event) => {
    title = event.target.value;
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title) return
    axios.post(`http://localhost:5000/todos`, {
      title,
      completed: false
    }).then(res => {
      setTodos(todos.map(todo => {
        todos.push(res.data)
      }))
    })

  }

  return (
    <form className={ classes.root } noValidate autoComplete="off" onSubmit={ handleSubmit }>
      <TextField id="standard-basic" label="Standard" onChange={ handleChange }/>
      <Button variant="outlined" color='green' size="small" type="submit">
        Add
      </Button>
      <TodoList todos={ todos } toggleTodo={ toggleTodo } editTodo={ editTodo } deleteTodo={ deleteTodo }/>
    </form>
  );
}
