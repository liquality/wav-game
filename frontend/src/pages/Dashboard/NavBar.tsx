import classNames from "classnames";
type Props = {
    onMenuButtonClick(): void;
};

export const NavBar = (props: Props) => {
    return (
        <nav className={classNames({
            "dark:bg-slate-800": true, // colors
            "flex items-center": true, // layout
            "w-full fixed z-10 px-4 shadow-sm h-16": true, //positioning & styling
        })}>
            <div className="container flex flex-wrap justify-between ">
                <a href="/dashboard" className="dark:text-white flex items-center mainHeaderText">
                    WAVGAME_
                </a>

                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-multi-level"
                >
                    <ul className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
                        <li>

                            {/* account  */}
                            <div className="border-t border-t-indigo-800 p-4">
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={
                                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        }
                                        height={36}
                                        width={36}
                                        className="rounded-full"
                                    />
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
                <button className="md:hidden text-white" onClick={props.onMenuButtonClick}>
                    Open
                </button>
            </div>
        </nav>
    );
};
