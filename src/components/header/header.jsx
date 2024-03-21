import React, {useState} from 'react';

const Header = () => {
    const actions = ["Accueil", "A propos", "Contact", "Connexion", "Inscription"]
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleBtnClick = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className={"flex flex-row items-center justify-between border"}>
            <button className={"flex md:hidden"} onClick={handleBtnClick}>
                H
            </button>
            <h1>photo</h1>
            {/*<div className={`absolute top-0 md:relative bg-gray-700 h-screen w-full flex flex-col justify-between  ${isMenuOpen ? " md:justify-center md:flex-row ":"hidden md:flex md:flex-row"} `}>*/}
            <div className={`${isMenuOpen ? "absolute bg-white left-0 top-0 w-full h-screen z-10 flex flex-col justify-between border" : "hidden md:relative md:flex md:flex-row md:justify-center md:gap-2"}`}>
                <div className={"flex justify-between "}>
                    <h1 className={" flex-1 text-center "}/>
                    <h1 className={"flex-1 text-center md:hidden "}>TITRE ET LOGO</h1>
                    <h1 className={"flex-1 text-center underline md:hidden"} onClick={handleBtnClick}>Fermer</h1>
                </div>
                {actions.map((action) => {
                    return <h2 className={"mx-2 underline"}>{action}</h2>
                })}
            </div>

            <div className={"flex group relative flex-row items-center "}>
                <h2>username</h2>
                <div className="">
                    <label className=""><img src="https://picsum.photos/50/50" alt={"p-2"}/></label>
                    <ul className="hidden group-hover:flex absolute w-full left-0 gap-2 flex-col">
                        <li className={"hover:bg-gray-700 rounded-md p-1"}><a>Item 1</a></li>
                        <li className={"hover:bg-gray-700 rounded-md p-1"}><a>Item 2</a></li>
                        <li className={"hover:bg-gray-700 rounded-md p-1"}><a>Item 3</a></li>
                        <li className={"hover:bg-gray-700 rounded-md p-1"}><a>Item 4</a></li>
                        <li className={"hover:bg-gray-700 rounded-md p-1"}><a>Item 5</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;