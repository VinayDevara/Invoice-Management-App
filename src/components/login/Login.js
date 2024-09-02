import React,{ useState } from 'react'
import './login.css'
import {Link,useNavigate} from 'react-router-dom'
import {auth} from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const[loading,setLoading]=useState(false)

  const navigate=useNavigate();
  const submitHandler=(e)=>{
    e.preventDefault();
    setLoading(true)
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user=userCredential.user;
       console.log(user) 
       localStorage.setItem('cName',user.displayName)
       localStorage.setItem('photoUrl',user.photoURL)
       localStorage.setItem('email',user.email)
       localStorage.setItem('uid',user.uid)
       setLoading(false)
       navigate('/dashboard')
    })
    .catch((error)=>{
     console.log(error)
     setLoading(false);
    });
  }
  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <div className='login-left'>

        </div>
        <div className='login-boxes login-right'>
              <h2 className='login-heading'>Login</h2>
              <form onSubmit={submitHandler}>
              <input onChange={(e)=>{setEmail(e.target.value)}}className='login-input' type='Email' placeholder='Email'/>
              <input onChange={(e)=>{setPassword(e.target.value)}} className='login-input' type ='password' placeholder='PassWord'/>
              <button className='login-input login-btn' type='submit'>{loading&& <i class="fa-solid fa-sync fa-spin"></i>} Submit</button>
              </form>
              <Link to ='/register'className='register-link'>Create an account</Link>
        </div>
      </div>
    </div>
  )
}

export default Login