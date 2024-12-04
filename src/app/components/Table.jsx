"use client";

import { useRouter } from "next/navigation";

export default function Table({ data }) {
  // console.log(children);
  const router = useRouter();
  return (
    <section className="">
      <div className="flex flex-col">
        <div className=" -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#F9FAFB]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-black"
                    >
                      <div className="flex items-center gap-x-3">
                        <input
                          type="checkbox"
                          className="text-black border-gray-300 rounded"
                        />
                        <button className="flex items-center gap-x-2">
                          <span>Name</span>
                        </button>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black"
                    >
                      Vendor
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black"
                    >
                      <div className="flex items-center gap-x-2">
                        Last Updated Date
                        {/* <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.99998 1.33325V10.6666M5.99998 10.6666L10.6666 5.99992M5.99998 10.6666L1.33331 5.99992"
                            stroke="#101828"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg> */}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black"
                    >
                      Note
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black"
                    >
                      <div className="flex items-center gap-x-2">
                        Follow up Date
                        {/* <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.99998 1.33325V10.6666M5.99998 10.6666L10.6666 5.99992M5.99998 10.6666L1.33331 5.99992"
                            stroke="#101828"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg> */}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black"
                    >
                      Assigned to
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-black"
                    >
                      <div className="flex items-center gap-x-2">
                        Update Required Date
                        {/* <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.99998 1.33325V10.6666M5.99998 10.6666L10.6666 5.99992M5.99998 10.6666L1.33331 5.99992"
                            stroke="#101828"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg> */}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data &&
                    data.map((item) => (
                      <tr
                        key={item.id}
                        className="cursor-pointer"
                        onClick={() =>
                          router.push("/pim/work-file?name=" + item.name)
                        }
                      >
                        <td className="px-4 py-4 text-sm font-medium text-black whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <input
                              type="checkbox"
                              className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                            />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
                          {item.data[0] && item.data[0].vname
                            ? item.data[0].vname
                            : "N/A"}
                        </td>
                        <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
                          {new Date(item.updated_at).toISOString().slice(0, 10)}
                        </td>
                        <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
                          {""}
                        </td>
                        <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
                          {new Date().toISOString().slice(0, 10)}
                        </td>
                        <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
                          {""}
                        </td>
                        <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
                          {new Date().toISOString().slice(0, 10)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
