import Link from "next/link";

export default function ReportCard() {
  let data = [
    {
      svg: (
        <svg
          width="13"
          height="16"
          viewBox="0 0 13 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00003 1.33325H2.33336C1.97974 1.33325 1.6406 1.47373 1.39055 1.72378C1.14051 1.97382 1.00003 2.31296 1.00003 2.66659V13.3333C1.00003 13.6869 1.14051 14.026 1.39055 14.2761C1.6406 14.5261 1.97974 14.6666 2.33336 14.6666H10.3334C10.687 14.6666 11.0261 14.5261 11.2762 14.2761C11.5262 14.026 11.6667 13.6869 11.6667 13.3333V5.99992M7.00003 1.33325L11.6667 5.99992M7.00003 1.33325V5.99992H11.6667"
            stroke="#624E88"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      title: "Orders",
      value: "12",
    },
    {
      svg: (
        <svg
          width="13"
          height="16"
          viewBox="0 0 13 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00003 1.33325H2.33336C1.97974 1.33325 1.6406 1.47373 1.39055 1.72378C1.14051 1.97382 1.00003 2.31296 1.00003 2.66659V13.3333C1.00003 13.6869 1.14051 14.026 1.39055 14.2761C1.6406 14.5261 1.97974 14.6666 2.33336 14.6666H10.3334C10.687 14.6666 11.0261 14.5261 11.2762 14.2761C11.5262 14.026 11.6667 13.6869 11.6667 13.3333V5.99992M7.00003 1.33325L11.6667 5.99992M7.00003 1.33325V5.99992H11.6667"
            stroke="#624E88"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      title: "Products",
      value: "12",
    },
  ];
  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-md">
      <div className="mb-2">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">Reports</h1>
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
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.66665 2.99992C2.12688 2.99992 2.49998 2.62682 2.49998 2.16659C2.49998 1.70635 2.12688 1.33325 1.66665 1.33325C1.20641 1.33325 0.833313 1.70635 0.833313 2.16659C0.833313 2.62682 1.20641 2.99992 1.66665 2.99992Z"
              stroke="#98A2B3"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.66665 14.6666C2.12688 14.6666 2.49998 14.2935 2.49998 13.8333C2.49998 13.373 2.12688 12.9999 1.66665 12.9999C1.20641 12.9999 0.833313 13.373 0.833313 13.8333C0.833313 14.2935 1.20641 14.6666 1.66665 14.6666Z"
              stroke="#98A2B3"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
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
        <div className="flex flex-col">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex gap-2 items-center">
                {item.svg}
                <h1 className="text-lg">{item.title}</h1>
              </div>
              <Link href="#" className="text-[#9843D0] underline">
                View Reports
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
