
import { AccountProvider } from './context/AccountContext'
import { Navbar } from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PageCreateAccountScreen } from './pages/PageCreateAccountScreen'
import { Footer } from './components/Footer'
import { PageTransferScreen } from './pages/PageTransferScreen'




function App() {


  return (
    <>
      <div className="container mx-auto px-10">
        <AccountProvider>
          <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path='/' element={<PageCreateAccountScreen />}></Route>
                <Route path='/pageTransferScreen' element={<PageTransferScreen />}></Route>
              </Routes>
          <Footer/>
          </BrowserRouter>
        </AccountProvider>
       </div>
    </>
  )
}

export default App
