import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'

function Register(props) {
  const authContext = useContext(AuthContext)
  const { registerUser, error, clearErrors, isAuthenticated } = authContext

  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const { name, email, password } = formData

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/flashcard')
    }
    if (error === 'User already exist') {
      alert(error, 'danger')
      clearErrors()
    }
  }, [error, isAuthenticated, props.history])
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name === '' || email === '' || password === '') {
      alert('Please enter all fields')
    } else {
      registerUser(formData)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            id='name'
            name='name'
            value={formData.name}
            onChange={onChange}
            required
            type='text'
            placeholder='name'
          />
        </div>
        <div className='form-group'>
          <input
            id='email'
            name='email'
            value={formData.email}
            onChange={onChange}
            required
            type='email'
            placeholder='email'
          />
        </div>
        <div className='form-group'>
          <input
            id='password'
            name='password'
            value={formData.password}
            onChange={onChange}
            required
            minLength='5'
            type='password'
            placeholder='password'
          />
        </div>
        <input type='submit' value='Register' />
      </form>
    </div>
  )
}

export default Register
