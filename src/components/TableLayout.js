import React, { useState, useMemo, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import AddContainer from "./tabs/AddContainer";
import Location from "./tabs/Location";
import Request from "./tabs/Request";
import Administrator from "./tabs/Administrator";

const columns = [
  { id: "chemicalName", label: "Chemical Name" },
  { id: "quantity", label: "Quantity" },
  { id: "location", label: "Location" },
  { id: "CAS", label: "CAS" },
  { id: "barcode", label: "Barcode" },
];

const rows = [
  {
    chemicalName: "Acetone",
    quantity: 5,
    location: "Lab 1",
    CAS: "67-64-1",
    barcode: "12345",
  },
  {
    chemicalName: "Ethanol",
    quantity: 10,
    location: "Lab 2",
    CAS: "64-17-5",
    barcode: "67890",
  },
  // ...more rows
];

const TableLayout = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [tableOpen, setTableOpen] = useState({
    addContainer: false,
    location: false,
    requestChemical: false,
    administrator: false,
  });

  const handleClose = () => {
    setTableOpen({
      addContainer: false,
      location: false,
      requestChemical: false,
      administrator: false,
    });
    console.log(tableOpen);
  };

  const handleOpen = (tab) => {
    setTableOpen({ ...tableOpen, [tab]: true });
  };

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    if (!searchText) return rows;
    const searchLower = searchText.toLowerCase();
    return rows.filter((row) => {
      return columns.some((column) => {
        const value = row[column.id];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [rows, searchText, columns]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Reset page when search changes
  useEffect(() => {
    setPage(0);
  }, [searchText]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="flex space-x-10 px-10 mt-10">
      <div className="w-[20vw] rounded-lg py-10">
        <div className="flex flex-col space-y-2 text-white items-center font-semibold justify-center">
          <div
            className="w-full h-full bg-primary-100 rounded-lg p-4 hover:scale-105 transition-all duration-300"
            onClick={() => handleOpen("addContainer")}
          >
            Add chemical container
          </div>
          {tableOpen.addContainer && <AddContainer onClose={handleClose} />}
          <div
            className="w-full h-full bg-primary-100 rounded-lg p-4 hover:scale-105 transition-all duration-300"
            onClick={() => handleOpen("location")}
          >
            Location
          </div>
          {tableOpen.location && <Location onClose={handleClose} />}
          <div
            className="w-full h-full bg-primary-100 rounded-lg p-4 hover:scale-105 transition-all duration-300"
            onClick={() => handleOpen("requestChemical")}
          >
            Request chemical
          </div>
          {tableOpen.requestChemical && <Request onClose={handleClose} />}
          <div
            className="w-full h-full bg-primary-100 rounded-lg p-4 hover:scale-105 transition-all duration-300"
            onClick={() => handleOpen("administrator")}
          >
            Administrator
          </div>
          {tableOpen.administrator && <Administrator onClose={handleClose} />}
        </div>
      </div>
      <div className="w-[80vw] h-[70vh] rounded-lg p-4">
        <div className="px-4 w-full mx-auto">
          <div className="flex flex-col rounded-xl ">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-6 px-2">
              <div className="text-2xl md:text-3xl font-bold text-primary-100 flex items-center gap-2 ">
                Chemical List
              </div>
              <div className="relative flex items-center w-full sm:w-auto">
                <div className="absolute left-3">
                  <BiSearch className="text-gray-400 text-xl" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full sm:w-auto pl-10 pr-4 py-1 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>
            <div className="border-0 overflow-hidden bg-white rounded-xl shadow">
              <div className="md:h-[50vh] overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary-700 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-primary-100">
                        #
                      </th>
                      {columns.map((column) => (
                        <th
                          key={column.id}
                          className="px-4 py-3 text-left text-sm font-bold text-primary-100"
                          style={{
                            minWidth: column.minWidth,
                            maxWidth: column.maxWidth,
                          }}
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedRows.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "" : "bg-gray-100"}
                      >
                        <td className="pl-4 py-2 whitespace-nowrap text-sm text-gray-700">
                          {page * rowsPerPage + index + 1}
                        </td>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <td
                              key={column.id}
                              className="pl-4 py-2 whitespace-nowrap text-sm text-gray-700"
                            >
                              {value}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination Controls */}
              <div className="flex items-center justify-end px-4 py-2 bg-white border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="md:text-sm text-xs text-gray-700">
                    Rows per page:
                  </span>
                  <select
                    className="border border-gray-300 rounded px-2 py-1 md:text-sm text-xs focus:outline-none"
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                  >
                    {[10, 25, 100].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    className="px-2 py-1 md:text-sm text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    onClick={() => handleChangePage(page - 1)}
                    disabled={page === 0}
                  >
                    Previous
                  </button>
                  <span className="md:text-sm text-xs text-gray-700">
                    Page {page + 1} of {totalPages}
                  </span>
                  <button
                    className="px-2 py-1 md:text-sm text-xs  text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    onClick={() => handleChangePage(page + 1)}
                    disabled={page >= totalPages - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
