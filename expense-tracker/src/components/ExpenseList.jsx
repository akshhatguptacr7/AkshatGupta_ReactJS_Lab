import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [totals, setTotals] = useState({ Rahul: 0, Ramesh: 0 });
  const [settlements, setSettlements] = useState({ Rahul: 0, Ramesh: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:3001/expenses');
        setExpenses(result.data);
        const calculatedTotals = calculateTotals(result.data);
        setTotals(calculatedTotals);
        calculateSettlements(calculatedTotals);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotals = (expenses) => {
    const totals = { Rahul: 0, Ramesh: 0 };
    expenses.forEach(expense => {
      if (totals.hasOwnProperty(expense.name)) {
        totals[expense.name] += expense.amount;
      }
    });
    return totals;
  };

  const calculateSettlements = (totals) => {
    const totalAmount = totals.Rahul + totals.Ramesh;
    const equalShare = totalAmount / 2;

    const settlements = {
      Rahul: equalShare - totals.Rahul,
      Ramesh: equalShare - totals.Ramesh
    };

    setSettlements(settlements);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Expense Tracker</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Payee</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.productPurchased}</td>
              <td>${expense.amount.toFixed(2)}</td> 
              <td>{expense.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5">
      <div className='d-flex justify-content-around'>
      <h4>Total Expenses</h4>
      <Link to={'/add'}>
      <button>Add expense </button>
      </Link>
      </div>
        <p>Rahul: ${totals.Rahul.toFixed(2)}</p>
        <p>Ramesh: ${totals.Ramesh.toFixed(2)}</p>
        <h4>Settlement</h4>
        <p>Rahul owes: ${Math.max(0, -settlements.Rahul).toFixed(2)}</p>
        <p>Ramesh owes: ${Math.max(0, -settlements.Ramesh).toFixed(2)}</p>
        <p>{settlements.Rahul > 0 ? `Rahul should receive ${settlements.Rahul.toFixed(2)} from Ramesh` : `Rahul should pay ${Math.abs(settlements.Rahul).toFixed(2)} to Ramesh`}</p>
        <p>{settlements.Ramesh > 0 ? `Ramesh should receive ${settlements.Ramesh.toFixed(2)} from Rahul` : `Ramesh should pay ${Math.abs(settlements.Ramesh).toFixed(2)} to Rahul`}</p>
      </div>
    </div>
  );
};

export default ExpenseList;
