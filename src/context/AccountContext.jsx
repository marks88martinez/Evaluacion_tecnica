import React, { Children, createContext, useContext, useEffect, useState } from 'react'

const AccountContext = createContext();

export const useAccountContext = () => useContext(AccountContext)

export const AccountProvider = ( {children}) => {

    // Estado de Almacenamientos
    const [accounts, setAccounts] = useState(()=>{
        const storedAccounts = localStorage.getItem('accounts');
        return storedAccounts ? JSON.parse(storedAccounts) : [];
    })
    const [transactions, setTransactions] = useState(() => {
        const storedTransactions = localStorage.getItem('transactions');
        return storedTransactions ? JSON.parse(storedTransactions) : [];
      });

    // Add Nueva cuenta
    const addAccount = (username, initialBalance)=>{
        const newAccount = {username, balance: initialBalance};
        setAccounts([...accounts, newAccount]);
    }

    // Funcion para realizar una transferencia entre cuentas 
    const transfer = (fromUsername, toUsername, amount) =>{
        const fromAccount = accounts.find(account => account.username === fromUsername);
        const toAccount = accounts.find(account=>account.username === toUsername);

        if (!fromAccount || !toAccount) {
        console.error('Cuenta no encontrada');
        return;
        }
      
        if (fromAccount.balance < amount) {
        console.error('Saldo insuficiente');
        return;
        }
        const updateAccount = accounts.map(account => {
            if (account.username === fromUsername) {
                return {...account, balance: parseFloat(account.balance)- amount};
            }else if (account.username === toUsername){
                return { ...account, balance: parseFloat(account.balance)+ amount};
            }
            return account;
        });

        setAccounts(updateAccount);

        // registrar Transferencia en el historial de transacciones

        const newTransaction = { fromUsername, toUsername, amount, date: new Date()}
        setTransactions([...transactions, newTransaction])

        //UserEffect para actualizar el almacenamiento local cuando las cuentas y las transacciones
    
    };
    useEffect(() => {
        localStorage.setItem('accounts', JSON.stringify(accounts));
      }, [accounts]);
      
    useEffect(()=>{
        localStorage.setItem('transactions', JSON.stringify(transactions));
    },[transactions])

  return (
    <AccountContext.Provider value={{accounts, addAccount, transfer, transactions}}>
        {children}
    </AccountContext.Provider>
  )
}
