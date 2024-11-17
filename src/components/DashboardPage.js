import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  const [customerData, setCustomerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterHighSpending = () => {
    const filtered = customerData.filter((customer) => customer.purchase_value > 10000);
    setFilteredData(filtered);
  };
  
  const filterSpendingAndVisits = () => {
    const filtered = customerData.filter(
      (customer) => customer.purchase_value > 10000 && customer.visits <= 3
    );
    setFilteredData(filtered);
  };
  
  const filterNoVisitLast3Months = () => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
    const filtered = customerData.filter(
      (customer) => new Date(customer.purchase_date) < threeMonthsAgo
    );
    setFilteredData(filtered);
  };

  const resetFilter = () => {
    setFilteredData(customerData);
  };

  // console.log('Component is rendering');

  useEffect(() => {
    console.log("reached here");
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/customer'); // Adjust URL if needed
        console.log('Customer Data:', response.data);
        setCustomerData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    
    <div style={{ padding: '20px' }}>

      <h1>Customer Table</h1>

      <div>
        <button onClick={filterHighSpending} style={styles.button}>Spending {'>'} ₹10,000</button>
        <button onClick={filterSpendingAndVisits} style={styles.button}>Spending {'>'} ₹10,000 & Visits ≤ 3</button>
        <button onClick={filterNoVisitLast3Months} style={styles.button}>No Visit in Last 3 Months</button>
        <button onClick={resetFilter} style={styles.button}>Reset Filter</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={styles.header}>Customer ID</th>
            <th style={styles.header}>Name</th>
            <th style={styles.header}>Email</th>
            <th style={styles.header}>Phone</th>
            <th style={styles.header}>Address</th>
            <th style={styles.header}>Purchase Date</th>
            <th style={styles.header}>Customer Value</th>
            <th style={styles.header}>Campaign Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((customer, index) => (
            <tr key={index}>
              <td style={styles.cell}>{customer.customer_id}</td>
              <td style={styles.cell}>{customer.customer_name}</td>
              <td style={styles.cell}>{customer.customer_email}</td>
              <td style={styles.cell}>{customer.customer_phone}</td>
              <td style={styles.cell}>{customer.customer_address}</td>
              <td style={styles.cell}>{customer.purchase_date}</td>
              <td style={styles.cell}>{customer.purchase_value}</td>
              <td style={styles.cell}>{customer.campaign_description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    marginRight: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  header: {
    padding: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#f4f4f4',
  },
  cell: {
    padding: '8px',
    border: '1px solid #ddd',
  },
};

export default DashboardPage;
