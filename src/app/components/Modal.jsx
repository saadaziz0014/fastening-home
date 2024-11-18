const Modal = ({ display, onCancel, onConfirm, name, setName }) => {
  return (
    <div
      className={`${
        display
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } fixed inset-0 z-[999] grid font-inter h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300`}
    >
      <div className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm">
        <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
          Work File
        </div>
        <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
          <input
            type="text"
            placeholder="Work File Name"
            className="w-64 p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
          <button
            className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-[#614d87] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-purple-600 focus:shadow-none active:bg-purple-600 hover:bg-purple-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
