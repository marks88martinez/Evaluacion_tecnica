import React, { useState } from 'react';
import { useAccountContext } from '../context/AccountContext';

export const TransactionHistoryScreen = () => {
  const { transactions, accounts } = useAccountContext();
  const [filter, setFilter] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    // Filtrar por nombres de usuario
    const fromUsername = transaction.fromUsername.toLowerCase();
    const toUsername = transaction.toUsername.toLowerCase();
    const filterLowerCase = filter.toLowerCase();
    if (fromUsername.includes(filterLowerCase) || toUsername.includes(filterLowerCase)) {
      // Aplicar filtro de cantidad mínima
      if (minAmount !== '' && parseFloat(transaction.amount) < parseFloat(minAmount)) {
        return false;
      }
      // Aplicar filtro de cantidad máxima
      if (maxAmount !== '' && parseFloat(transaction.amount) > parseFloat(maxAmount)) {
        return false;
      }
      // Aplicar filtro por período
      const transactionDate = new Date(transaction.date);
      if ((startDate !== '' && transactionDate < new Date(startDate)) ||
          (endDate !== '' && transactionDate > new Date(endDate))) {
        return false;
      }
      return true;
    }
    return false;
  });

  return (
    <div>
      <div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Historial de transferencias</h2>
          <input 
            type="text" 
            placeholder="Filtrar por Usuarios..." 
            className="w-full bg-zinc-100 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={filter} 
            onChange={e => setFilter(e.target.value)} 
          />
          <div className="flex space-x-4 mt-4">
            <input 
              type="number" 
              placeholder="Monto mínimo" 
              className="w-1/4 bg-zinc-100 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={minAmount} 
              onChange={e => setMinAmount(e.target.value)} 
            />
            <input 
              type="number" 
              placeholder="Monto máximo" 
              className="w-1/4 bg-zinc-100 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={maxAmount} 
              onChange={e => setMaxAmount(e.target.value)} 
            />
            <input 
              type="date" 
              placeholder="Fecha de inicio" 
              className="w-1/4 bg-zinc-100 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={startDate} 
              onChange={e => setStartDate(e.target.value)} 
            />
            <input 
              type="date" 
              placeholder="Fecha de fin" 
              className="w-1/4 bg-zinc-100 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={endDate} 
              onChange={e => setEndDate(e.target.value)} 
            />
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">De</th>
                  <th className="border border-gray-300 px-4 py-2">A</th>
                  <th className="border border-gray-300 px-4 py-2">Cantidad</th>
                  <th className="border border-gray-300 px-4 py-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => {
                  const fromAccount = accounts.find(account => account.username === transaction.fromUsername);
                  const toAccount = accounts.find(account => account.username === transaction.toUsername);
                  return (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2">{fromAccount ? fromAccount.username : 'Cuenta no encontrada'}</td>
                      <td className="py-2">{toAccount ? toAccount.username : 'Cuenta no encontrada'}</td>
                      <td className="py-2">{transaction.amount}</td>
                      <td className="py-2">{transaction.date.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
