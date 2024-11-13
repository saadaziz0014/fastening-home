import Link from "next/link";

export default function LockLandFix() {
  let data = [
    {
      svg: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99996 6.66675V10.0001M9.99996 13.3334H10.0083M18.3333 10.0001C18.3333 14.6025 14.6023 18.3334 9.99996 18.3334C5.39759 18.3334 1.66663 14.6025 1.66663 10.0001C1.66663 5.39771 5.39759 1.66675 9.99996 1.66675C14.6023 1.66675 18.3333 5.39771 18.3333 10.0001Z"
            stroke="red"
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
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99996 6.66675V10.0001M9.99996 13.3334H10.0083M18.3333 10.0001C18.3333 14.6025 14.6023 18.3334 9.99996 18.3334C5.39759 18.3334 1.66663 14.6025 1.66663 10.0001C1.66663 5.39771 5.39759 1.66675 9.99996 1.66675C14.6023 1.66675 18.3333 5.39771 18.3333 10.0001Z"
            stroke="red"
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
          <h1 className="text-lg font-bold">Lock Land Cost</h1>
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
                <Link
                  href="/orders"
                  className="text-md underline text-blue-500"
                >
                  <strong className="mr-1 text-black">{item.title}</strong>
                  {item.value}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
