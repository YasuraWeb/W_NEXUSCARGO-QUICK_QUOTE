import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo from "../assets/images/logo.png";

const Summary = () => {
  const [activeButton, setActiveButton] = useState("Summary");
  const [filledButtons] = useState([
    "Cargo Collection Method",
    "Delivery Method - Sri Lanka",
    "Clearance Option",
  ]);
  const [packageDetails, setPackageDetails] = useState(null);
  const [selectedPickupOption, setSelectedPickupOption] = useState("");
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("");
  const [selectedClearanceOption, setSelectedClearanceOption] = useState("");
  const [upbDetails, setUpbDetails] = useState(null);

  const navigate = useNavigate();
  const contentRef = useRef(null);

  const buttons = [
    { label: "Cargo Collection Method", link: "/PickupMethod" },
    { label: "Delivery Method - Sri Lanka", link: "/DelivaryMethod" },
    { label: "Clearance Option", link: "/ClearanceOptions" },
    { label: "Summary", link: "/Summary" },
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("packageDetailsFormData");
    const savedPickupOption = localStorage.getItem("selectedPickupOption");
    const savedDeliveryOption = localStorage.getItem("selectedDeliveryOption");
    const savedClearanceOption = localStorage.getItem(
      "selectedClearanceOption"
    );
    const savedUPBDetails = localStorage.getItem("upbDetails");

    if (savedData) {
      setPackageDetails(JSON.parse(savedData));
    }

    if (savedPickupOption) {
      setSelectedPickupOption(savedPickupOption);
    }

    if (savedDeliveryOption) {
      setSelectedDeliveryOption(savedDeliveryOption);
    }

    if (savedClearanceOption) {
      setSelectedClearanceOption(savedClearanceOption);
    }

    if (savedUPBDetails) {
      setUpbDetails(JSON.parse(savedUPBDetails));
    }
  }, []);

  const handleNavigation = (button) => {
    if (filledButtons.includes(button.label)) {
      navigate(button.link);
      setActiveButton(button.label);
    }
  };

  const handleBack = () => {
    navigate("/ClearanceOptions");
  };

  const handleDownload = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 10;
    let yPos = margin;
    const pageWidth = pdf.internal.pageSize.width;

    const addCenteredText = (text, y, options = {}) => {
      pdf.setFontSize(options.size || 12);
      pdf.setFont(options.font || "helvetica", options.style || "normal");
      pdf.setTextColor(options.color || 0);
      const textWidth =
        (pdf.getStringUnitWidth(text) * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const x = (pageWidth - textWidth) / 2;
      pdf.text(text, x, y);
    };

    const logoWidth = 30;
    const logoHeight = 40;
    const logoX = (pageWidth - logoWidth) / 2;
    pdf.addImage(Logo, "PNG", logoX, yPos, logoWidth, logoHeight);
    yPos += 50;

    addCenteredText("Nexuscorp International Pty Ltd", yPos, {
      size: 14,
      style: "bold",
    });
    yPos += 10;
    addCenteredText(
      "Unit 8, No. 2 Ash Road, Prestons NSW 2170, Australia",
      yPos,
      { size: 12 }
    );
    yPos += 8;
    addCenteredText("0416 247 725 | info@nexuscorp.com.au", yPos, { size: 12 });
    yPos += 20;

    addCenteredText("Quotation Summary", yPos, { size: 14, style: "bold" });
    yPos += 10;

    const table = contentRef.current.querySelector(
      ".quotation-summary-table table"
    );
    const rows = table.querySelectorAll("tr");
    const tableData = [];

    rows.forEach((row) => {
      const rowData = [];
      row.querySelectorAll("td, th").forEach((cell) => {
        rowData.push(cell.innerText);
      });
      tableData.push(rowData);
    });

    pdf.autoTable({
      startY: yPos,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: "grid",
      styles: {
        fontSize: 12,
        textColor: 0,
        cellPadding: 5,
        lineWidth: 0.1,
      },
      headStyles: {
        fontStyle: "bold",
        fillColor: "#ff6f3d",
        textColor: "#ffffff",
        lineWidth: 0.5,
      },
      bodyStyles: {
        lineWidth: 0.1,
      },
      alternateRowStyles: {
        fillColor: "#f5f5f5",
      },
      didDrawCell: (data) => {
        if (data.row.index === data.table.body.length - 1) {
          pdf.setDrawColor(0);
          pdf.setLineWidth(0.5);
          pdf.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
        }
      },
    });

    yPos = pdf.autoTable.previous.finalY + 40;

    addCenteredText("Thank You for Choosing Nexus Cargo", yPos, {
      size: 12,
      style: "italic",
      color: "#555555",
    });

    pdf.save("quotation_summary.pdf");
    localStorage.clear();
    navigate("/");
  };

  const totalQuantity = packageDetails
    ? packageDetails.cards.reduce(
        (sum, card) => sum + parseInt(card.quantity, 10),
        0
      )
    : 0;

  const standardFreightTotal = 0.0;
  const collectionChargesTotal = 0.0;
  const deliveryTotal = 0.0;
  const customDutyTotal = 0.0;
  const quotationSummaryTotal =
    standardFreightTotal +
    collectionChargesTotal +
    deliveryTotal +
    customDutyTotal;

  return (
    <div>
      <div className="flex justify-center mb-8">
        <img src={Logo} alt="Logo" className="w-30 h-auto" />
      </div>
      <div className="bg-white font-instrument-sans mx-auto p-5 border border-gray-300 rounded-lg w-[1150px]">
        <div className="mt-6 flex items-center justify-center flex-wrap mb-5">
          {buttons.map((button, index) => (
            <React.Fragment key={index}>
              <button
                className={`rounded-lg px-5 py-3 text-sm font-bold text-center transition-colors duration-300 w-[230px] ${
                  activeButton === button.label
                    ? "bg-[#ff6f3d] text-white opacity-100"
                    : "bg-[#e0dfdf] text-[#555555]"
                } ${
                  filledButtons.includes(button.label)
                    ? "border-2 border-[#ff6f3d]"
                    : ""
                } ${
                  !filledButtons.includes(button.label)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!filledButtons.includes(button.label)}
                onClick={() => handleNavigation(button)}
              >
                {button.label}
              </button>
              {index < buttons.length - 1 && (
                <div className="w-[30px] h-[2px] bg-[#e0dfdf] mx-1"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div ref={contentRef} className="sm-content-below-navigation">
          <div className="mt-12 ml-20 bg-[#D9D9D9] p-5 rounded-lg flex justify-between text-left w-[900px]">
            <div className="flex-1 pr-5 border-r-2 border-dashed border-gray-500">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Package Details</span>
                <span
                  className="text-red-600 cursor-pointer text-xs mr-5"
                  onClick={() => navigate("/")}
                >
                  (Edit)
                </span>
              </div>
              {packageDetails &&
                packageDetails.cards.map((card, index) => (
                  <div key={index}>
                    <p className="text-sm my-1">
                      Package Type: {card.packageType}
                    </p>
                    <p className="text-sm my-1">
                      Dimensions: {card.length}cm x {card.width}cm x{" "}
                      {card.height}
                      cm
                    </p>
                    <p className="text-sm my-1">Quantity: {card.quantity}</p>
                    <hr className="my-2" />
                  </div>
                ))}
            </div>

            <div className="flex-1 px-5 border-r-2 border-dashed border-gray-500">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Address Details</span>
                <span
                  className="text-red-600 cursor-pointer text-xs mr-5"
                  onClick={() => navigate("/")}
                >
                  (Edit)
                </span>
              </div>
              {packageDetails && (
                <>
                  <p className="text-sm my-1">From: {packageDetails.origin}</p>
                  <p className="text-sm my-1">
                    To: {packageDetails.destination}
                  </p>
                </>
              )}
            </div>

            <div className="flex-1 pl-5">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Quote</span>
                <span
                  className="text-red-600 cursor-pointer text-xs mr-5"
                  onClick={() => navigate("/PickupMethod")}
                >
                  (Edit)
                </span>
              </div>
              <p className="text-sm my-1">
              Cargo Collection Method:{" "}
                {selectedPickupOption || "Not selected"}
              </p>
              <p className="text-sm my-1">
                Delivery Method Sri Lanka:{" "}
                {selectedDeliveryOption || "Not selected"}
              </p>
              <p className="text-sm my-1">
                Clearance Option: {selectedClearanceOption || "Not selected"}
              </p>
              <p className="text-sm my-1">Price:</p>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-lg font-bold ml-20 mb-2">
              Standard Freight Charges
            </h2>
            <div className="w-[81%] ml-20 border-2 border-dashed border-gray-700 p-10">
              <table className="w-[90%] border-collapse mt-2">
                <thead>
                  <tr>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      PACKAGE TYPE
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      UNIT VOL
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      QUANTITY
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      RATE ($)
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      AMOUNT ($)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {packageDetails &&
                    packageDetails.cards.map((card, index) => (
                      <tr key={index}>
                        <td className="text-black p-2">{card.packageType}</td>
                        <td className="text-black p-2">
                          {(card.length * card.width * card.height).toFixed(2)}
                        </td>
                        <td className="text-black p-2">{card.quantity}</td>
                        <td className="text-black p-2">0.00</td>
                        <td className="text-black p-2">0.00</td>
                      </tr>
                    ))}
                  <tr className="font-bold text-left">
                    <td colSpan="4" className="p-2 border-t-2 border-black">
                      Total Amount
                    </td>
                    <td className="p-2 border-t-2 border-black text-left">
                      {standardFreightTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-lg font-bold ml-20 mb-2">Collection Charges</h2>
            <div className="w-[81%] ml-20 border-2 border-dashed border-gray-700 p-10">
              <table className="w-[90%] border-collapse mt-2">
                <thead>
                  <tr>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      DESCRIPTION
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      QUANTITY
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      RATE ($)
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      AMOUNT ($)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-black p-2">
                      {selectedPickupOption || "Not selected"}
                    </td>
                    <td className="text-black p-2">{totalQuantity}</td>
                    <td className="text-black p-2">0.00</td>
                    <td className="text-black p-2">0.00</td>
                  </tr>
                  <tr className="font-bold text-left">
                    <td colSpan="3" className="p-2 border-t-2 border-black">
                      Total Amount
                    </td>
                    <td className="p-2 border-t-2 border-black text-left">
                      {collectionChargesTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-lg font-bold ml-20 mb-2">Delivery</h2>
            <div className="w-[81%] ml-20 border-2 border-dashed border-gray-700 p-10">
              <table className="w-[90%] border-collapse mt-2">
                <thead>
                  <tr>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      DESCRIPTION
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      QUANTITY
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      RATE ($)
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      AMOUNT ($)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-black p-2">
                      {selectedDeliveryOption || "Not selected"}
                    </td>
                    <td className="text-black p-2">{totalQuantity}</td>
                    <td className="text-black p-2">0.00</td>
                    <td className="text-black p-2">0.00</td>
                  </tr>
                  <tr className="font-bold text-left">
                    <td colSpan="3" className="p-2 border-t-2 border-black">
                      Total Amount
                    </td>
                    <td className="p-2 border-t-2 border-black text-left">
                      {deliveryTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-lg font-bold ml-20 mb-2">
              Standard Custom Duty & Clearance
            </h2>
            <div className="w-[81%] ml-20 border-2 border-dashed border-gray-700 p-10">
              <table className="w-[90%] border-collapse mt-2">
                <thead>
                  <tr>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      DESCRIPTION
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      QUANTITY
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      RATE ($)
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      AMOUNT ($)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-black p-2">
                      {selectedClearanceOption || "Not selected"}
                    </td>
                    <td className="text-black p-2">{totalQuantity}</td>
                    <td className="text-black p-2">0.00</td>
                    <td className="text-black p-2">0.00</td>
                  </tr>
                  <tr className="font-bold text-left">
                    <td colSpan="3" className="p-2 border-t-2 border-black">
                      Total Amount
                    </td>
                    <td className="p-2 border-t-2 border-black text-left">
                      {customDutyTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-lg font-bold ml-20 mb-2">Quotation Summary</h2>
            <div className="w-[81%] ml-20 border-2 border-dashed border-gray-700 p-10 quotation-summary-table">
              <table className="w-[90%] border-collapse mt-2">
                <thead>
                  <tr>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      DESCRIPTION
                    </th>
                    <th className="text-gray-700 p-2 text-left border-b-2 border-black">
                      CHARGES ($)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-black p-2">Standard Freight Charges</td>
                    <td className="text-black p-2 text-right">
                      {standardFreightTotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-black p-2">Collection Charges</td>
                    <td className="text-black p-2 text-right">
                      {collectionChargesTotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-black p-2">Delivery</td>
                    <td className="text-black p-2 text-right">
                      {deliveryTotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-black p-2">
                      Standard Custom Duty & Clearance
                    </td>
                    <td className="text-black p-2 text-right">
                      {customDutyTotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="font-bold text-right">
                    <td className="p-2 border-t-2 border-black">
                      Total Amount
                    </td>
                    <td className="p-2 border-t-2 border-black text-right">
                      {quotationSummaryTotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-black p-2">Subtotal (Excl. GST)</td>
                    <td className="text-black p-2 text-right">
                      {(quotationSummaryTotal / 1.1).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-black p-2">GST 10%</td>
                    <td className="text-black p-2 text-right">
                      {(quotationSummaryTotal * 0.1).toFixed(2)}
                    </td>
                  </tr>
                  <tr className="font-bold text-right">
                    <td className="p-2 border-t-2 border-black">
                      Final Amount (Incl. GST)
                    </td>
                    <td className="p-2 border-t-2 border-black text-right">
                      {quotationSummaryTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-5 mb-12">
          <div className="flex-1 flex justify-start">
            <button
              className="bg-gray-300 mt-7 ml-7 border-2 border-[#ff6f3d] text-gray-800 px-12 py-2 rounded-full text-base transition-colors hover:bg-gray-200"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <button
              className="bg-[#ff6f3d] mt-7 mr-15 text-white px-12 py-2 rounded-full text-base font-bold transition-colors hover:bg-[#e65b29]"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
