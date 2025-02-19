import React, { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const PickupMethod = () => {
  const [activeButton, setActiveButton] = useState("Pickup Method - Australia");
  const [selectedOption, setSelectedOption] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [showOpeningHours, setShowOpeningHours] = useState(false);
  const navigate = useNavigate();

  const buttons = [
    { label: "Package Details", link: "/", filled: !!packageDetails },
    {
      label: "Cargo Collection Method",
      link: "/PickupMethod",
      filled: !!selectedOption,
    },
    {
      label: "Delivery Method - Sri Lanka",
      link: "/DelivaryMethod",
      filled: false,
    },
    { label: "Clearance Option", link: "/ClearanceOptions", filled: false },
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("packageDetailsFormData");
    const savedOption = localStorage.getItem("selectedPickupOption");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setPackageDetails(parsedData);
    }

    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, []);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    localStorage.setItem("selectedPickupOption", value);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleNext = () => {
    if (!selectedOption) {
      alert("Please select an option before proceeding.");
      return;
    }
    navigate("/DelivaryMethod");
  };

  const handleNavigation = (button) => {
    if (button.label === "Package Details" && !packageDetails) {
      alert("Please fill in the package details first.");
      return;
    }
    if (button.label === "Delivery Method - Sri Lanka" && !selectedOption) {
      alert("Please select a pickup method before proceeding.");
      return;
    }
    navigate(button.link);
    setActiveButton(button.label);
  };

  const toggleOpeningHours = () => {
    setShowOpeningHours(!showOpeningHours);
  };

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
                className={`rounded-lg px-5 py-3 text-sm font-bold text-center transition-colors duration-300 ${
                  activeButton === button.label
                    ? "bg-[#ff6f3d] text-white"
                    : "bg-[#e0dfdf] text-[#555555]"
                } ${
                  button.filled ? "border-2 border-[#ff6f3d]" : ""
                } w-[230px] disabled:opacity-50`}
                disabled={
                  (button.label === "Delivery Method - Sri Lanka" &&
                    !selectedOption) ||
                  (button.label === "Clearance Option" &&
                    (!selectedOption ||
                      activeButton !== "Delivery Method - Sri Lanka")) ||
                  (button.label === "Cargo Collection Method" &&
                    !packageDetails)
                }
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

        {/* Three-Part Box Section */}
        <div className="mt-12 flex ml-20 bg-[#D9D9D9] p-5 rounded-lg justify-between text-left w-[900px]">
          <div className="flex-1 p-2 border-r-2 border-dashed border-gray-400">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>Package Details</span>
              <span
                className="text-red-600 cursor-pointer text-xs"
                onClick={() => navigate("/")}
              >
                (Edit)
              </span>
            </div>
            {packageDetails &&
              packageDetails.cards.map((card, index) => (
                <div key={index}>
                  <p className="text-sm my-1">Package Type: {card.packageType}</p>
                  <p className="text-sm my-1">
                    Dimensions: {card.length}cm x {card.width}cm x {card.height}
                    cm
                  </p>
                  <p className="text-sm">Quantity: {card.quantity}</p>
                  {index < packageDetails.cards.length - 1 && (
                    <hr className="my-2" />
                  )}
                </div>
              ))}
          </div>

          <div className="flex-1 p-2 border-r-2 border-dashed border-gray-400">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>Address Details</span>
              <span
                className="text-red-600 cursor-pointer text-xs"
                onClick={() => navigate("/")}
              >
                (Edit)
              </span>
            </div>
            {packageDetails && (
              <>
                <p className="text-sm my-1">From: {packageDetails.origin}</p>
                <p className="text-sm my-1">To: {packageDetails.destination}</p>
              </>
            )}
          </div>

          <div className="flex-1 p-2">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>Quote</span> <span className="text-red-600">(Edit)</span>
            </div>
            <p className="text-sm my-1">
              Cargo Collection Method: {selectedOption || "Not selected"}
            </p>
            <p className="text-sm my-1">Delivery Method Sri Lanka:</p>
            <p className="text-sm my-1">Price:</p>
          </div>
        </div>

        {/* Pickup Method Options Section */}
        <div className="w-[950px] mt-10 p-10  ml-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-8">
              <div
                className="bg-white border border-gray-300 rounded-lg shadow-sm p-3 flex items-center cursor-pointer transition-shadow duration-300 hover:shadow-md w-[400px]"
                onClick={() => handleOptionChange("Pickup")}
              >
                <input
                  type="radio"
                  id="pickup"
                  name="pickupMethod"
                  value="Pickup"
                  checked={selectedOption === "Pickup"}
                  onChange={(e) => handleOptionChange(e.target.value)}
                  className="mr-2 accent-[#183650] cursor-pointer"
                />
                <label htmlFor="pickup" className="cursor-pointer">
                  Pickup
                </label>
              </div>
              <select className="w-[185px] p-2 border border-gray-300 rounded-lg bg-white text-sm shadow-sm">
                <option value="">Select Collection Point</option>
                <option value="acacia">Acacia Gardens</option>
                <option value="west">West Pennant Hills</option>
                <option value="brisbane">Brisbane</option>
                <option value="canberra">Canberra</option>
              </select>
            </div>
            <div className="flex items-center gap-8">
              <div
                className="bg-white border border-gray-300 rounded-lg shadow-sm p-3 flex items-center cursor-pointer transition-shadow duration-300 hover:shadow-md w-[400px]"
                onClick={() =>
                  handleOptionChange(
                    "Drop off at the Warehouse / Collection Point"
                  )
                }
              >
                <input
                  type="radio"
                  id="warehouse"
                  name="pickupMethod"
                  value="Drop off at the Warehouse / Collection Point"
                  checked={
                    selectedOption ===
                    "Drop off at the Warehouse / Collection Point"
                  }
                  onChange={(e) => handleOptionChange(e.target.value)}
                  className="mr-2 accent-[#183650] cursor-pointer"
                />
                <label htmlFor="warehouse" className="cursor-pointer">
                  Drop off at the Warehouse / Collection Point
                </label>
              </div>
              <select className="w-[185px] p-2 border border-gray-300 rounded-lg bg-white text-sm shadow-sm">
                <option value="">Select Collection Point</option>
                <option value="acacia">Acacia Gardens</option>
                <option value="west">West Pennant Hills</option>
                <option value="brisbane">Brisbane</option>
                <option value="canberra">Canberra</option>
              </select>
              <button
                className="bg-[#183650] text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center shadow-sm hover:bg-[#0f2438] hover:shadow-md"
                onClick={toggleOpeningHours}
              >
                <FiEye className="mr-2 text-white" /> View opening hours
              </button>
            </div>

            <div className="flex items-center gap-8">
              <div
                className="bg-white border border-gray-300 rounded-lg shadow-sm p-3 flex items-center cursor-pointer transition-shadow duration-300 hover:shadow-md w-[400px]"
                onClick={() =>
                  handleOptionChange("Drop off at TNT / FedEx Depot")
                }
              >
                <input
                  type="radio"
                  id="depot"
                  name="pickupMethod"
                  value="Drop off at TNT / FedEx Depot"
                  checked={selectedOption === "Drop off at TNT / FedEx Depot"}
                  onChange={(e) => handleOptionChange(e.target.value)}
                  className="mr-2 accent-[#183650] cursor-pointer"
                />
                <label htmlFor="depot" className="cursor-pointer">
                  Drop off at TNT / FedEx Depot
                </label>
              </div>
              <button className="bg-[#183650] text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center shadow-sm hover:bg-[#0f2438] hover:shadow-md">
                <FiEye className="mr-2 text-white" /> View TNT Depot
              </button>
            </div>

            <div className="flex items-center gap-8">
              <div
                className="bg-white border border-gray-300 rounded-lg shadow-sm p-3 flex items-center cursor-pointer transition-shadow duration-300 hover:shadow-md w-[400px]"
                onClick={() =>
                  handleOptionChange("Use 3rd Party Courier Service for Pickup")
                }
              >
                <input
                  type="radio"
                  id="thirdParty"
                  name="pickupMethod"
                  value="Use 3rd Party Courier Service for Pickup"
                  checked={
                    selectedOption ===
                    "Use 3rd Party Courier Service for Pickup"
                  }
                  onChange={(e) => handleOptionChange(e.target.value)}
                  className="mr-2 accent-[#183650] cursor-pointer"
                />
                <label htmlFor="thirdParty" className="cursor-pointer">
                  Use 3rd Party Courier Service for Pickup
                </label>
              </div>
              <button className="bg-[#183650] text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center shadow-sm hover:bg-[#0f2438] hover:shadow-md">
                <FiEye className="mr-2 text-white" /> Book with TNT
              </button>
            </div>
          </div>

          {showOpeningHours && (
            <div className="bg-white ml-165 mt-[-97px]">
              <p className="text-sm">Mon - Fri : 9:00am - 5:00pm</p>
              <p className="text-sm">Sat : 10:00am - 4:00pm</p>
              <p className="text-sm">Sun : Closed</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-5 mb-12">
          <div className="flex-1 flex justify-start">
            <button
              className="bg-[#e0dfdf] border-2 border-[#ff6f3d] text-gray-800 px-10 py-2 rounded-full text-base mt-8 ml-8 cursor-pointer transition-colors duration-300 hover:bg-[#d6d5d5]"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <button
              className="bg-[#ff6f3d] text-white px-10 py-2 rounded-full text-base font-bold mt-8 mr-8 cursor-pointer transition-colors duration-300 hover:bg-[#e65b29]"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupMethod;
