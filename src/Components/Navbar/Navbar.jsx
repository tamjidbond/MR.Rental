import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"
import app from "./../../Firebase/firebase.init"
import "./Navbar.css"
import { FaCar } from "react-icons/fa"
import { useEffect, useState } from "react";
const Navbar = () => {

    const [profilePic, setProfilePic] = useState("https://cdn4.iconfinder.com/data/icons/user-people-2/48/6-1024.png")
    const auth = getAuth(app)
    const navigate = useNavigate()
    const handleLogOut = () => {
        signOut(auth)
            .then(
                localStorage.removeItem('mrRentalLoginToken'),
                navigate("/login")
            )
            .catch(
                error => {
                    console.error(error.code)
                }
            )
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setProfilePic(user.photoURL || "https://cdn4.iconfinder.com/data/icons/user-people-2/48/6-1024.png");
        }
    }, [auth.currentUser])

    const links = <>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        <li>
            <NavLink to="/rent">Rent</NavLink>
        </li>
        <li>
            <NavLink to="/addListing">Add Listing</NavLink>
        </li>
    </>
    return (
        <div className="navv rounded-lg mb-2">
            <div className="navbar bg-white rounded-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu font-bold menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white border-red-500 border-[1px] rounded-box w-52 py-4">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-2xl">
                        <FaCar></FaCar>
                        Mr.<span className="text-red-500">
                            Rental
                        </span>
                    </a>
                </div>
                <div className="navbar-end hidden text-center lg:flex">
                    <ul className="menu menu-horizontal px-1 font-bold">
                        {links}
                    </ul>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn bg-transparent hover:bg-none btn-ghost btn-circle">
                            <img className="max-h-full rounded-full" src={profilePic} alt="" />
                        </div>
                        <ul tabIndex={0} className="menu right-10 font-bold menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white border-red-500 border-[1px] rounded-box w-52 py-4">
                            <li>
                                <h1 className="text-2xl">Profile</h1>
                            </li>
                            <li className="bg-red-500 text-white rounded-lg">
                                <a className="" onClick={handleLogOut}>Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Navbar;