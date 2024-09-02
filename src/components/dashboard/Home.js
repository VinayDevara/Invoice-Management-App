import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

const Home = () => {
  const [total, setTotal] = useState(0);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [totalMonthCollection, setTotalMonthCollection] = useState(0);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const q = query(collection(db, 'invoices'), where('uid', "==", localStorage.getItem('uid')));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInvoices(data);
    console.log('home', data);
    getOverallTotal(data);
    getMonthTotal(data);
    monthWiseCollection(data);
  };

  const getOverallTotal = (invoice) => {
    let t = 0;
    invoice.forEach(data => {
      t += data.total;
    });
    setTotal(t);
  };

  const getMonthTotal = (invoice) => {
    let mt = 0;
    invoice.forEach(data => {
      if (new Date(data.date.seconds * 1000).getMonth() === new Date().getMonth()) {
        mt += data.total;
      }
    });
    setTotalMonthCollection(mt);
  };

  const monthWiseCollection = (data) => {
    const chartData = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    data.forEach(d => {
      if (new Date(d.date.seconds * 1000).getFullYear() === new Date().getFullYear()) {
        const month = new Date(d.date.seconds * 1000).toLocaleDateString('default', { month: 'long' });
        chartData[month] += d.total;
      }
    });

    console.log(chartData);
    createChart(chartData);
  };

  const createChart = (chartData) => {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(chartData),
        datasets: [{
          label: 'Month wise Collection',
          data: Object.values(chartData),
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div>
      <div className='home-first-row'>
        <div className='home-box box-1'>
          <h1 className='box-header'>Rs {total}</h1>
          <p className='box-title'>Overall</p>
        </div>
        <div className='home-box box-2'>
          <h1 className='box-header'>{invoices.length}</h1>
          <p className='box-title'>Invoices</p>
        </div>
        <div className='home-box box-3'>
          <h1 className='box-header'>Rs {totalMonthCollection}</h1>
          <p className='box-title'>This Month</p>
        </div>
      </div>
      <div className='home-second-row'>
        <div className='chart-box'>
          <canvas id="myChart"></canvas>
        </div>
        <div className='recent-invoice-list'>
          <h1>Recent Invoice List</h1>
          <div>
            <p>Customer Name</p>
            <p>Date</p>
            <p>Total</p>
          </div>
          {
            invoices.slice(0, 6).map((data) => (
              <div key={data.id}>
                <p>{data.to}</p>
                <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
                <p>{data.total}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
