import Image from "next/image";
import company from "../assets/company.png";
export default function UpcomingPriceCard() {
  let data = [
    {
      img: company,
      title: "Orders",
      value: "12",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="lucide lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      ),
    },
    {
      img: company,
      title: "Orders",
      value: "12",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="lucide lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      ),
    },
  ];
  return (
    <div className="w-[30%] bg-white p-4 rounded-lg border border-gray-900 shadow-md">
      <div className="mb-2">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">Upcoming Price</h1>
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
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image width={30} height={30} src={item.img} alt={item.title} />
                <h1 className="text-md font-semibold">{item.title}</h1>
              </div>
              <p className="text-md">{item.value}</p>
              <div className="flex items-center">{item.svg}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
