import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Form'
import User from './User'
import formSchema from './formSchema'
import axios from 'axios'
import * as Yup from 'yup'

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password:'',
  spiritAnimal: '',
  tos: false,
}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password:'',
  spiritAnimal: '',
}
const initialUsers = []
const initialDisabled = false

function App() {
  const [users, setUsers] = useState([])
  const [formValues, setFormValues ] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
    .then(response => {
      setUsers(response.data.data)
      console.log(response.data)
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
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
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
      
        <Form 
          values={formValues}
          onInputChange={onInputChange}
          onCheckboxChange={onCheckboxChange}
          onSubmit={onSubmit}
          disabled={disabled}
          errors={formErrors}
        />

        {
          users.map(user => {
            return (
              <User key={user.id} details={user} />
            )
          })
        }

    </div>
  );
}

export default App