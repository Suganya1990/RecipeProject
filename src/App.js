import React, { useState } from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import Recipe from './components/Recipe'
import Alert from './components/Alert'
import './App.css'

export const App = () => {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')

  const APP_ID = 'd0e5e69c'
  const APP_KEY = 'b68200da8408146c61dd7f012edcb7b4'
  const API_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  const getData = async () => {
    if (query !== '') {
      const results = await Axios.get(API_URL)
      if (!results.data.more) {
        return setAlert('No recipe found')
      } else {
        setRecipes(results.data.hits)
        setQuery('')
        setAlert('')
      }
    } else setAlert('Please Fill the Form ')
  }
  const onSubmit = (e) => {
    e.preventDefault()
    getData()
  }

  const onChange = (e) => {
    setQuery(e.target.value)
  }
  return (
    <div className='App'>
      <h1>Food Search App</h1>
      <form className='search-form' onSubmit={onSubmit}>
        {alert && <Alert alert={alert} />}
        <input
          type='text'
          placeholder='Search Food'
          autoComplete='off'
          onChange={onChange}
        />
        <input type='submit' value='search' />
      </form>
      <div className='recipes'>
        {recipes !== [] &&
          recipes.map((recipe) => {
            return <Recipe key={uuidv4()} recipe={recipe} />
          })}
      </div>
    </div>
  )
}
export default App
