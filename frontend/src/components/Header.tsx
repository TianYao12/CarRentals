import {Link} from "react-router-dom"
const Header = () => {
    return(
    <div className="bg-blue-900 py-6">
        <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking-tight">
                <Link to="/">CarRentals.com</Link>
            </span>
            <span className="flex space-x-2">
                <Link to="/sign-in" className="flex items-center text-blue-200 px-3 font-bold rounded-sm hover:text-blue-400">
                    Sign In
                </Link>
            </span>
        </div>
    </div>)
}

export default Header