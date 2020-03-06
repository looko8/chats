import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Register = () => {
    return (
        <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-gray-200">

            <div className="p-8 flex flex-col items-center">

                <div className="text-2xl leading-loose">
                    Start your free trial
                </div>
                <div className="text-gray-800">
                    <span className="text-gray-700">Or</span> <Link to="/login" className="underline">sign in to your account</Link>
                </div>
            </div>

            <div className="bg-white border rounded border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 shadow">
                <form>
                    <div className="mb-4 mt-2">
                        <label className="block text-gray-700 text-sm mb-1 font-bold" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="name"
                            className="appearance-none border rounded w-full py-1 px-3 bg-gray-100 leading-tight"
                            required
                            autoFocus />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password"> Password </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            minLength={6}
                            required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-confirmation"> Password confirmation </label>
                        <input
                            type="password"
                            id="password-confirmation"
                            name="password_confirmation"
                            required />
                    </div>

                    <div className="mb-4">
                        <button className="border rounded p-2 text-white bg-indigo-500 w-full font-bold hover:bg-indigo-500-dark">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
