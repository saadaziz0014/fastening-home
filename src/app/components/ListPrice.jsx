export default function ListPrice() {
  let data = [
    {
      svg: (
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99977 6.66667V10M9.99977 13.3333H10.0081M8.57477 2.38334L1.51644 14.1667C1.37091 14.4187 1.29391 14.7044 1.2931 14.9954C1.29228 15.2865 1.36768 15.5726 1.5118 15.8254C1.65591 16.0783 1.86371 16.289 2.11453 16.4366C2.36535 16.5841 2.65044 16.6635 2.94144 16.6667H17.0581C17.3491 16.6635 17.6342 16.5841 17.885 16.4366C18.1358 16.289 18.3436 16.0783 18.4878 15.8254C18.6319 15.5726 18.7073 15.2865 18.7065 14.9954C18.7056 14.7044 18.6286 14.4187 18.4831 14.1667L11.4248 2.38334C11.2762 2.13843 11.067 1.93594 10.8174 1.79541C10.5678 1.65488 10.2862 1.58105 9.99977 1.58105C9.71333 1.58105 9.43172 1.65488 9.18211 1.79541C8.93251 1.93594 8.72333 2.13843 8.57477 2.38334Z"
            stroke="#FDB022"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Orders",
      value: "lorem ipsum dolor sit amet consectetur adipiscing elit",
    },
    {
      svg: (
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99977 6.66667V10M9.99977 13.3333H10.0081M8.57477 2.38334L1.51644 14.1667C1.37091 14.4187 1.29391 14.7044 1.2931 14.9954C1.29228 15.2865 1.36768 15.5726 1.5118 15.8254C1.65591 16.0783 1.86371 16.289 2.11453 16.4366C2.36535 16.5841 2.65044 16.6635 2.94144 16.6667H17.0581C17.3491 16.6635 17.6342 16.5841 17.885 16.4366C18.1358 16.289 18.3436 16.0783 18.4878 15.8254C18.6319 15.5726 18.7073 15.2865 18.7065 14.9954C18.7056 14.7044 18.6286 14.4187 18.4831 14.1667L11.4248 2.38334C11.2762 2.13843 11.067 1.93594 10.8174 1.79541C10.5678 1.65488 10.2862 1.58105 9.99977 1.58105C9.71333 1.58105 9.43172 1.65488 9.18211 1.79541C8.93251 1.93594 8.72333 2.13843 8.57477 2.38334Z"
            stroke="#FDB022"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Products",
      value: "lorem ipsum dolor sit amet consectetur adipiscing elit",
    },
  ];
  return (
    <div className="w-[30%] bg-white p-4 rounded-lg border border-gray-900 shadow-md">
      <div className="mb-2">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">Add List Price</h1>
          <svg
            width="4"
            height="16"
            viewBox="0 0 4 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66665 8.83325C2.12688 8.83325 2.49998 8.46016 2.49998 7.99992C2.49998 7.53968 2.12688 7.16659 1.66665 7.16659C1.20641 7.16659 0.833313 7.53968 0.833313 7.99992C0.833313 8.46016 1.20641 8.83325 1.66665 8.83325Z"
              stroke="#98A2B3"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.66665 2.99992C2.12688 2.99992 2.49998 2.62682 2.49998 2.16659C2.49998 1.70635 2.12688 1.33325 1.66665 1.33325C1.20641 1.33325 0.833313 1.70635 0.833313 2.16659C0.833313 2.62682 1.20641 2.99992 1.66665 2.99992Z"
              stroke="#98A2B3"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.66665 14.6666C2.12688 14.6666 2.49998 14.2935 2.49998 13.8333C2.49998 13.373 2.12688 12.9999 1.66665 12.9999C1.20641 12.9999 0.833313 13.373 0.833313 13.8333C0.833313 14.2935 1.20641 14.6666 1.66665 14.6666Z"
              stroke="#98A2B3"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-md">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit
          </p>
        </div>
      </div>
      <div>
        <hr className="border-black" />
        <div className="flex flex-col gap-5 mt-5">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex gap-2 items-center">
                {item.svg}
                <p className="text-md underline">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
