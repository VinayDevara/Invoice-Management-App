import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import React from 'react';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/dashboard/Home';
import Invoices from './components/dashboard/Invoices';
import NewInvoice from './components/dashboard/NewInvoice';
import Setting from './components/dashboard/Setting';
import InvoiceMaker from './components/dashboard/InvoiceMaker';
function App() {
  const myRouter=createBrowserRouter(
    [
      {path:'',Component:Login},
      {path:'/login',Component:Login},
      {path:'/register',Component:Register},
      {path:'/dashboard',Component:Dashboard,children:[
        {path:'',Component:Home},
        {path:'home',Component:Home},
        {path:'invoices',Component:Invoices},
        {path:'new-invoice',Component:NewInvoice},
        {path:'setting',Component:Setting},
        {path:'invoice-make',Component:InvoiceMaker}
      ]}
    ]
  )
  return (
    <div>
     <RouterProvider router={myRouter}> </RouterProvider>
    </div>
  );
}

export default App;
