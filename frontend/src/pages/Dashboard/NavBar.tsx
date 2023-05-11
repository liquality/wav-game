
export const NavBar = () => {
    return (
        <nav className="dark:bg-slate-800 sticky top-0  z-10">
            <div className="container flex flex-wrap justify-between ">
                <a href="/dashboard" className="dark:text-white flex items-center">
                    WAVGAME
                </a>

                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-multi-level"
                >
                    <ul className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
                        <li>
                            <a href="/dashboard" className="dark:text-white block py-2">
                                LOGIN
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};
