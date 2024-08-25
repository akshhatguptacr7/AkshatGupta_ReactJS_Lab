import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [payer, setPayer] = useState('Person A');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount && date && payer) {
      const newExpense = { description, amount: parseFloat(amount), date, payer };
      axios.post('http://localhost:3001/expenses', newExpense)
        .then(() => navigate('/'))
        .catch(error => console.error('Error adding expense:', error));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Payer:</label>
          <select
            className="form-control"
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
          >
            <option value="Person A">Person A</option>
            <option value="Person B">Person B</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
