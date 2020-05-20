import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'

function Login(props) {
  const authContext = useContext(AuthContext)
  const { loginUser, error, clearErrors, isAuthenticated } = authContext

  const [formData, setFormData] = useState({ email: '', password: '' })
  const { email, password } = formData

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    if (error === 'Invalid Credentials') {
      alert(error, 'danger')
      clearErrors()
    }
  }, [error, isAuthenticated, props.history])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email === '' || password === '') {
      alert('Please enter all fields')
    } else {
      loginUser(formData)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <input type='submit' value='Login' />
      </form>
    </div>
  )
}

export default Login