import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const ClearanceOptions = () => {
  const [activeButton, setActiveButton] = useState("Clearance Option");
  const [selectedOption, setSelectedOption] = useState("");
  const [upbDetailsVisible, setUpbDetailsVisible] = useState(false);
  const [passport, setPassport] = useState("");
  const [presence, setPresence] = useState("");
  const [away, setAway] = useState("");
  const [nexus, setNexus] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [selectedPickupOption, setSelectedPickupOption] = useState("");
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const buttons = [
    {
      label: "Cargo Collection Method",
      link: "/PickupMethod",
      filled: !!selectedPickupOption,
    },
    {
      label: "Delivery Method - Sri Lanka",
      link: "/DelivaryMethod",
      filled: !!selectedDeliveryOption,
    },
    {
      label: "Clearance Option",
      link: "/ClearanceOptions",
      filled: !!selectedOption,
    },
    { label: "Summary", link: "/Summary", filled: false },
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
      const parsedData = JSON.parse(savedData);
      setPackageDetails(parsedData);
    }

    if (savedPickupOption) {
      setSelectedPickupOption(savedPickupOption);
    }

    if (savedDeliveryOption) {
      setSelectedDeliveryOption(savedDeliveryOption);
    }

    if (savedClearanceOption) {
      setSelectedOption(savedClearanceOption);
      if (savedClearanceOption === "UPB-passport") {
        setUpbDetailsVisible(true);
      }
    }

    if (savedUPBDetails) {
      const parsedUPBDetails = JSON.parse(savedUPBDetails);
      setPassport(parsedUPBDetails.passport);
      setPresence(parsedUPBDetails.presence);
      setAway(parsedUPBDetails.away);
      setNexus(parsedUPBDetails.nexus);
    }
  }, []);

  const handleCardClick = (option) => {
    setSelectedOption(option);
    localStorage.setItem("selectedClearanceOption", option);
    if (option === "UPB-passport") {
      setUpbDetailsVisible(true);
    } else {
      setUpbDetailsVisible(false);
    }
  };

  const handleNextButtonClick = () => {
    if (!selectedOption) {
      alert("Please select a clearance option before proceeding.");
      return;
    }

    if (selectedOption === "UPB-passport") {
      if (
        passport !== "yes" ||
        presence !== "yes" ||
        away !== "yes" ||
        !nexus
      ) {
        setShowError(true);
        return;
      }
      const upbDetails = { passport, presence, away, nexus };
      localStorage.setItem("upbDetails", JSON.stringify(upbDetails));
    }

    navigate("/summary");
  };

  const handleBackButtonClick = () => {
    navigate("/DelivaryMethod");
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
    if (button.label === "Clearance Option" && !selectedDeliveryOption) {
      alert("Please select a delivery method before proceeding.");
      return;
    }
    if (button.label === "Summary") {
      if (selectedOption === "UPB-passport") {
        if (
          passport !== "yes" ||
          presence !== "yes" ||
          away !== "yes" ||
          !nexus
        ) {
          setShowError(true);
          return;
        }
      }
      if (!selectedOption) {
        alert("Please select a clearance option before proceeding.");
        return;
      }
    }
    navigate(button.link);
    setActiveButton(button.label);
  };

  const cardDetails = {
    Prepaid: [
      "Nexus Cargo will take care of the custom clearance process on behalf of the Consignee.",
      " ",
      "Since Nexus Cargo pays the custom duty charges (if applicable) on behalf of the Consignee, please note that you, as the sender are liable to reimburse these charges (if applicable) to Nexus Cargo within 24hours of receiving the additional invoice for custom duty. Cargo will be released for delivery or collection once all outstanding payments are received in full. Failure to clear these invoices may result in you being liable for Demurrage charges.",
      " ",
      "Failure to clear all outstanding invoices may result in you being liable for Demurrage Charges for keeping the goods uncleared in the Warehouse.",
      " ",
      "If you are unclear about any of the above, please feel free to contact us during business hours, and we will be happy to assist you further.",
      " ",
    ],
    "UPB-passport": [
      "Ensure you have a valid Sri Lankan passport/citizen to claim your passport allowance when returning back to Sri Lanka",
      "You must ensure you are physically present in Sri Lanka at the time of clearing goods from Bond Warehouse",
      "If you are unable to present yourself to customs while you are in Sri Lanka, Nexus can present your passport with a letter of authorisation and return your passport with your goods if you have selected the delivery option.",
    ],
    "Self-Clearance": [
      "You have selected self clearance option .This option is for consignee to clear cargo themselves",
      "You must attend bond warehouse through an appointment which can be organized by Nexus Cargo",
      "Consignee must pay the relevant custom duty for his/her cargo to the Sri Lanka Customs.",
      "If consignee requires transport of their cargo after they have cleared, it can be organized through Nexus Cargo",
    ],
  };

  useEffect(() => {
    if (selectedOption === "UPB-passport") {
      if (passport === "no" || presence === "no" || away === "no") {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }
  }, [passport, presence, away, selectedOption]);

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
                    ? "bg-[#ff6f3d] text-white"
                    : "bg-[#e0dfdf] text-[#555555]"
                } ${
                  button.filled ? "border-2 border-[#ff6f3d]" : ""
                } disabled:opacity-50`}
                disabled={
                  (button.label === "Cargo Collection Method" &&
                    !packageDetails) ||
                  (button.label === "Delivery Method - Sri Lanka" &&
                    !selectedPickupOption) ||
                  (button.label === "Clearance Option" &&
                    !selectedDeliveryOption) ||
                  (button.label === "Summary" &&
                    (selectedOption === "UPB-passport"
                      ? passport !== "yes" ||
                        presence !== "yes" ||
                        away !== "yes" ||
                        !nexus
                      : !selectedOption))
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
                  <p className="text-sm">Quantity: {card.quantity}</p>
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
              {selectedDeliveryOption || "Not selected"}
            </p>
            <p className="text-sm my-1">Price:</p>
          </div>
        </div>

        <div className=" p-10  mt-10 mx-16 ml-10">
          {" "}
          <div className="flex justify-between gap-5">
            <div className="w-1/2 flex flex-col gap-4">
              {Object.keys(cardDetails).map((key) => (
                <div
                  className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex items-center justify-start cursor-pointer transition-shadow hover:shadow-md"
                  key={key}
                  onClick={() => handleCardClick(key)}
                >
                  <input
                    type="radio"
                    id={key}
                    name={key}
                    checked={selectedOption === key}
                    onChange={() => handleCardClick(key)}
                    className="mr-3 accent-[#0f2438]"
                  />
                  <label htmlFor={key} className="flex-1">
                    {key}
                  </label>
                  <span
                    className="ml-auto font-bold accent-[#0f2438] cursor-pointer"
                    onMouseEnter={() => setHoveredCard(key)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </span>
                </div>
              ))}
            </div>

            <div className="w-1/2 relative">
              {hoveredCard && (
                <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-8 absolute top-0 right-0 w-full">
                  <h4 className="font-bold mb-4">{hoveredCard}</h4>
                  {cardDetails[hoveredCard].map((detail, index) => (
                    <p key={index} className="text-sm mb-2">
                      {detail}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* UPB Additional Section */}
        {upbDetailsVisible && (
          <div className="bg-gray-50 p-5 rounded-lg mt-5 mx-16">
            <h3 className="font-bold mb-4">
              Please select the requirement of the UPB Option:
            </h3>

            <div className="mb-4">
              <p className="text-sm mb-2">
                Do you have a valid Sri Lankan passport or Dual Citizenship?
              </p>
              <label className="mr-4">
                <input
                  type="radio"
                  name="passport"
                  value="yes"
                  checked={passport === "yes"}
                  onChange={(e) => setPassport(e.target.value)}
                  className="mr-2"
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="passport"
                  value="no"
                  checked={passport === "no"}
                  onChange={(e) => setPassport(e.target.value)}
                  className="mr-2"
                />{" "}
                No
              </label>
            </div>

            <div className="mb-4">
              <p className="text-sm mb-2">
                Will you be physically present when your cargo reaches Sri
                Lanka?
              </p>
              <label className="mr-4">
                <input
                  type="radio"
                  name="presence"
                  value="yes"
                  checked={presence === "yes"}
                  onChange={(e) => setPresence(e.target.value)}
                  className="mr-2"
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="presence"
                  value="no"
                  checked={presence === "no"}
                  onChange={(e) => setPresence(e.target.value)}
                  className="mr-2"
                />{" "}
                No
              </label>
            </div>

            <div className="mb-4">
              <p className="text-sm mb-2">
                Have you been away from Sri Lanka for more than 3 months?
              </p>
              <label className="mr-4">
                <input
                  type="radio"
                  name="away"
                  value="yes"
                  checked={away === "yes"}
                  onChange={(e) => setAway(e.target.value)}
                  className="mr-2"
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="away"
                  value="no"
                  checked={away === "no"}
                  onChange={(e) => setAway(e.target.value)}
                  className="mr-2"
                />{" "}
                No
              </label>
              {showError && (
                <p className="text-red-500 font-bold mt-2">
                  If you select 'No' for any of the above questions, the UPB
                  option is not applicable for you. Please ensure all
                  requirements are met to proceed.
                </p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm mb-2">
                Do you want Nexus Cargo to clear your cargo on your behalf using
                your passport?
              </p>
              <p className="text-sm text-gray-600 mb-2">
                You will be required to hand over your passport to one of our
                staff with a letter, and we will return the passport with your
                cargo after clearance.
                <br /> (Additional fees apply)
                <br />
                If “No” is selected, you will have to present your passport
                yourself to SL customs.
              </p>
              <label className="mr-4">
                <input
                  type="radio"
                  name="nexus"
                  value="yes"
                  checked={nexus === "yes"}
                  onChange={(e) => setNexus(e.target.value)}
                  className="mr-2"
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="nexus"
                  value="no"
                  checked={nexus === "no"}
                  onChange={(e) => setNexus(e.target.value)}
                  className="mr-2"
                />{" "}
                No
              </label>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-5 mb-10 mx-16">
          <div className="flex-1 flex justify-start">
            <button
              className="bg-gray-200 border-2 border-[#ff6f3d] text-gray-800 px-10 py-2 rounded-full text-base transition-colors hover:bg-gray-300"
              onClick={handleBackButtonClick}
            >
              Back
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <button
              className="bg-[#ff6f3d] text-white px-10 py-2 rounded-full text-base font-bold transition-colors hover:bg-orange-600"
              onClick={handleNextButtonClick}
              disabled={
                selectedOption === "UPB-passport"
                  ? passport !== "yes" ||
                    presence !== "yes" ||
                    away !== "yes" ||
                    !nexus
                  : !selectedOption
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearanceOptions;
