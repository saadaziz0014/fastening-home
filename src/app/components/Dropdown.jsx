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
        className="flex items-center rounded bg-primary text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none"
        type="button"
        id="dropdownMenuButton1"
        data-twe-dropdown-toggle-ref
        aria-expanded="false"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        {label}
        <span className="w-2 [&>svg]:h-5 [&>svg]:w-5">
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
        className={`p-2 space-y-3 hidden-scrollbar text-sm text-gray-700 absolute rounded-lg z-50 ${
          display == "visible" ? "bg-white h-32 overflow-y-scroll" : "h-0"
        }`}
        aria-labelledby="dropdownCheckboxButton"
      >
        {display === "visible" &&
          data.map((item) => (
            <li key={item} onClick={() => setFilter(item)}>
              <div className="flex items-center">
                <input
                  id="checkbox-item-1"
                  type="checkbox"
                  defaultValue
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700"
                />
                <label
                  htmlFor="checkbox-item-1"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  {item}
                </label>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
