import "ketcher-react/dist/index.css";
import { useState } from "react";
import { StandaloneStructServiceProvider } from "ketcher-standalone";
import { MdSearch } from "react-icons/md";
import KetcherModal from "./KetcherModal";
import TableLayout from "./TableLayout";
import { FaChevronDown } from "react-icons/fa";
// import { Ketcher } from "ketcher-core";

const structServiceProvider = new StandaloneStructServiceProvider();
const ChemEditor = ({ data = "", onChange }) => {
  const [viewketcher, setViewketcher] = useState(false);
  const [chemicalName, setChemicalName] = useState("");

  const handleSearch = () => {
    console.log(chemicalName);
    setChemicalName("");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-blue-100 to-cyan-100 bg-opacity-30 h-screen">
      <div className="flex items-center justify-center pt-10">
        <div className="flex items-center w-[30vw]  relative">
          <input
            type="search"
            value={chemicalName}
            onChange={(e) => setChemicalName(e.target.value)}
            placeholder="Enter chemical name, CAS, or barcode"
            className="w-full pl-32 py-2 rounded-lg min-w-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black text-base"
            style={{ outline: "none" }}
          />

          <select className="min-w-[80px] px-2 py-2 rounded-l-lg absolute left-1  border-r-2 border-gray-300">
            <option value="name">Name</option>
            <option value="CAS">CAS</option>
            <option value="barcode">Barcode</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-primary-100 text-white hover:bg-gray-700 h-full rounded-r-lg px-2 py-2 absolute right-0"
          >
            <MdSearch className=" w-6 h-6" />
          </button>
        </div>

        <div className="text-2xl font-bold  px-10">
          <button
            onClick={() => setViewketcher(!viewketcher)}
            className=" flex py-2 px-2 items-center rounded-lg bg-primary-100 text-white  hover:scale-105 transition-all duration-300 border border-gray-300 text-base"
          >
            Structure search <FaChevronDown className="w-4 h-4 pl-1" />
          </button>
        </div>

        {viewketcher && (
          <KetcherModal data={data} onClose={() => setViewketcher(false)} />
        )}
      </div>
      <TableLayout />
    </div>
  );
};

export default ChemEditor;
