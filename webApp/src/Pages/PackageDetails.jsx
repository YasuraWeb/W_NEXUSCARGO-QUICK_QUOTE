import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SrilankaImage from "../assets/images/sl.png";
import AuImage from "../assets/images/au.png";
import Logo from "../assets/images/logo.png";

const PackageDetails = () => {
  const [activeButton, setActiveButton] = useState("Package Details");
  const [cards, setCards] = useState([
    {
      id: 1,
      packageType: "",
      length: "",
      width: "",
      height: "",
      quantity: "0",
    },
  ]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedPackageTypes, setSelectedPackageTypes] = useState([]);
  const [packageDetails, setPackageDetails] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const buttons = [
    { label: "Package Details", link: "/", filled: !!packageDetails },
    {
      label: "Cargo Collection Method",
      link: "/PickupMethod",
      filled: false,
    },
    {
      label: "Delivery Method - Sri Lanka",
      link: "/DelivaryMethod",
      filled: false,
    },
    { label: "Clearance Option", link: "/ClearanceOptions", filled: false },
  ];

  const packageOptions = [
    "Tea Chest Box",
    "Half Size Box",
    "Crate/Wood Box",
    "Custom Box",
    "Other Box",
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("packageDetailsFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setCards(parsedData.cards);
      setPackageDetails(parsedData);
      setOrigin(parsedData.origin);
      setDestination(parsedData.destination);
      const selectedTypes = parsedData.cards.map((card) => card.packageType);
      setSelectedPackageTypes(selectedTypes);
    }
  }, []);

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      packageType: "",
      length: "",
      width: "",
      height: "",
      quantity: "0",
    };
    setCards([...cards, newCard]);
  };

  const removeCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
    const removedCard = cards.find((card) => card.id === id);
    if (removedCard && removedCard.packageType) {
      setSelectedPackageTypes((prev) =>
        prev.filter((type) => type !== removedCard.packageType)
      );
    }
  };

  const validateFields = () => {
    const errors = {};

    if (!origin.trim()) {
      errors.origin = "Origin is required";
    }
    if (!destination.trim()) {
      errors.destination = "Destination is required";
    }

    cards.forEach((card, index) => {
      const cardErrors = {};

      if (!card.packageType.trim()) {
        cardErrors.packageType = "Package Type is required";
      }
      if (!card.length.trim()) {
        cardErrors.length = "Length is required";
      }
      if (!card.width.trim()) {
        cardErrors.width = "Width is required";
      }
      if (!card.height.trim()) {
        cardErrors.height = "Height is required";
      }
      if (!card.quantity.toString().trim() || parseInt(card.quantity) <= 0) {
        cardErrors.quantity = "Quantity is required and must be greater than 0";
      }

      if (Object.keys(cardErrors).length > 0) {
        errors[`card${index + 1}`] = cardErrors;
      }
    });

    setValidationErrors(errors);
    const isValid = Object.keys(errors).length === 0;
    setIsFormValid(isValid);
    return isValid;
  };

  const handleNext = () => {
    if (validateFields()) {
      const formData = {
        cards: cards.map((card) => ({
          id: card.id,
          packageType: card.packageType,
          length: card.length,
          width: card.width,
          height: card.height,
          quantity: card.quantity,
        })),
        origin,
        destination,
      };
      localStorage.setItem("packageDetailsFormData", JSON.stringify(formData));
      setPackageDetails(formData);
      navigate("/PickupMethod");
    } else {
      alert("Please fill all required fields.");
      console.log("Validation Errors:", validationErrors);
    }
  };

  const handleNavigation = (button) => {
    if (button.label === "Package Details" && !packageDetails) {
      alert("Please fill in the package details first.");
      return;
    }
    navigate(button.link);
    setActiveButton(button.label);
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
                className={`rounded-lg px-5 py-3 text-sm font-bold text-center transition-colors w-[230px] ${
                  activeButton === button.label
                    ? "bg-[#ff6f3d] text-white"
                    : "bg-gray-300 text-gray-700"
                } ${button.filled ? "border-2 border-[#ff6f3d]" : ""}`}
                disabled={
                  (button.label === "Cargo Collection Method" &&
                    !packageDetails) ||
                  (button.label === "Delivery Method - Sri Lanka" &&
                    !packageDetails) ||
                  (button.label === "Clearance Option" && !packageDetails)
                }
                onClick={() => handleNavigation(button)}
              >
                {button.label}
              </button>
              {index < buttons.length - 1 && (
                <div className="w-[30px] h-[2px] bg-gray-300 mx-1"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-5 ml-16">Location Details</h3>
          <div className="flex justify-center gap-32 ml-1 mr-6">
            <div className="mt-5 mb-10 flex-1 ml-16 w-1/3">
              <div className="relative w-full">
                <label className="absolute top-[-10px] left-2 bg-white px-1 text-sm font-bold text-gray-700">
                  Origin
                </label>
                <input
                  type="text"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6f3d]"
                  placeholder="Suburb or Postcode"
                  maxLength={20}
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
                {validationErrors.origin && (
                  <span className="text-red-500 text-xs absolute top-full left-0 mt-1">
                    {validationErrors.origin}
                  </span>
                )}
                <img
                  src={AuImage}
                  alt="Origin"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none"
                />
              </div>
            </div>
            <div className="mt-5 mb-10 flex-1 mr-20 w-1/3">
              <div className="relative w-full">
                <label className="absolute top-[-10px] left-2 bg-white px-1 text-sm font-bold text-gray-700">
                  Destination
                </label>
                <input
                  type="text"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6f3d]"
                  placeholder="Town or Postcode"
                  maxLength={20}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                {validationErrors.destination && (
                  <span className="text-red-500 text-xs absolute top-full left-0 mt-1">
                    {validationErrors.destination}
                  </span>
                )}
                <img
                  src={SrilankaImage}
                  alt="Destination"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-10 ml-16">Package Details</h3>
        {cards.map((card, index) => (
          <div key={card.id} className="relative mb-5 ml-16 max-w-[950px]">
            <Card
              id={card.id}
              removeCard={removeCard}
              packageOptions={packageOptions}
              showDeleteButton={index !== 0}
              validationErrors={validationErrors[`card${index + 1}`] || {}}
              savedData={card}
              selectedPackageTypes={selectedPackageTypes}
              setSelectedPackageTypes={setSelectedPackageTypes}
              setCards={setCards}
              cards={cards}
            />
          </div>
        ))}

        <div className="flex flex-col items-start gap-4">
          <button
            className="ml-16 mt-8 bg-white text-black px-4 py-2 border-2 border-[#ff6f3d] rounded-full"
            onClick={addCard}
          >
            ADD ANOTHER ITEM
          </button>
          <button
            className="mr-12 mb-12 bg-[#ff6f3d] text-white px-10 py-2 rounded-full font-bold self-end mt-2"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const Card = ({
  id,
  removeCard,
  packageOptions,
  showDeleteButton,
  validationErrors,
  savedData,
  selectedPackageTypes,
  setSelectedPackageTypes,
  setCards,
  cards,
}) => {
  const [packageType, setPackageType] = useState(savedData.packageType || "");
  const [length, setLength] = useState(savedData.length || "");
  const [width, setWidth] = useState(savedData.width || "");
  const [height, setHeight] = useState(savedData.height || "");
  const [quantity, setQuantity] = useState(savedData.quantity || "0");

  useEffect(() => {
    setPackageType(savedData.packageType || "");
    setLength(savedData.length || "");
    setWidth(savedData.width || "");
    setHeight(savedData.height || "");
    setQuantity(savedData.quantity || "0");
  }, [savedData]);

  const increaseQuantity = () =>
    setQuantity((prev) => (prev ? (parseInt(prev) + 1).toString() : "1"));
  const decreaseQuantity = () =>
    setQuantity((prev) =>
      prev && parseInt(prev) > 1 ? (parseInt(prev) - 1).toString() : "0"
    );

  const handlePackageTypeChange = (e) => {
    const selectedPackage = e.target.value;

    if (packageType) {
      setSelectedPackageTypes((prev) =>
        prev.filter((type) => type !== packageType)
      );
    }

    setPackageType(selectedPackage);

    if (
      selectedPackage === "Tea Chest Box" ||
      selectedPackage === "Half Size Box"
    ) {
      setSelectedPackageTypes((prev) => [...prev, selectedPackage]);
    }

    setLength("");
    setWidth("");
    setHeight("");
    setQuantity("0");
  };

  const handleDimensionChange = (e, setter) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
      setter(value);
    }
  };

  useEffect(() => {
    const updatedCards = cards.map((card) =>
      card.id === id
        ? { ...card, packageType, length, width, height, quantity }
        : card
    );
    setCards(updatedCards);
  }, [packageType, length, width, height, quantity]);

  return (
    <div className="border border-gray-300 rounded-2xl p-3 pl-8 shadow-[inset_2px_2px_5px_rgba(71,68,68,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] bg-white">
      <div className="mt-6 w-[850px] flex gap-10 ml-5 mb-6">
        <div className="flex-3">
          <div className="relative w-full">
            <label className="absolute top-[-10px] left-2 bg-white px-1 text-sm font-bold text-gray-700">
              Package Type
            </label>
            <select
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6f3d]"
              value={packageType}
              onChange={handlePackageTypeChange}
            >
              <option value="">Select Package Type</option>
              {packageOptions.map((option, index) => (
                <option
                  key={index}
                  value={option}
                  disabled={
                    (option === "Tea Chest Box" ||
                      option === "Half Size Box") &&
                    selectedPackageTypes.includes(option)
                  }
                >
                  {option}
                </option>
              ))}
            </select>
            {validationErrors.packageType && (
              <span className="text-red-500 text-xs absolute top-full left-0 mt-1">
                {validationErrors.packageType}
              </span>
            )}
          </div>
        </div>

        <div className="flex-[1.4]">
          <div className="relative w-full">
            <label className="absolute top-[-10px] left-2 bg-white px-1 text-sm font-bold text-gray-700">
              Length
            </label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6f3d] pl-3"
              value={length}
              onChange={(e) => handleDimensionChange(e, setLength)}
              disabled={!packageType}
            />
            {validationErrors.length && (
              <span className="text-red-500 text-xs absolute top-full left-0 mt-1">
                {validationErrors.length}
              </span>
            )}
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black text-xs pointer-events-none">
              cm
            </span>
          </div>
        </div>

        <div className="flex-[1.4]">
          <div className="relative w-full">
            <label className="absolute top-[-10px] left-2 bg-white px-1 text-sm font-bold text-gray-700">
              Width
            </label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6f3d] pl-3"
              value={width}
              onChange={(e) => handleDimensionChange(e, setWidth)}
              disabled={!packageType}
            />
            {validationErrors.width && (
              <span className="text-red-500 text-xs absolute top-full left-0 mt-1">
                {validationErrors.width}
              </span>
            )}
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black text-xs pointer-events-none">
              cm
            </span>
          </div>
        </div>

        <div className="flex-[1.4]">
          <div className="relative w-full">
            <label className="absolute top-[-10px] left-2 bg-white px-1 text-sm font-bold text-gray-700">
              Height
            </label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6f3d] pl-3 h-10"
              value={height}
              onChange={(e) => handleDimensionChange(e, setHeight)}
              disabled={!packageType}
            />
            {validationErrors.height && (
              <span className="text-red-500 text-xs absolute top-full left-0 mt-1">
                {validationErrors.height}
              </span>
            )}
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black text-xs pointer-events-none">
              cm
            </span>
          </div>
        </div>

        <div className="flex-[1.3]">
          <div className="relative w-full">
            <label className="absolute top-[-10px] left-2 bg-white px-1 text-sm font-bold text-gray-700">
              Quantity
            </label>
            <div className="flex items-center">
              <input
                type="text"
                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff6f3d] pl-10 h-10"
                value={quantity}
                readOnly
                disabled={!packageType}
              />
              <div className="flex flex-col ml-2 gap-1">
                <button
                  className="w-4 h-4 flex items-center justify-center bg-[#e0dfdf] text-[#ff6f3d] rounded-full text-sm font-bold hover:bg-gray-300 transition-colors"
                  onClick={increaseQuantity}
                  disabled={!packageType}
                >
                  +
                </button>
                <button
                  className="w-4 h-4 flex items-center justify-center bg-[#e0dfdf] text-[#ff6f3d] rounded-full text-sm font-bold hover:bg-gray-300 transition-colors"
                  onClick={decreaseQuantity}
                  disabled={!packageType}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteButton && (
        <button
          className="absolute top-0 right-2 text-red-500 text-xl hover:text-red-600"
          onClick={() => removeCard(id)}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default PackageDetails;
