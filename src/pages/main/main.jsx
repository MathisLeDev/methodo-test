import React from 'react';
import {Link} from "react-router-dom";

const Main = () => {
    const date = new Date("2021-09-01T00:00:00.000Z")
    console.log(date)
    return (
        <div className={"flex-1 border flex flex-col min-h-screen" }>
            <div className={" flex flex-col m-auto"}>
                <h1>Main page</h1>
                <h2>Following page are already setup</h2>
                <div className={"border p-"}>
                    <ul>
                        <li className={"underline"}>
                        <Link to={"/login"}>
                            /login
                        </Link>
                        </li>
                        
                        <li className={"underline"}>
                        <Link to={"/Atelier"}>
                            /Atelier
                        </Link>
                        </li>

                        <li className={"underline"}>
                            <Link to={"/login"}>
                                /main
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Main;
