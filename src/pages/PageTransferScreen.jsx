import React from 'react'
import { TransferScreen } from '../components/TransferScreen'
import { TransactionHistoryScreen } from '../components/TransactionHistoryScreen'

export const PageTransferScreen = () => {
  return (
      <div className="mx-auto max-w-4xl px-4 py-8">
          <TransferScreen/>
          <TransactionHistoryScreen/>
      </div>
  )
}
