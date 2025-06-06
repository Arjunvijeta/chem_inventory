import React, { useState } from "react";
import { Editor } from "ketcher-react";
import { StandaloneStructServiceProvider } from "ketcher-standalone";

const structServiceProvider = new StandaloneStructServiceProvider();

const KetcherModal = ({ data, onClose }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedData, setSelectedData] = useState("");
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-[70vw] h-[80vh] flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
        <div className="w-[95%] h-[60vh] flex flex-col items-center justify-center">
          <Editor
            errorHandler={(message) => {
              // Error handling is managed in parent
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
        {hasError && <div className="text-red-600 mt-2">{errorMessage}</div>}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => handleGetData("smiles")}
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
        </div>
        {selectedData && (
          <div className="text-wrap overflow-x-auto mt-4 w-full break-all border-t pt-2">
            <span className="font-semibold">{selectedData}:</span>{" "}
            {moldata[selectedData]}
          </div>
        )}
      </div>
    </div>
  );
};

export default KetcherModal;
