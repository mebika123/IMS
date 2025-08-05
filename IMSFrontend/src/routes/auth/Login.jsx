import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


const Login = () => {
    const { user, login } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState(null)
    const [formError, setFormError] = useState({
        email: [],
        password: [],
    })
    const navigate = useNavigate()

    useEffect(()=>{
        if(user){
            navigate('/dashboard');
        }
    },[user])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        console.log(form);
        try {
            const res = await axios.post('/login', form);
            if (res.data) {
                const { user, token } = res.data
                login(user,token)
                navigate('/dashboard');
            }
            
        }
        catch (err) {
            const errors = err.response?.data?.errors || {};
            setFormError({
                email: errors.email || [],
                password: errors.password || [],
            });

            setError(err.response?.data?.message || 'Something went wrong');
            console.log(formError)
            console.log(error)
        }
    }

    return (
        <div className="h-screen flex">
            <div className="w-1/2 bg-[url('bg_img.png')] bg-cover bg-no-repeat relative">
                <img src="imsImg.png" alt="" className='h-96 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
                <h3 className="text-center mt-14 text-white font-bold text-5xl">Welcome!</h3>

            </div>
            <div className="w-1/2 flex justify-center items-center">
                <div className="border border-gray-400 rounded-xl p-10">
                    <h4 className="font-bold text-3xl mb-3 text-center">Login Here!</h4>

                    <form onSubmit={handleSubmit} >
                        <div className="p-2">
                            <div className='mb-3'>
                                <label htmlFor="email" className='text-[#374151]'>Email</label>
                                <input type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
                                <p className="text-red-500">
                                    {
                                        formError.email[0]
                                    }
                                </p>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password" className='text-[#374151]'>Password</label>
                                <input type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
                                <p className="text-red-500">
                                    {
                                        formError.password[0]
                                    }
                                </p>
                            </div>


                            <div className='text-center '>
                                <input type="submit" value="Login" className='py-2 px-8 rounded-lg bg-darkgreen text-white  mt-1 cursor-pointer' />
                            </div>
                        </div>
                    </form>

                    <p className="text-red-500">
                                    {error}
                                </p>
                    {/* <p className='text-center mt-3'>Don't have account? <Link to='/register' className='text-darkgreen'>Register</Link></p> */}
                </div>
            </div>
        </div>
    )
}

export default Login