import React, { useState, useEffect } from "react";
import { filter, notificationSlider, searchIcon } from "../assets";
import {
  subscriptionData,
  transcationData,
  withdrawalData,
} from "../constants";
import WalletWithdrawal from "./WalletWithdrawal";
import EarningAnalysis from "./EarningAnalysis";
import RejectUpiOpen from "./RejectUpiOpen";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Wallet = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showTransactions, setShowTransactions] = useState("transaction");
  const [isEditUpiOpen, setIsEditUpiOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [transactionTable, setTransactionTable] = useState([]);
  const [withdrawalReq, setWithdrawalReq] = useState([]);
  const [getBankID, setGetBankID] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const stackholderId = sessionStorage.getItem("stackholderId");

  const WALLET_BALANCE_URL = `https://copartners.in:5135/api/Wallet/GetWalletWithdrawalBalance/${stackholderId}?userType=RA`;

  const TRANSACTION_API = `https://copartners.in:5132/api/RADashboard/GetDashboardRAListingData/${stackholderId}?page=1&pageSize=10`;

  const WITHDRAWAL_REQ_API = `https://copartners.in:5135/api/Withdrawal/GetWithdrawalByUserId/${stackholderId}?userType=RA&page=1&pageSize=10`;

  const BANK_API = `https://copartners.in:5135/api/Withdrawal/GetBankUPIById/${getBankID}`;

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(WALLET_BALANCE_URL);
        setWalletBalance(response.data.data);
      } catch (error) {
        console.error("Error fetching the wallet balance:", error);
        setWalletBalance("Error");
      }
    };

    fetchWalletBalance();
  }, []);

  useEffect(() => {
    const fetchWalletReqBalance = async () => {
      try {
        const response = await axios.get(WITHDRAWAL_REQ_API);
        setWithdrawalReq(response.data.data);
      } catch (error) {
        console.error("Error fetching the wallet balance:", error);
        setWithdrawalReq("Error");
      }
    };

    fetchWalletReqBalance();
  }, [WITHDRAWAL_REQ_API]);

  useEffect(() => {
    const fetchTransactionTable = async () => {
      try {
        const response = await axios.get(TRANSACTION_API);
        const sortedData = response.data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTransactionTable(sortedData);
        setFilteredTransactions(sortedData);
      } catch (error) {
        console.error("Error fetching the wallet balance:", error);
        setTransactionTable("Error");
      }
    };

    fetchTransactionTable();
  }, []);

  useEffect(() => {
    if (getBankID) {
      axios.get(BANK_API).then((res) => {
        setWithdrawalReq(res.data.data);
      });
    }
  }, [getBankID, BANK_API]);

  useEffect(() => {
    const checkScreenSize = () => {
      setSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const openEditUpiDialog = (row) => {
    setSelectedRow(row);
    setIsEditUpiOpen(true);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setIsEditUpiOpen(false);
    setSelectedRow(null);
  };

  const handleTab = (id) => {
    setShowTransactions(id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getStatusText = (action) => {
    switch (action) {
      case "A":
        return "Success";
      case "P":
        return "Pending";
      case "R":
        return "Rejected";
      default:
        return action;
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    filterTransactions(value, startDate, endDate);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    filterTransactions(searchInput, start, end);
  };

  const filterTransactions = (searchValue, startDate, endDate) => {
    let filtered = transactionTable;

    if (searchValue) {
      filtered = filtered.filter((row) =>
        row.userMobileNo.includes(searchValue)
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter((row) => {
        const date = new Date(row.date);
        return date >= startDate && date <= endDate;
      });
    }

    setFilteredTransactions(filtered);
  };

  return (
    <div className="pb-[5rem] xl:pl-[12rem] md:pl-[10rem] pl-6 md:py-[6rem] pt-[8rem] bg-gradient min-h-screen">
      <div className="xl:w-[1520px] md:w-[1130px] w-[350px] flex md:flex-row flex-col justify-between">
        <span className="md:w-[176px] w-[58px] md:h-[27px] h-[28px] font-inter md:text-[22px] text-[20px] font-[600] leading-[27px] text-[#ffffff]">
          Wallet
        </span>
        <div className="flex flex-row justify-between items-center md:mr-4 mr-0">
          <span className="md:w-[320px] w-[233px] md:h-[27px] h-[19px] text-white font-inter font-[600] md:text-[22px] text-[16px] md:leading-[27px] leading-[19px] md:mr-[3rem] mr-0">
            Withdrawal Balance :{" "}
            <span className="text-white opacity-[40%]">
              ₹{walletBalance?.withdrawalBalance}
            </span>
          </span>
          <button
            onClick={openDialog}
            className="md:w-[147px] w-[128px] md:h-[40px] h-[35px] rounded-[10px] border text-black bg-[#ffffff] font-[600] font-inter text-[12px]"
          >
            Withdrawal
          </button>
          {isDialogOpen && (
            <WalletWithdrawal
              isDialogOpen={isDialogOpen}
              closeDialog={closeDialog}
              walletBalance={walletBalance}
            />
          )}
        </div>
      </div>

      <EarningAnalysis stackholderId={stackholderId} />

      <div className="flex flex-col md:gap-6 gap-3">
        <div className="flex flex-row items-center justify-between md:ml-0 ml-[-8px]">
          <div className="xl:w-[1420px] md:w-[1030px] flex flex-col gap-4 mt-4">
            <div className="flex md:justify-between items-center">
              <span className="text-white md:w-[210px] w-[140px] h-[27px] font-inter font-[600] text-[22px] md:leading-[27px] leading-[22px] md:mt-0 mt-[-1rem]">
                Transaction History
              </span>
              {showTransactions === "transaction" && (
                <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center md:mr-[-6rem]">
                  <div className="relative md:mr-4 mr-0">
                    <img
                      src={searchIcon}
                      alt=""
                      className="cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 w-[19px] h-[19px]"
                    />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={handleSearchChange}
                      placeholder="Search"
                      className="pl-10 md:pr-4 bg-[#2E323C] md:w-[252px] h-[55px] text-white rounded-[10px]"
                    />
                  </div>
                  <div className="ml-0">
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      isClearable
                      placeholderText="Select Date range"
                      className="bg-[#2E323C] md:w-[252px] h-[55px] text-white rounded-[10px] px-4"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-row md:gap-4 gap-2">
              <button
                onClick={() => setShowTransactions("transaction")}
                className={`w-[120px] h-[40px] rounded-[10px] border-solid border-[1px] border-white text-black ${
                  showTransactions === "transaction"
                    ? "bg-[#ffffff] font-[600] font-inter text-[12px]"
                    : "bg-transparent text-white font-[600] font-inter text-[12px]"
                }`}
              >
                User Statement
              </button>
              <button
                onClick={() => setShowTransactions("withdrawal")}
                className={`w-[90px] h-[40px] rounded-[10px] border-solid border-[1px] border-white text-black ${
                  showTransactions === "withdrawal"
                    ? "bg-[#ffffff] font-[600] font-inter text-[12px]"
                    : "bg-transparent text-white font-[600] font-inter text-[12px]"
                }`}
              >
                Transaction
              </button>
              <button
                onClick={() => setShowTransactions("request")}
                className={`w-[140px] h-[40px] rounded-[10px] border-solid border-[1px] border-white text-black ${
                  showTransactions === "request"
                    ? "bg-[#ffffff] font-[600] font-inter text-[12px]"
                    : "bg-transparent text-white font-[600] font-inter text-[12px]"
                }`}
              >
                Withdrawal Request
              </button>
            </div>
          </div>
        </div>

        {showTransactions === "transaction" && (
          <>
            {smallScreen ? (
              <div className="flex flex-col pl-[5rem] flex-wrap justify-center items-center">
                {filteredTransactions &&
                  filteredTransactions
                    .slice(0, 5)
                    .filter((row) => row.subscription.trim() !== "No Subscrption")
                    .map((row, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-around w-[358px] ml-[-6rem] h-[248px] bg-[#18181B] bg-opacity-[50%] rounded-[30px] md:m-4 m-[10px] p-4"
                      >
                        <div className="flex flex-row justify-between">
                          <p className="w-[173px] h-[26px] font-[600] text-[16px] leading-[25px] text-lightWhite">
                            {row.transactionId}
                          </p>
                        </div>
                        <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                          <span className="text-dimWhite">DATE:</span>{" "}
                          {formatDate(row.date)}
                        </span>
                        <span className="flex items-center justify-between sm:w-[305px] h-[34px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                          <span className="text-dimWhite">SUBSCRIPTION:</span>{" "}
                          {row.subscription}
                        </span>
                        <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                          <span className="text-dimWhite">PLAN NAME:</span>{" "}
                          {row.planType}
                        </span>
                        <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                          <span className="text-dimWhite">User Number:</span>{" "}
                          {row.userMobileNo}
                        </span>
                        <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                          <span className="text-dimWhite">AMOUNT:</span>{" "}
                          {row.amount}
                        </span>
                      </div>
                    ))}
                <button className="items-center mr-[6rem] mt-2 justify-center flex w-[110px] h-[30px] rounded-[6px] bg-lightWhite text-[10px] font-[500] leading-[12px]">
                  Show More
                </button>
              </div>
            ) : (
              <table className="xl:w-[1520px] md:w-[1130px] md:h-full p-8 h-[497px] px-[1rem] bg-[#29303F] rounded-[30px]">
                <thead className="text-dimWhite md:h-[60px] h-0">
                  <tr>
                    <th className="text-center px-4">Transaction ID</th>
                    <th className="text-center px-4">Date</th>
                    <th className="text-center px-4">Subscription</th>
                    <th className="text-center px-4">Plan Name</th>
                    <th className="text-center px-4">User Number</th>
                    <th className="text-start px-4">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-lightWhite">
                  {filteredTransactions &&
                    filteredTransactions
                    .filter((row) => row.subscription.trim() !== "No Subscrption")
                      .map((row, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-[#1E1E22]" : ""}
                        >
                          <td className="text-center font-[500] text-[16px] leading-[18px] px-4">
                            {row.transactionId}
                          </td>
                          <td className="text-center font-[500] text-[16px] leading-[18px] px-4">
                            {formatDate(row.date)}
                          </td>
                          <td className="text-center font-[500] text-[16px] leading-[18px] px-4">
                            {row.subscription}
                          </td>
                          <td className="text-center font-[500] text-[16px] leading-[18px] px-4">
                            {row.planType}
                          </td>
                          <td className="text-center font-[500] text-[16px] leading-[18px] px-4">
                            {row.userMobileNo}
                          </td>
                          <td className="text-start font-[500] text-[16px] leading-[18px] px-4">
                            {row.amount}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {showTransactions === "withdrawal" && (
          <>
            {smallScreen ? (
              <div className="flex flex-col pl-[5rem] flex-wrap justify-center items-center">
                {withdrawalReq.slice(0, 5).map((row, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-around w-[358px] ml-[-6rem] h-[248px] bg-[#18181B] bg-opacity-[50%] rounded-[30px] md:m-4 m-[10px] p-4"
                  >
                    <div className="flex flex-row justify-between">
                      <p className="w-[173px] h-[26px] font-[600] text-[16px] leading-[25px] text-lightWhite">
                        {row.transcationId}
                      </p>
                    </div>
                    <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                      <span className="text-dimWhite">DATE:</span>{" "}
                      {formatDate(row.withdrawalRequestDate)}
                    </span>
                    <span className="flex items-center justify-between sm:w-[305px] h-[34px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                      <span className="text-dimWhite">BANK:</span>{" "}
                      {row.withdrawal}
                    </span>
                    <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                      <span className="text-dimWhite">ACCOUNT NUMBER:</span>{" "}
                      {row.accNum}
                    </span>
                    <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                      <span className="text-dimWhite">AMOUNT:</span>{" "}
                      {row.amount}
                    </span>
                  </div>
                ))}
                <button className="items-center mr-[6rem] mt-2 justify-center flex w-[110px] h-[30px] rounded-[6px] bg-lightWhite text-[10px] font-[500] leading-[12px]">
                  Show More
                </button>
              </div>
            ) : (
              <table className="xl:w-[1520px] md:w-[1130px] md:h-auto h-[497px] px-[1rem] bg-[#29303F] rounded-[30px]">
                <thead className="text-dimWhite w-[1084px] h-[51px]">
                  <tr>
                    <th className="text-start pl-[4rem]">Transaction ID</th>
                    <th className="text-start pl-[4rem]">Date</th>
                    <th className="text-start pl-[4rem]">Bank</th>
                    <th className="text-start pl-[0rem]">Account Number</th>
                    <th className="text-start pl-[4rem]">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-lightWhite w-[1084px] h-[81px]">
                  {withdrawalReq.map((row, index) => {
                    return (
                      row.requestAction === "A" && (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-[#1E1E22]" : ""}
                        >
                          <td className="pl-[4rem] font-[500] text-[16px] leading-[18px]">
                            {/* {row.transcationId} */}
                          </td>
                          <td className="pl-[4rem] font-[500] text-[16px] leading-[18px]">
                            {/* {row.date} */}
                            {formatDate(row.withdrawalRequestDate)}
                          </td>
                          <td className="pl-[4rem] w-[143px] h-[36px] font-[500] text-[16px] leading-[18px]">
                            {row.paymentMode}
                          </td>
                          <td className="pl-[4rem] w-[143px] h-[36px] font-[500] text-[16px] leading-[18px]">
                            {/* {row.accountNumber} */}
                            {row.paymentMode === "Bank"
                              ? row.accountNumber
                              : row.upI_ID}
                          </td>
                          <td className="pl-[4rem] w-[105px] h-[18px] font-[500] text-[16px] leading-[18px]">
                            {row.amount}
                          </td>
                        </tr>
                      )
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}

        {showTransactions === "request" && (
          <>
            {smallScreen ? (
              <div className="flex flex-col pl-[5rem] flex-wrap justify-center items-center">
                {withdrawalReq
                  .filter((row) => String(row.requestAction).trim() !== "A")
                  .slice(0, 5)
                  .map((row, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-around w-[358px] ml-[-6rem] ml- h-[248px] bg-[#18181B] bg-opacity-[50%] rounded-[30px] md:m-4 m-[10px] p-4"
                    >
                      <div className="flex flex-row justify-between">
                        <p className="w-[173px] h-[26px] font-[600] text-[16px] leading-[25px] text-lightWhite">
                          {row.transcationId}
                        </p>
                        <div
                          className="font-[600] text-[16px] leading-[25px] text-lightWhite pl-[4rem]"
                          style={{
                            color:
                              row.status === "Pending" ? "#FB923C" : "#E24966",
                          }}
                        >
                          {row.status === "Pending" ? (
                            <div>{row.requestAction}</div>
                          ) : (
                            <button
                              className="text-[14px]"
                              onClick={() => openEditUpiDialog(row)}
                            >
                              {getStatusText(row.requestAction)}
                            </button>
                          )}
                          {isEditUpiOpen && row.requestAction === "R" && (
                            <RejectUpiOpen
                              isOpen={isEditUpiOpen}
                              onClose={closeDialog}
                            />
                          )}
                        </div>
                      </div>
                      <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                        <span className="text-dimWhite">DATE:</span>{" "}
                        {formatDate(row.withdrawalRequestDate)}
                      </span>
                      <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                        <span className="text-dimWhite">BANK:</span>{" "}
                        {row.paymentMode}
                      </span>
                      <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                        <span className="text-dimWhite">ACCOUNT NUMBER:</span>{" "}
                        {row.accNum}
                      </span>
                      <span className="flex items-center justify-between sm:w-[305px] h-[13px] font-[500] text-[14px] leading-[12px] text-lightWhite">
                        <span className="text-dimWhite">AMOUNT:</span>{" "}
                        {row.amount}
                      </span>
                    </div>
                  ))}
                <button className="items-center mr-[6rem] mt-2 justify-center flex w-[110px] h-[30px] rounded-[6px] bg-lightWhite text-[10px] font-[500] leading-[12px]">
                  Show More
                </button>
              </div>
            ) : (
              <table className="xl:w-[1520px] md:w-[1130px] md:h-auto h-[497px] px-[1rem] bg-[#29303F] rounded-[30px]">
                <thead className="text-dimWhite w-[1084px] h-[51px]">
                  <tr>
                    <th className="text-start pl-[4rem]">Request ID</th>
                    <th className="text-start pl-[4rem]">Date</th>
                    <th className="text-start">Bank</th>
                    <th className="pl-[4rem] text-start">Account Number</th>
                    <th className="text-start pl-[4rem]">Amount</th>
                    <th className="text-start pl-[4rem]">Status</th>
                  </tr>
                </thead>
                <tbody className="text-lightWhite w-[1084px] h-[81px]">
                  {withdrawalReq &&
                    withdrawalReq.map(
                      (row, index) =>
                        row.requestAction !== "A" && (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-[#18181B]" : ""}
                          >
                            <td className="pl-[4rem] font-[500] text-[16px] leading-[18px]">
                              {/* {row.transcationId} */}
                            </td>
                            <td className="pl-[4rem] font-[500] text-[16px] leading-[18px]">
                              {formatDate(row.withdrawalRequestDate)}
                            </td>
                            <td className="w-[143px] h-[36px] font-[500] text-[16px] leading-[18px]">
                              {row.paymentMode}
                            </td>
                            <td className="px-[4rem] w-[143px] h-[36px] font-[500] text-[16px] leading-[18px]">
                              {row.paymentMode === "Bank"
                                ? row.accountNumber
                                : row.upI_ID}
                            </td>
                            <td className="pl-[4rem] w-[105px] h-[18px] font-[500] text-[16px] leading-[18px]">
                              {row.amount}
                            </td>
                            <td
                              className={`pl-[4rem] ${
                                row.status === "Pending"
                                  ? "bg-red-500"
                                  : "bg-transparent text-[#E24966]"
                              }`}
                            >
                              {row.status === "Pending" ? (
                                <div>{getStatusText(row.requestAction)}</div>
                              ) : (
                                <button
                                  onClick={() =>
                                    row.requestAction === "R" &&
                                    openEditUpiDialog(row)
                                  }
                                >
                                  {getStatusText(row.requestAction)}
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                    )}
                  {isEditUpiOpen && selectedRow && selectedRow.requestAction === "R" && (
                    <RejectUpiOpen
                      isOpen={isEditUpiOpen}
                      onClose={closeDialog}
                      withdrawalReq={selectedRow}
                    />
                  )}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;
