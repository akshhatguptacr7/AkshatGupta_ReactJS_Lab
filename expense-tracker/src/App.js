import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/ExpenseList';
import AddExpensePage from './components/AddItemFOrm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/add' element={<AddExpensePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
