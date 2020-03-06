import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Login = () => {
    return (
        <div className="container">
            <div className="border rounded bg-white border-gray-300 w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 shadow">
                <div className="p-8 flex flex-col items-center">
                    <div className="text-2xl leading-loose">
                        Login into your account
                    </div>
                </div>
                <form>
                    <div className="mb-4 mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password"> Password </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required />

                    </div>

                    <div className="mb-3">
                        <button type="submit"
                                className="border rounded px-3 py-2 text-white bg-indigo-500 w-full font-bold">Sign in</button>
                    </div>

                    <div className="mb-3">
                        <Link to="/register">Register</Link>
                    </div>

                </form>
            </div>
        </div>
    )
};

export default Login;
