import React from 'react'

export default function Form (props) { 
  const {
    values,
    onSubmit,
    onInputChange,
    onCheckboxChange,
    disabled,
    errors,        
  } = props
    
  return (
    <form onSubmit={onSubmit}>
      <div>
          <h2>Add a User</h2>

          <button disabled={disabled}>submit</button>

          <div>
              <div>{errors.name}</div>
              <div>{errors.email}</div>
              <div>{errors.password}</div>
              <div>{errors.spiritAnimal}</div>
              <div>{errors.tos}</div>
          </div>
      </div>

      <div>
        <h4>General Information</h4>

        <label>Name&nbsp;
            <input 
                value={values.name}
                onChange={onInputChange}
                name='name'
                type='text'
            />
        </label>
        
        <br></br>
        <br></br>

        <label>Email&nbsp;
            <input 
                value={values.email}
                onChange={onInputChange}
                name='email'
                type='email'
            />
        </label>

        <br></br>
        <br></br>

        <label>Password&nbsp;
            <input 
                value={values.password}
                onChange={onInputChange}
                name='password'
                type='password'
            />
        </label>

        <br></br>
        <br></br>

        <label>Spirit Animal&nbsp;
            <input 
                value={values.spiritAnimal}
                onChange={onInputChange}
                name='spiritAnimal'
                type='text'
            />
        </label>

        <br></br>
        <br></br>

        <label>I Agree to the Legalese BS&nbsp;
            <input 
                value={values.tos}
                onChange={onCheckboxChange}
                name='tos'
                type='checkbox'
            />
        </label>

      </div>
    </form>
  )
}