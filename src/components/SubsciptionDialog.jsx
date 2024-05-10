import React, { useState } from "react";
import { closeIcon, dropdown } from "../assets";

const SubscriptionDialog = ({ closeDialog }) => {
  const [subscriptionType, setSubscriptionType] = useState(
    "Select Subscrption Type"
  );
  const [planType, setPlanType] = useState("Select Plan Type");
  const [durationType, setDurationType] = useState("Select Duration Type");
  const [keyPointsType, setKeyPointsType] = useState("Plan Key Points");

  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isDuration, setIsDuration] = useState(false);
  const [isKeyPointsOpen, setIsKeyPointsOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleKeyPointsDropdown = () => {
    setIsKeyPointsOpen(!isKeyPointsOpen);
    setIsSubscriptionOpen(false);
    setIsPlanOpen(false);
    setIsDuration(false);
  };

  const handleKeyPlanClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    setIsKeyPointsOpen(false);
  };

  const handleSubClick = (option) => {
    setSubscriptionType(option);
    setIsSubscriptionOpen(false);
  };

  const handlePlanClick = (monthly) => {
    setPlanType(monthly);
    setIsPlanOpen(false);
  };

  const handleDurationClick = (month) => {
    setDurationType(month);
    setIsDuration(false);
  };

  const toggleSubscriptionDropdown = () => {
    setIsSubscriptionOpen(!isSubscriptionOpen);
    setIsPlanOpen(false);
    setIsDuration(false);
    setIsKeyPointsOpen(false);
  };

  const togglePlanDropdown = () => {
    setIsPlanOpen(!isPlanOpen);
    setIsSubscriptionOpen(false);
    setIsDuration(false);
    setIsKeyPointsOpen(false);
  };

  const toggleDurationDropdown = () => {
    setIsDuration(!isDuration);
    setIsSubscriptionOpen(false);
    setIsPlanOpen(false);
    setIsKeyPointsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center py-[2rem] justify-center">
      <div className="fixed inset-0 z-[999] flex items-center py-[2rem] justify-center bg-black bg-opacity-[40%]">
        <div className="bg-[#2E374B] rounded-lg md:w-[1084px] w-[378px] md:h-full h-[600px] overflow-auto p-8">
          <div className="flex items-center justify-between">
            <h2 className="md:h-[52px] font-inter font-[700] md:text-[30px] text-[24px] md:leading-[51px] text-new">
              Add New Subscription
            </h2>
            <button onClick={closeDialog}>
              <img
                src={closeIcon}
                alt="Close_Icon"
                className="md:w-[35px] w-[50px] md:h-[35px] h-[50px]"
              />
            </button>
          </div>
          <div className="flex flex-col mt-8 gap-2 md:flex hidden">
            <span className="w-[184px] h-[23px] text-white text-[20px] font-inter font-[500] leading-[16px]">
              Upload Title Image
            </span>
            <label
              htmlFor="fileInput"
              className="relative w-[482px] h-[142px] border-2 border-dotted border-[#ffffff] opacity-[50%] rounded-[10px] cursor-pointer"
            >
              <input
                id="fileInput"
                type="file"
                className="absolute inset-0 opacity-0 w-full h-full"
              />
              <span className="flex items-center justify-center py-14 font-inter font-[400] text-[13px] leading-[16px] text-white opacity-[50%]">
                Select
              </span>
            </label>
          </div>

          <div className="flex flex-col mt-[2rem] gap-4 md:w-[1006px] md:h-[520px]">
            <div className="flex md:flex-row flex-col md:gap-12 gap-4 md:mt-6 md:ml-0 ml-[-16px]">
              <div className="relative">
                <label
                  htmlFor="subscriptionType"
                  className="flex items-center justify-center bg-[#282F3E] text-white opacity-[50%]
                    md:w-[140px] w-[134px] md:h-[26px] h-[25px] rounded-[8px] font-[400] md:text-[14px] text-[13px] md:leading-[16px] leading-[15px] text-center"
                >
                  Subscription Type
                </label>
                <div className="relative">
                  <div className="relative">
                    <input
                      id="subscriptionType"
                      value={subscriptionType}
                      readOnly
                      onClick={toggleSubscriptionDropdown}
                      className="md:w-[482px] w-[345px] md:px-4 px-2 py-2 cursor-pointer rounded-md text-white border border-[#40495C] bg-[#282F3E]"
                    />
                    <img
                      src={dropdown}
                      alt="DropDown"
                      className="absolute inset-y-0 md:right-3 right-[-6px] w-[14px] h-[14px] top-[50%] transform -translate-y-1/2"
                    />
                  </div>
                  {isSubscriptionOpen && (
                    <div className="absolute z-10 mt-2 md:w-[482px] w-[345px] rounded-md bg-white shadow-lg">
                      <ul className="py-1">
                        <li
                          onClick={() => handleSubClick("Option")}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Option
                        </li>
                        <li
                          onClick={() => handleSubClick("Commodity")}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Commodity
                        </li>
                        <li
                          onClick={() => handleSubClick("Equity")}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Equity
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="planType"
                  className="flex items-center justify-center bg-[#282F3E] text-white opacity-[50%]
                    md:w-[90px] w-[88px] md:h-[26px] h-[25px] rounded-[8px] font-[400] md:text-[14px] text-[13px] md:leading-[16px] leading-[15px] text-center"
                >
                  Plan Name
                </label>
                <div className="relative">
                  <div className="relative">
                    <input
                      id="planType"
                      value={planType}
                      readOnly
                      onClick={togglePlanDropdown}
                      className="md:w-[482px] w-[345px] md:px-4 px-2 py-2 rounded-md text-white border border-[#40495C] bg-[#282F3E]"
                    />
                    <img
                      src={dropdown}
                      alt="DropDown"
                      className="absolute inset-y-0 md:right-3 right-[-6px] w-[14px] h-[14px] top-[50%] transform -translate-y-1/2"
                    />
                  </div>
                  {isPlanOpen && (
                    <div className="absolute z-10 mt-2 md:w-[482px] w-[345px] rounded-md bg-white shadow-lg">
                      <ul className="py-1">
                        <li
                          onClick={() => handlePlanClick("Monthly")}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Montly
                        </li>
                        <li
                          onClick={() => handlePlanClick("Quarterly")}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Quarterly
                        </li>
                        <li
                          onClick={() => handlePlanClick("Half-Yearly")}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Half-Yearly
                        </li>
                        <li
                          onClick={() => handlePlanClick("Yearly")}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Yearly
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex md:flex-row flex-col md:gap-12 gap-4 md:ml-0 ml-[-16px]">
              <div className="relative">
                <label
                  htmlFor="durationType"
                  className="flex items-center justify-center bg-[#282F3E] text-white opacity-[50%]
                  md:w-[80px] w-[78px] md:h-[26px] h-[25px] rounded-[8px] font-[400] md:text-[14px] text-[13px] md:leading-[16px] leading-[15px] text-center"
                >
                  Duration
                </label>
                <div className="relative">
                  <div className="relative">
                    <input
                      id="durationType"
                      value={durationType}
                      readOnly
                      onClick={toggleDurationDropdown}
                      className="md:w-[482px] w-[345px] px-4 py-2 cursor-pointer rounded-md text-white border border-[#40495C] bg-[#282F3E]"
                    />
                    <img
                      src={dropdown}
                      alt="DropDown"
                      className="absolute inset-y-0 md:right-3 right-[-6px] w-[14px] h-[14px] top-[50%] transform -translate-y-1/2"
                    />
                  </div>
                  {isDuration && (
                    <div className="absolute z-10 mt-2 md:w-[482px] w-[345px] rounded-md bg-white shadow-lg">
                      <ul className="py-1">
                        <li
                          onClick={() => handleDurationClick("1 Month")}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          1 Month
                        </li>
                        <li
                          onClick={() => handleDurationClick("3 Months")}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          3 Months
                        </li>
                        <li
                          onClick={() => handleDurationClick("6 Months")}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          6 Months
                        </li>
                        <li
                          onClick={() => handleDurationClick("12 Months")}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          12 Months
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="mb-0">
                  <label
                    className="flex items-center justify-center bg-[#282F3E] text-white opacity-[50%]
                  md:w-[70px] w-[68px] md:h-[26px] h-[25px] rounded-[8px] font-[400] md:text-[14px] text-[13px] md:leading-[16px] leading-[15px] text-center"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    id="default-input"
                    className="md:w-[482px] w-[345px] px-4 py-2 rounded-md text-white border border-[#40495C] bg-[#282F3E]"
                  />
                </div>
              </div>
            </div>

            <div className="relative md:ml-0 ml-[-16px]">
              <label
                htmlFor="keyPointsType"
                className="flex items-center justify-center bg-[#282F3E] text-white opacity-[50%]
                    md:w-[140px] w-[116px] md:h-[26px] h-[25px] rounded-[8px] font-[400] md:text-[14px] text-[13px] md:leading-[16px] leading-[15px] text-center"
              >
                Plan Key Points
              </label>
              <div className="relative">
                <div className="relative">
                  <input
                    id="default-input"
                    placeholder="Select your Key Points"
                    value={selectedItems.join(", ")}
                    readOnly
                    onClick={toggleKeyPointsDropdown}
                    className="md:w-[1012px] w-[345px] md:px-4 px-2 py-2 cursor-pointer rounded-md text-white border border-[#40495C] bg-[#282F3E]"
                  />
                  {isKeyPointsOpen && (
                    <div className="absolute z-10 mt-2 md:w-[1012px] w-[345px] rounded-md bg-white shadow-lg">
                      <ul className="py-1">
                        <li className="px-4 py-2 flex gap-4 text-sm text-gray-700 hover:bg-gray-100">
                          <input
                            type="checkbox"
                            id="expertInsights"
                            checked={selectedItems.includes("Expert Insights")}
                            onChange={() =>
                              handleKeyPlanClick("Expert Insights")
                            }
                          />
                          <label htmlFor="expertInsights">
                            Expert Insights
                          </label>
                        </li>
                        <li className="px-4 py-2 flex gap-4 text-sm text-gray-700 hover:bg-gray-100">
                          <input
                            type="checkbox"
                            id="performanceTracking"
                            checked={selectedItems.includes(
                              "Performance Tracking"
                            )}
                            onChange={() =>
                              handleKeyPlanClick("Performance Tracking")
                            }
                          />
                          <label htmlFor="performanceTracking">
                            Performance Tracking
                          </label>
                        </li>
                        <li className="px-4 py-2 flex gap-4 text-sm text-gray-700 hover:bg-gray-100">
                          <input
                            type="checkbox"
                            id="riskManagement"
                            checked={selectedItems.includes("Risk Management")}
                            onChange={() =>
                              handleKeyPlanClick("Risk Management")
                            }
                          />
                          <label htmlFor="riskManagement">
                            Risk Management
                          </label>
                        </li>
                        <li className="px-4 py-2 flex gap-4 text-sm text-gray-700 hover:bg-gray-100">
                          <input
                            type="checkbox"
                            id="marketsAlert"
                            checked={selectedItems.includes("Markets Alert")}
                            onChange={() => handleKeyPlanClick("Markets Alert")}
                          />
                          <label htmlFor="marketsAlert">Markets Alert</label>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative md:ml-0 ml-[-16px]">
              <div className="mb-0">
                <label
                  className="flex items-center justify-center bg-[#282F3E] text-white opacity-[50%]
                  md:w-[232px] w-[210px] md:h-[26px] h-[25px] rounded-[8px] font-[400] md:text-[14px] text-[13px] md:leading-[16px] leading-[15px] text-center"
                >
                  Premium Telegram Channel Link
                </label>
                <input
                  type="link"
                  id="default-input"
                  placeholder="Paste Link"
                  className="md:w-[1012px] w-[345px] py-2 px-4 rounded-md text-white border border-[#40495C] bg-[#282F3E]"
                />
              </div>
            </div>

            <div className="relative md:ml-0 ml-[-16px]">
              <label
                className="flex items-center justify-center bg-[#282F3E] text-white opacity-[50%]
                  w-[90px] h-[26px] rounded-[8px] font-[400] md:text-[14px] text-[13px] md:leading-[16px] leading-[13px] text-center"
              >
                Description
              </label>
              <textarea
                id="des-input"
                rows="4"
                className="block p-2 rounded-md text-white border border-[#40495C] bg-[#282F3E] md:w-full w-[105%]"
                placeholder="Write something here"
              ></textarea>
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-2 justify-end md:mt-0 mt-4">
            <button
              onClick={closeDialog}
              className="px-4 w-[100%] py-2 bg-blue-500 text-white md:text-[14px] text-[14px] rounded-lg hover:bg-blue-600"
            >
              Confirm
            </button>
            <button
              onClick={closeDialog}
              className="px-4 w-[100%] py-2 mr-2 bg-gray-300 md:text-[14px] text-[14px] text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDialog;
