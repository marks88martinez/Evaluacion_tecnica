import React, { useState } from 'react'
import { useAccountContext } from '../context/AccountContext';

export const CreateAccountScreen = () => {

    const {addAccount} = useAccountContext();

    const [username, setUsername] =  useState('');
    const [balance, setBalance] = useState(50000);


    
    const [message, setMessage] = useState('');


    const handleSubmit = e => {
        e.preventDefault();


          // Validar que el saldo no sea 0 o negativo
          if(parseFloat(balance) <= 0) {
            setMessage('El saldo inicial debe ser mayor que 0');
            setTimeout(() => {
                setMessage('');
              }, 3000);
          
            return;
        }
       
        addAccount(username, balance);

        setMessage(
            <>
                ¡Cuenta creada con éxito! 
                <a href="/PageTransferScreen" className="text-blue-600 hover:underline ml-2">Realizar - Transferencias</a>
            </>
        );
        
        setTimeout(() => {
            setMessage('');
          }, 3000);
      
        setUsername('');
        setBalance(0);
      };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
          <div className='flex items-center justify-center'>
        <div className='bg-zinc-200 max-w-xl p-10 rounded-md'>
            <h2 className="text-xl font-bold mb-4">Crear Cuenta Bancaria</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text"  
                    placeholder='Nombre de Usuario'
                    value={username}
                    className='w-full bg-zinc-100 px-4 py-2 rounded-md'
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder='Saldo Inicial'
                    value={balance}
                    className='w-full bg-zinc-100 px-4 py-2 rounded-md'
                    onChange={e => setBalance(e.target.value)}
                />
                <button 
                    type='submit'
                    className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                    Crear cuenta
                </button>
            </form>
            {message && (
                        <p className="text-red-600">{message}</p>
                    )}

                {/* {showSuccessMessage && (
                    <p className="text-red-600 mt-4">
                   
                    <a href="/PageTransferScreen" className="text-blue-600 hover:underline ml-2">Realizar - Transferencias</a>
                    </p>
                )} */}
            
        </div>
    </div>
    </div>
  
  )
}
