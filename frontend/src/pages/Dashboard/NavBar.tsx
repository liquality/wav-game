import classNames from "classnames";
type Props = {
  onMenuButtonClick(): void;
};

export const NavBar = (props: Props) => {
  return (
    <nav
      className={classNames({
        "bg-dark": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-[9999] h-20": true, //positioning & styling
      })}
    >
      <div className="container flex flex-wrap justify-between">
        <a
          href="/artist"
          className="dark:text-white flex items-center mainHeaderText"
        >
          WAVGAME_
        </a>

        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col rounded-lg md:flex-row md:mt-0">
            <li>
              <div className="py-4">
                <div className="flex items-center">
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
        <button
          className="md:hidden text-white"
          onClick={props.onMenuButtonClick}
        >
          Open bääääää
        </button>
      </div>
    </nav>
  );
};
