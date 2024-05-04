import { Link } from "react-router-dom";
import Logo from '../assets/img/H2O-Innovation.svg';

export const Navbar = () => {
  return (
    <nav className="bg-gray-200 my-3 flex justify-between py-5 px-10 rounded-lg">
    <div className="flex items-center text-white font-bold">
        <Link to="/">
        <img src={Logo} alt="Logo" className="w-32 h-auto" />
        </Link>
    </div>
    <div className="flex items-center">
        <ul className="flex space-x-4">
        <li>
            <Link to="/" className="btn-nav">Crear Cuenta</Link>
        </li>
        <li>
            <Link to="/PageTransferScreen" className="btn-nav">Transferencias</Link>
        </li>
        </ul>
    </div>
    </nav>

  )
}
