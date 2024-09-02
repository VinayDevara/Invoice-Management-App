import React, { useRef, useState } from 'react'
import { storage, auth, db } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

const Setting = () => {
  const fileRef = useRef(null)
  const [email, setEmail] = useState(localStorage.getItem('email'))
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [displayName, setDisplayName] = useState(localStorage.getItem('cName'))
  const [imageUrl, setImageUrl] = useState(localStorage.getItem('photoUrl'))

  const onSetFile = (e) => {
    setFile(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  const updateCompanyName = () => {
    if (!displayName || displayName.trim() === '') {
      console.error('Invalid displayName: cannot be undefined or empty.');
      return;
    }
    updateProfile(auth.currentUser, {
      displayName: displayName
    })
      .then(() => {
        localStorage.setItem('cName', displayName)
        updateDoc(doc(db, "users", localStorage.getItem('uid')), {
          displayName: displayName
        })
          .then(() => {
            window.location.reload()
          })
          .catch(err => {
            console.log(err);
          })
      })
  }

  const updateLogo = () => {
    const fileRe = ref(storage, localStorage.getItem('photoUrl'))
    console.log(fileRe._location.path_)
    const storageRef = ref(storage, fileRe._location.path_);
    uploadBytes(storageRef, file)
      .then(result => {
        window.location.reload();
      })
  }

  return (
    <div>
      <p>Setting</p>
      <div className='setting-wrapper'>
        <div className='profile-info update-cName'>
          <img onClick={() => { fileRef.current.click() }} className='pro' alt='profile-pic' src={imageUrl} />
          <input onChange={(e) => { onSetFile(e) }} style={{ display: 'none' }} type='file' ref={fileRef} />
          {file && <button onClick={() => { updateLogo() }} style={{ width: '30%', padding: '10px', backgroundColor: 'hotpink' }}>Update Profile Pic</button>}
        </div>

        <div className='update-cName'>
          <input onChange={e => { setDisplayName(e.target.value) }} type='text' placeholder='Company Name' value={displayName} />
          <button onClick={() => { updateCompanyName() }}>Update Company Name</button>
        </div>
      </div>
    </div>
  )
}

export default Setting
