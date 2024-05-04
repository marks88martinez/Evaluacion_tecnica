import React, { useState } from 'react'
import { useAccountContext } from '../context/AccountContext';


export const TransferScreen = () => {

    const {accounts, transfer} = useAccountContext();

    const [fromUsername, setFromUsername]= useState('');
    const [toUsername, setToUsername]= useState('');
    const [amount, setAmount]= useState(0);
    const [errorMessage, setErrorMessage]= useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleTransfer = e => {
        e.preventDefault();
        //Encontrar las cuentas de origen y destino correspondientes a los nombres de usuarios
        const fromAccount =  accounts.find(account => account.username ===  fromUsername);
        const toAccount = accounts.find(account => account.username === toUsername);

        if (fromUsername === toUsername) {
            setErrorMessage('No se puede transferir a la misma cuenta');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        if(parseFloat(amount) <= 0) {
            setErrorMessage('El saldo inicial debe ser mayor que 0');
            setTimeout(() => {
                setErrorMessage('');
              }, 3000);
          
            return;
        }

        if (!fromAccount || !toAccount) {
            setErrorMessage('Cuenta no encontrada');
            setTimeout(() => {
                setErrorMessage('');
              }, 3000);
          
            return;
            }

        // Validar si la cantidad ingresada es válida
        const amountValue = parseFloat(amount);
        if (isNaN(amountValue) || amountValue <= 0) {
        setErrorMessage('Ingrese una cantidad válida');
        setTimeout(() => {
            setErrorMessage('');
          }, 3000);
      
        return;
        }

        if (fromAccount.balance < amount) {
            setErrorMessage('Saldo insuficiente');
            setTimeout(() => {
                setErrorMessage('');
              }, 3000);
          
        return;
        }

      
        transfer(fromUsername, toUsername, amountValue);
        if (transfer) {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
              }, 3000);
        }

        setFromUsername('');
        setToUsername('');
        setAmount(0);
        setErrorMessage('');

    }
   
  return (
  
    <div className='flex items-center justify-center'>
    <div className='bg-zinc-200 max-w-xl p-10 rounded-md'>
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4"> Seleccione las Cuentas para la Transferencia</h2>
            {showSuccessMessage && (
                    <p className="text-red-600 mt-4">
                    ¡Transferencia Realizada con éxito! 
                    </p>
                )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleTransfer} className="flex flex-col space-y-4">
                 <select value={fromUsername} onChange={e => setFromUsername(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-md">
                    <option value="">Seleccionar cuenta de origen</option>
                    {/* Mapear sobre las cuentas y mostrar cada nombre de usuario en una opción */}
                    {accounts.map(account => (
                        <option key={account.username} value={account.username}>{account.username} - Saldo: {account.balance}</option>
                    ))}
                 </select>

                {/* Selección de la cuenta de destino */}
                <select value={toUsername} onChange={e => setToUsername(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-md">
                <option value="">Seleccionar cuenta de destino</option>
                {/* Mapear sobre las cuentas y mostrar cada nombre de usuario en una opción */}
                {accounts.map(account => (
                    <option key={account.username} value={account.username}>{account.username} - Saldo: {account.balance}</option>
                ))}
                </select>
                <input type="number"   className='w-full bg-zinc-100 px-4 py-2 rounded-md' placeholder="Cantidad a transferir" value={amount} onChange={e => setAmount(e.target.value)} />

                
                <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Transferir</button>
            </form>
        </div>
      

    </div>
</div>


  )
}
