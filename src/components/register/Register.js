import React, { useRef, useState } from 'react'
import '../login/login.css'
import {Link,useNavigate} from 'react-router-dom'
import {auth,storage,db} from '../../firebase'
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {getDownloadURL, ref,uploadBytes} from 'firebase/storage'
import {doc,setDoc} from 'firebase/firestore'
const Register = () => {
    const fileRef=useRef(null)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [file,setFile]=useState(null)
    const [displayName,setDisplayName]=useState('')
    const [imageUrl,setImageUrl]=useState(null)
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate();
    const onSetFile=(e)=>{
      setFile(e.target.files[0])
      setImageUrl(URL.createObjectURL(e.target.files[0]))
    }
    const submitHandler =(e)=>{
      e.preventDefault()
      setLoading(true);
      console.log(email,password)
      createUserWithEmailAndPassword(auth,email,password)
      .then(newUser=>{
        
        console.log(newUser)
        if (file) {
          const date = new Date().getTime();
          const storageRef = ref(storage, `${displayName + date}`);

          uploadBytes(storageRef, file)
              .then(() => {
                  return getDownloadURL(storageRef);
              })
              .then((downloadedUrl) => {
                  console.log(downloadedUrl);
                  updateProfile(newUser.user,{
                    displayName:displayName,
                    photoURL:downloadedUrl
                  })
                  setDoc(doc(db,"users",newUser.user.uid),{
                    uid:newUser.user.uid,
                    displayName:displayName,
                    email:email,
                    photoURL:downloadedUrl

                  })
                  setLoading(false);
                  navigate('/dashboard')
                 
                  localStorage.setItem('cName',displayName)
       localStorage.setItem('photoUrl',downloadedUrl)
       localStorage.setItem('email',newUser.user.email)
       localStorage.setItem('uid',newUser.user.uid)
              })
              .catch((err) => {
                  console.log('Error getting download URL:', err);
              });
      }
      }).catch(err=>{
        setLoading(false);
        console.log(err)
      })
    }
  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <div className='login-left'>

        </div>
        <div className='login-boxes login-right'>
              <h2 className='login-heading'>Register</h2>
              <form onSubmit={submitHandler} >
                <input required onChange={(e)=>{setEmail(e.target.value)}}className='login-input' type='Email' placeholder='Email'/>
                <input required onChange={(e)=>{setDisplayName(e.target.value)}}className='login-input' type='text' placeholder='Company Name'/>
                <input required onChange={(e)=>{setPassword(e.target.value)}} className='login-input' type ='password' placeholder='PassWord'/>
                <input required onChange={(e)=>{onSetFile(e)}} style={{display:'none'}} className='login-input' type='file' ref={fileRef}/>
                <input required className='login-input' type='button' value='select your company logo' onClick={()=>{fileRef.current.click()}}/>
                {imageUrl!=null&&<img className='image-preview' src={imageUrl} alt='preview'/>}
                <button className='login-input login-btn' type='submit'>{loading&& <i class="fa-solid fa-sync fa-spin"></i>} Submit</button>
              </form>
              <Link to ='/login'className='register-link'>Login with your account</Link>
        </div>
      </div>
    </div>
  )
}

export default Register