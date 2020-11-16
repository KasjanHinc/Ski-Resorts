import React, { useState } from 'react'
import axios from 'axios'

const JoinUs = (props) => {


  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  function handleChange(event) {

    const name = event.target.name

    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    const newErrors = {
      ...errors,
      [name]: ''
    }

    updateFormData(data)
    updateErrors(newErrors)
  }

  function handleSubmit(event) {

    event.preventDefault()

    axios.post('/api/joinus', formData)
      .then(resp => {
        console.log(resp.data)
        if (resp.data.errors) {
          updateErrors(resp.data.errors)
        } else {
          props.history.push('/login')
        }
      })

  }

  console.log(formData)

  return <div className="container container-custom">

    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <input
          className="form-control"
          placeholder="Username"
          type="text"
          onChange={handleChange}
          value={formData.username}
          name="username"
        />
        {errors.username && <p style={{ color: 'red' }}>
          {`There was a problem with your ${errors.username.path}`}
        </p>}
      </div>

      <div className="form-group">
        <input
          className="form-control"
          placeholder="Email"
          type="text"
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
        {errors.email && <p style={{ color: 'red' }}>
          {`There was a problem with your ${errors.email.path}`}
        </p>}
      </div>

      <div className="form-group">
        <input
          className="form-control"
          placeholder="Password"
          type="Password"
          onChange={handleChange}
          value={formData.password}
          name="password"
        />
        {errors.password && <p style={{ color: 'red' }}>
          {`There was a problem with your ${errors.password.path}`}
        </p>}
      </div>

      <div className="form-group">
        <input
          className="form-control"
          placeholder="Confirm Password"
          type="password"
          onChange={handleChange}
          value={formData.passwordConfirmation}
          name="passwordConfirmation"
        />
        {errors.passwordConfirmation && <p style={{ color: 'red' }}>
          {'Does not match password'}
        </p>}
      </div>

      <button className="btn btn-primary">Submit</button>

    </form>

  </div>

}

export default JoinUs