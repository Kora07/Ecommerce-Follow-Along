import React from 'react'
import "../index.css"

function home() {
    return (
        <>
            {/* <div className="container">
                <div className="leftSide">
                    <h2> HELLO THERE </h2>
                </div>
                <div className="rightSide">
                    Nah
                </div>
            </div> */}

            <div className="buttoners">
                <a href="/login">
                    <button className="px-6 py-2 text-white bg-blue-600 rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300">
                        Log In
                    </button>
                </a>
                <a href="/sign-up">
                    <button className="px-6 py-2 text-white bg-blue-600 rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300">
                        Sign Up
                    </button>
                </a>
            </div>
        </>
    )
}

export default home;
