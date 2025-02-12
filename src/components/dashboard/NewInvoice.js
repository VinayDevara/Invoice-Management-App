import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {db} from '../../firebase.js'
import { Timestamp,collection,addDoc } from 'firebase/firestore'
const NewInvoice = () => {
  const [to, setTo] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState(1)
  const[total,setTotal]=useState(0)
  const[loading,setLoading]=useState(false)
  const [product, setProduct] = useState([
    //      {id:0,name:'laptop',price:72000,qty:2},
    //      {id:1,name:'phone',price:7200,qty:1},
    //      {id:2,name:'ear pods',price:720,qty:3}
  ])
  const navigation=useNavigate()
  const addProduct = () => {
    setProduct([...product, { 'id': product.length, 'name': name, 'price': price, 'qty': qty }])
    const t=qty*price
    setTotal(total+t)
    setName('')
    setPrice('')
    setQty(1)
  }
  const saveData= async ()=>{
    setLoading(true);
     await addDoc(collection(db,'invoices'),{
      to:to,
      phone:phone,
      address:address,
      product:product,
      total:total,
      uid:localStorage.getItem('uid'),
      date:Timestamp.fromDate(new Date())

     })
     navigation('/dashboard/invoices')
     setLoading(false);
  }
  return (
    <div>
      <div className='header-row'>
      <p className='new-invoice-heading'>New Invoice</p>
      <button onClick={saveData} className='add-btn' type='button'>{loading&&<i class="fa-solid fa-sync fa-spin"></i>} Save Data</button>
      </div>
      
      <form className='new-invoice-form'>
        <div className='first-row'>
          <input onChange={(e) => { setTo(e.target.value) }} placeholder='To' value={to} />
          <input onChange={e => { setPhone(e.target.value) }} placeholder='phone' value={phone} />
          <input onChange={e => { setAddress(e.target.value) }} placeholder='Address' value={address} />
        </div>

        <div className='first-row'>
          <input onChange={e => { setName(e.target.value) }} placeholder='product name' value={name} />
          <input onChange={e => { setPrice(e.target.value) }} placeholder='price' value={price} />
          <input onChange={e => { setQty(e.target.value) }} type="number" placeholder='quantity' value={qty} />

        </div>
        <button onClick={addProduct} className='add-btn' type='button'>Add Product</button>
      </form>
      {product.length>0&&<div className='product-wrapper'>
        <div className='product-list'>
          <p>S.No</p>
          <p>Product Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total Price</p>
        </div>
        <hr style={{height:'2px'}}></hr>
        <br></br>
        {
          product.map((data, index) => (
            <div className='product-list' key={index}>
              <p>{index + 1}</p>
              <p>{data.name}</p>
              <p>{data.price}</p>
              <p>{data.qty}</p>
              <p>{data.qty*data.price}</p>
            </div>
          ))


        }
        <div className='total-wrapper'>
           <p>Total:{total}</p>
          
           </div>
      </div>
}
    </div>
  )
}

export default NewInvoice