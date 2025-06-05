import "ketcher-react/dist/index.css";
import { Editor } from "ketcher-react";
import { useState } from "react";
import { StandaloneStructServiceProvider } from "ketcher-standalone";
import { MdSearch } from "react-icons/md";
// import { Ketcher } from "ketcher-core";

const structServiceProvider = new StandaloneStructServiceProvider();
const ChemEditor = ({ data = "", onChange }) => {
  const [viewketcher, setViewketcher] = useState(false);
  const [chemicalName, setChemicalName] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [moldata, setMoldata] = useState({
    smiles: "",
    molfile: "",
    smarts: "",
    cml: "",
    cdxml: "",
    cdx: "",
    inchi: "",
    inchikey: "",
  });
  const [selectedData, setSelectedData] = useState("");

  console.log(selectedData);

  const handleGetData = async (selected) => {
    if (window.ketcher) {
      try {
        const smiles = await window.ketcher.getSmiles();
        const molfile = await window.ketcher.getMolfile();
        // (Optional) const rxn = await window.ketcher.getRxn();
        const smarts = await window.ketcher.getSmarts();
        const cml = await window.ketcher.getCml();
        const cdxml = await window.ketcher.getCDXml();
        const cdx = await window.ketcher.getCDX();
        const inchi = await window.ketcher.getInchi();
        setMoldata({ smiles, molfile, smarts, cml, cdxml, cdx, inchi });
        setSelectedData(selected); // (Update "selected" (or "clicked") value so that only that "format" is "displayed")
      } catch (err) {
        console.error("Error fetching molecule data:", err);
        // (Optional) set an error state or alert the user
      }
    }
  };

  const handleSearch = () => {
    console.log(chemicalName);
    setChemicalName("");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center w-[30vw] mt-10 relative">
          <input
            type="search"
            value={chemicalName}
            onChange={(e) => setChemicalName(e.target.value)}
            placeholder="Enter chemical label"
            className="w-full pl-32 py-2 rounded-lg min-w-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black text-base"
            style={{ outline: "none" }}
          />

          <select className="min-w-[80px] px-2 py-2 rounded-l-lg absolute left-1  border-r-2 border-gray-300">
            <option value="name">Name</option>
            <option value="CAS">CAS</option>
            <option value="barcode">Barcode</option>
          </select>
          <button className="bg-black text-white hover:bg-gray-700 h-full rounded-r-lg px-3 py-2 absolute right-0">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>

        <div className="flex relative mt-4">
          <input
            type="search"
            value={chemicalName}
            onChange={(e) => setChemicalName(e.target.value)}
            placeholder="Enter chemical label"
            className="w-full max-w-md px-2 pr-16 py-2 rounded-md border border-gray-300"
          />
          <button
            className="button_style absolute right-0 py-0.5 h-full m-1"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="text-2xl font-bold py-20 px-10">
        Just checking the component
        <button
          onClick={() => setViewketcher(!viewketcher)}
          className="button_style"
        >
          {viewketcher ? "Hide Ketcher" : "Show Ketcher"}
        </button>
      </div>

      {viewketcher && (
        <>
          <div className="w-[70vw] h-[70vh]">
            <Editor
              errorHandler={(message) => {
                setHasError(true);
                setErrorMessage(message.toString());
              }}
              staticResourcesUrl={process.env.PUBLIC_URL}
              structServiceProvider={structServiceProvider}
              onInit={(ketcher) => {
                window.ketcher = ketcher;
                ketcher.setMolecule(data);
                ketcher.editor.subscribe("change", (operations) => {
                  // (Optional) Log or handle change events if needed
                });
              }}
            />
          </div>

          {hasError && <div>{errorMessage}</div>}
          <button
            onClick={() => {
              handleGetData("smiles");
            }}
            className="button_style m-2"
          >
            Get SMILES
          </button>
          <button
            onClick={() => handleGetData("molfile")}
            className="button_style m-2"
          >
            Get MOLFILE
          </button>
          <button
            onClick={() => handleGetData("smarts")}
            className="button_style m-2"
          >
            Get SMARTS
          </button>
          <button
            onClick={() => handleGetData("cml")}
            className="button_style m-2"
          >
            Get CML
          </button>
          <button
            onClick={() => handleGetData("cdx")}
            className="button_style m-2"
          >
            Get CDX
          </button>
          <button
            onClick={() => handleGetData("inchi")}
            className="button_style m-2"
          >
            Get InChI
          </button>

          {selectedData && (
            <div className="text-wrap overflow-x-auto">
              {selectedData}: {moldata[selectedData]}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChemEditor;
