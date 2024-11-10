export default function Dropdown({
  label,
  data,
  display,
  setDisplay,
  setFilter,
}) {
  const changeDisplay = () => {
    if (display === "hidden" && data.length > 0) {
      setDisplay("visible");
    } else {
      setDisplay("hidden");
    }
  };
  return (
    <div
      className="relative"
      onMouseEnter={changeDisplay}
      onMouseLeave={changeDisplay}
      data-twe-dropdown-ref
    >
      <button
        className="flex items-center rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none"
        type="button"
        id="dropdownMenuButton1"
        data-twe-dropdown-toggle-ref
        aria-expanded="false"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        {label}
        <span className="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      <ul
        className={`absolute right-0 h-20 bg-white border border-black overflow-y-scroll hidden-scrollbar left-6 z-[100] ${display}`}
        aria-labelledby="dropdownMenuButton1"
        data-twe-dropdown-menu-ref
      >
        {data.map((item) => (
          <li
            key={item}
            onClick={() => setFilter(item)}
            className="px-2 py-1 hover:bg-gray-300 hover:cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
