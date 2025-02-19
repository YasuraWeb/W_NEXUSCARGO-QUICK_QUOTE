import React, { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const DelivaryMethod = () => {
  const [activeButton, setActiveButton] = useState(
    "Delivery Method - Sri Lanka"
  );
  const [selectedMethod, setSelectedMethod] = useState("");
  const [packageDetails, setPackageDetails] = useState(null);
  const [selectedPickupOption, setSelectedPickupOption] = useState("");
  const [showOpeningHours, setShowOpeningHours] = useState(null);
  const navigate = useNavigate();

  const buttons = [
    { label: "Package Details", link: "/", filled: !!packageDetails },
    {
      label: "Cargo Collection Method",
      link: "/PickupMethod",
      filled: !!selectedPickupOption,
    },
    {
      label: "Delivery Method - Sri Lanka",
      link: "/DelivaryMethod",
      filled: !!selectedMethod,
    },
    { label: "Clearance Option", link: "/ClearanceOptions", filled: false },
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("packageDetailsFormData");
    const savedPickupOption = localStorage.getItem("selectedPickupOption");
    const savedDeliveryOption = localStorage.getItem("selectedDeliveryOption");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setPackageDetails(parsedData);
    }

    if (savedPickupOption) {
      setSelectedPickupOption(savedPickupOption);
    }

    if (savedDeliveryOption) {
      setSelectedMethod(savedDeliveryOption);
    }
  }, []);

  const handleMethodChange = (value) => {
    setSelectedMethod(value);
    localStorage.setItem("selectedDeliveryOption", value);
  };

  const handleNext = () => {
    if (!selectedMethod) {
      alert("Please select a delivery option before proceeding.");
      return;
    }
    navigate("/ClearanceOptions");
  };

  const handleBack = () => {
    navigate("/PickupMethod");
  };

  const handleNavigation = (button) => {
    if (button.label === "Package Details" && !packageDetails) {
      alert("Please fill in the package details first.");
      return;
    }
    if (button.label === "Cargo Collection Method" && !packageDetails) {
      alert("Please fill in the package details first.");
      return;
    }
    if (
      button.label === "Delivery Method - Sri Lanka" &&
      !selectedPickupOption
    ) {
      alert("Please select a pickup method before proceeding.");
      return;
    }
    navigate(button.link);
    setActiveButton(button.label);
  };

  const formatSelectedMethod = (method) => {
    return method
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
                  (button.label === "Cargo Collection Method" &&
                    !packageDetails) ||
                  (button.label === "Delivery Method - Sri Lanka" &&
                    !selectedPickupOption) ||
                  (button.label === "Clearance Option" && !selectedMethod)
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
          <div className="flex-1 p-2 relative">
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
                  <p className="text-sm my-1">
                    Package Type: {card.packageType}
                  </p>
                  <p className="text-sm my-1">
                    Dimensions: {card.length}cm x {card.width}cm x {card.height}
                    cm
                  </p>
                  <p className="text-sm my-1">Quantity: {card.quantity}</p>
                  <hr className="my-2" />
                </div>
              ))}
          </div>
          <div className="flex-1 p-2 relative border-l-2 border-dashed border-gray-500">
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
          <div className="flex-1 p-2 relative border-l-2 border-dashed border-gray-500">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>Quote</span>
              <span
                className="text-red-600 cursor-pointer text-xs"
                onClick={() => navigate("/PickupMethod")}
              >
                (Edit)
              </span>
            </div>
            <p className="text-sm my-1">
              Cargo Collection Method: {selectedPickupOption || "Not selected"}
            </p>
            <p className="text-sm my-1">
              Delivery Method Sri Lanka:{" "}
              {selectedMethod
                ? formatSelectedMethod(selectedMethod)
                : "Not selected"}
            </p>
            <p className="text-sm my-1">Price:</p>
          </div>
        </div>

        <div className="w-[950px]  mt-10 p-10 ml-10">
          <h2 className="text-xl font-bold mb-5 text-left">
            Delivery Options - Sri Lanka
          </h2>
          <div className="flex justify-between gap-5">
            <div className="w-1/2 flex flex-col gap-3">
              <div
                className="bg-white border border-gray-300 rounded-lg shadow-sm p-3 flex items-center justify-start cursor-pointer transition-all hover:shadow-md"
                onClick={() => handleMethodChange("Home-Delivery")}
              >
                <input
                  type="radio"
                  id="Home-Delivery"
                  name="pickupMethod"
                  checked={selectedMethod === "Home-Delivery"}
                  onChange={() => handleMethodChange("Home-Delivery")}
                  className="mr-2 accent-[#0f2438]"
                />
                <label htmlFor="Home-Delivery">Home Delivery</label>
              </div>

              <div
                className="bg-white border border-gray-300 rounded-lg shadow-sm p-3 flex items-center justify-start cursor-pointer transition-all hover:shadow-md relative"
                onClick={() =>
                  handleMethodChange("Pickup-at-Kadawatha-Warehouse")
                }
              >
                <input
                  type="radio"
                  id="Pickup-at-Kadawatha-Warehouse"
                  name="pickupMethod"
                  checked={selectedMethod === "Pickup-at-Kadawatha-Warehouse"}
                  onChange={() =>
                    handleMethodChange("Pickup-at-Kadawatha-Warehouse")
                  }
                  className="mr-2 accent-[#0f2438]"
                />
                <label htmlFor="Pickup-at-Kadawatha-Warehouse">
                  Pick up at Kadawatha Warehouse
                </label>
                <button
                  className="absolute right-[-220px] top-1/2 transform -translate-y-1/2 bg-[#183650] text-white px-3 py-1 rounded-lg text-sm font-bold cursor-pointer shadow-sm hover:bg-[#0f2438] hover:shadow-md flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOpeningHours(
                      showOpeningHours === "Pickup-at-Kadawatha-Warehouse"
                        ? null
                        : "Pickup-at-Kadawatha-Warehouse"
                    );
                  }}
                >
                  <FiEye className="text-lg mr-1" /> View Opening Hours
                </button>
                {showOpeningHours === "Pickup-at-Kadawatha-Warehouse" && (
                  <div className="absolute top-0 right-[-410px] bg-gray-100 p-2 border border-gray-300 text-sm rounded-lg">
                    <p>Fri: 9:00am - 5:00pm</p>
                    <p>Sat: 10:00am - 4:00pm</p>
                    <p>Sun: Closed</p>
                  </div>
                )}
              </div>

              <div
                className="bg-white border border-gray-300 rounded-lg shadow-sm p-3 flex items-center justify-start cursor-pointer transition-all hover:shadow-md relative"
                onClick={() => handleMethodChange("Pick-up-at-Bond-Warehouse")}
              >
                <input
                  type="radio"
                  id="Pick-up-at-Bond-Warehouse"
                  name="pickupMethod"
                  checked={selectedMethod === "Pick-up-at-Bond-Warehouse"}
                  onChange={() =>
                    handleMethodChange("Pick-up-at-Bond-Warehouse")
                  }
                  className="mr-2 accent-[#0f2438]"
                />
                <label htmlFor="Pick-up-at-Bond-Warehouse">
                  Pick up at Bond Warehouse (Seeduwa)
                </label>
                <button
                  className="absolute right-[-220px] top-1/2 transform -translate-y-1/2 bg-[#183650] text-white px-3 py-1 rounded-lg text-sm font-bold cursor-pointer shadow-sm hover:bg-[#0f2438] hover:shadow-md flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOpeningHours(
                      showOpeningHours === "Pick-up-at-Bond-Warehouse"
                        ? null
                        : "Pick-up-at-Bond-Warehouse"
                    );
                  }}
                >
                  <FiEye className="text-lg mr-1" /> View Opening Hours
                </button>
                {showOpeningHours === "Pick-up-at-Bond-Warehouse" && (
                  <div className="absolute top-0 right-[-410px] bg-gray-100 p-2 border border-gray-300 text-sm rounded-lg">
                    <p>Fri: 9:00am - 5:00pm</p>
                    <p>Sat: 10:00am - 4:00pm</p>
                    <p>Sun: Closed</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5 mb-12">
          <div className="flex-1 flex justify-start">
            <button
              className="bg-gray-300 border-2 border-[#ff6f3d] text-gray-800 px-10 py-2 rounded-full text-base cursor-pointer transition-all hover:bg-gray-200 mt-7 ml-7"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <button
              className="bg-[#ff6f3d] text-white px-10 py-2 rounded-full text-base font-bold cursor-pointer transition-all hover:bg-[#e65b29] mt-7 mr-7"
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

export default DelivaryMethod;
