import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { getDocs, collection, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    const q = query(collection(db, 'invoices'), where('uid', "==", localStorage.getItem('uid')));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setInvoices(data);
    setLoading(false);
  };

  const deleteInvoice = async (id) => {
    const c = window.confirm("Are you sure that you want to delete?");
    if (c) {
      try {
        await deleteDoc(doc(db, 'invoices', id));
        getData();
      } catch {
        window.alert('Something went wrong');
      }
    }
  };

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <i style={{ fontSize: 30 }} className="fa-solid fa-sync fa-spin"></i>
        </div>
      ) : (
        <div>
          {invoices.length > 0 ? (
            invoices.map(data => (
              <div className='box' key={data.id}>
                <p>{data.to}</p>
                <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
                <p>Rs. {data.total}</p>
                <button onClick={() => { deleteInvoice(data.id) }} className='del-button'>
                  <i className="fa-solid fa-trash"></i> Delete
                </button>
                <button onClick={() => { navigate('/dashboard/invoice-make', { state: data }) }} className='del-button view-button'>
                  <i className="fa-solid fa-eye"></i> Preview
                </button>
              </div>
            ))
          ) : (
            <div className='no-invoice-wrapper'>
              <p>You have no invoices at the moment.</p>
              <button onClick={() => { navigate('/dashboard/new-invoice') }}>Create New Invoice</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Invoices;
