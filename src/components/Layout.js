import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import TodoList from "./TodoList"
import Context from "../context"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: '50%',
    height: '100%',
    marginTop: '50px',
    boxShadow: '0px 0px 65px 7px rgba(0,0,0,0.44)',
    borderRadius: '10px'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  add: {
    width: '75%',
    paddingRight: '40px',
    marginLeft: '10px',
    marginTop: '10px'
  },
  addBtn: {
    marginTop: '30px',
    width: '15%',
    height: '20%'
  },
  noTask: {
    margin: '20px',
    color: '#3f51b5'
  }
}))

const Layout = () => {
  const classes = useStyles()
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL)
      .then(res => res.data)
      .then(todos => {
        setTodos(todos)
      })
  }, [])

  function toggleTodo(id) {
    const todo = todos.find((item) => item.id === id)
    axios.patch(`${ process.env.REACT_APP_API_URL }/${ id }`, {
      completed: !todo.completed
    }).then(() => {
      setTodos(todos.map(todo => {
        if (todo.id === id) todo.completed = !todo.completed
        return todo
      }))
    }).catch(error => {
      console.log(error)
    })

  }

  const deleteTodo = (id) => {
    axios.delete(`${ process.env.REACT_APP_API_URL }/${ id }`).then(() => {
      setTodos(todos.filter(todo => todo.id !== id))
    }).catch(error => {
      console.log(error)
    })
  }

  const editTodo = (event, id) => {
    if (event.key !== 'Enter') return
    const title = event.target.value
    axios.patch(`${ process.env.REACT_APP_API_URL }/${ id }`, { title }).then(() => {
      setTodos(todos.map(todo => {
        if (todo.id === id) todo.title = title
        return todo
      }))
    }).catch(error => {
      console.log(error)
    })
  }

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    if (!title) return
    await axios.post(process.env.REACT_APP_API_URL, {
      title,
      completed: false
    }).then(res => {
      setTodos(todos.concat([res.data]))
    })
    setTitle('')
  }

  return (
    <Context.Provider value={ { toggleTodo, editTodo, deleteTodo } }>
      <Container className={ classes.container }>
        <form className={ classes.root } onSubmit={ handleSubmit }>
          <TextField
            label='Task'
            onChange={ handleChange }
            value={ title }
            className={ classes.add }
          />
          <Button
            color='primary'
            type='submit'
            className={ classes.addBtn }
            variant='outlined'
          >
            Add
          </Button>
          { todos.length ? (<TodoList todos={ todos }/>) : <p className={ classes.noTask }>No task</p> }
        </form>
      </Container>
    </Context.Provider>
  )
}

export default Layout
