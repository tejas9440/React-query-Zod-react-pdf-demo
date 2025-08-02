import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../App.css'

export default function MainLayout() {
    return (
        <>
            <div>
                <ul className='header'>
                    <li>
                        <NavLink to={'/'}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/rq'}>React Query Data</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/zodForm'}>ZodForm</NavLink>
                    </li>
                </ul>

            </div>
            <Outlet />
        </>
    )
}
