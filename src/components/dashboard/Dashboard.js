import React from 'react'
import '../dashboard/dashboard.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
const Dashboard = () => {
    const navigate= useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
        localStorage.clear();
        navigate('/login');
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className='dashboard-wrapper'>
      <div className='side-bar'>
        <div className='profile-info'>
          <img src={localStorage.getItem('photoUrl')} />
          <div>
            <p>{localStorage.getItem('cName')}</p>
            <button onClick={logout}>logout</button>


          </div>


        </div>
        <hr />
        <div className='menu'>
          <Link to='/dashboard/home' className='menu-Link'> <i class="fa-solid fa-house"></i> Home</Link>
          <Link to='/dashboard/invoices' className='menu-Link'><i class="fa-solid fa-file-invoice"></i> Invoices</Link>
          <Link to='/dashboard/new-invoice' className='menu-Link'><i class="fa-solid fa-file-circle-plus"></i> New Invoice</Link>
          <Link to='/dashboard/setting' className='menu-Link'><i class="fa-solid fa-gear"></i> Settings</Link>
        </div>
      </div>
      <div className='main-container'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard