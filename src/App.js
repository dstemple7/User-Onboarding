import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Form'
import formSchema from ''
import axios from 'axios'
import * as Yup from 'yup'

const initialFormValues = {
  name: '',
  email: '',
  password:'',
  spiritAnimal: '',
  tos: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password:'',
  spiritAnimal: '',
}
const initialUsers = []
const initialDisabled = true

export default function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues ] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
    .then(response => {
      setUsers(response.data)
    })
    .catch(err => {
      debugger
    })
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      setUsers([...users, res.data])
    })
    .catch(err => {
      debugger
    })
    .finally(()=> {
      setFormValues(initialFormValues)
    })
  }

  const onInputChange = evt => {
    
    const {name, value} = evt.target

    Yup 
    .reach(formSchema, name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors,
        [name]: ""
      })
    })
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0]
      })
    })

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const onCheckboxChange = evt => {
    const {name, checked} = evt.target
    setFormValues({
      ...formValues, 
      [name]: checked,
    })
  }

  const onSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      spiritAnimal: formValues.spiritAnimal.trim(),
      tos: Object.keys(formValues.tos)
        .filter(tosName => (formValues.tos[tosName] === true))
    }
    postNewUser(newUser)
  }

  useEffect(()=>{
    getUsers()
  }, [])

  useEffect(()=> {
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div className="App">
      <header><h1>User Onboarding App</h1></header>
      
        <Form 
          values={formValues}
          onInputChange={onInputChange}
          onCheckboxChange={onCheckboxChange}
          onSubmit={onSubmit}
          disabled={disabled}
          errors={formErrors}
      />
    </div>
  );
}
