import { useTheme } from "../../ThemeContext";
import { useState } from "react";
import Eth from "../../assets/Eth.svg";
import Tether from "../../assets/Tether.svg";
import Bitcoin from "../../assets/Bitcoin.svg";
import Coin from "../../Wallet/Coin.svg";
import { Wallet, Calculator, Lightbulb, Copy, ChevronDown, X, Search,CircleQuestionMark,MessageCircleQuestion } from "lucide-react";
import Cardano from "../../Market/Cardano.svg";
import Header from "../../Header/Header";
import Sidebar from "../../Sidebar/Sidebar";

// ── Data ─────────────────────────────────────────────
const cryptoList = [
  { symbol: "ETH",  name: "Ethereum", icon: Eth,      bal: "1 ETH",    usd: "$118,239" },
  { symbol: "BTC",  name: "Bitcoin",  icon: Bitcoin,  bal: "0.5 BTC",  usd: "$34,000"  },
  { symbol: "USDT", name: "Tether",   icon: Tether,   bal: "500 USDT", usd: "$500"     },
  { symbol: "ADA",  name: "Cardano",  icon: Cardano,  bal: "200 ADA",  usd: "$80"      },
];

const networkList = [
  { symbol: "TONCOIN", label: "TONCOIN TON",  full: "Toncoin(TON)",          fee: "0.01 ETH" },
  { symbol: "TRX",     label: "TRX",          full: "Tron(TRC20)",           fee: "0.8 USDT" },
  { symbol: "BSC",     label: "BSC",          full: "BNB Smart Chain(BEP20)",fee: "0 USDT"   },
  { symbol: "ETH",     label: "ETH",          full: "Ethereum(ERC20)",       fee: "3.8 USDT" },
];

const bankList = [
  "Opay Digital Bank",
  "Access Bank",
  "GTBank",
  "First Bank",
  "Zenith Bank",
];

const withdrawStepsCrypto = [
  { num: 1, title: "Select the Crypto",      desc: "Select crypto & network for withdraw"       },
  { num: 2, title: "Confirm Address",        desc: "Paste the copied withdrawal address."        },
  { num: 3, title: "Transfer Confirmation",  desc: "Await blockchain transfer confirmation."     },
  { num: 4, title: "Successful Withdrawal",  desc: "Blockchain transfer confirmed successfully." },
];

const withdrawStepsBank = [
  { num: 1, title: "Select the Crypto",     desc: "Select crypto & network for withdraw" },
  { num: 2, title: "Select Bank",           desc: "Enter Bank Account"                  },
  { num: 3, title: "Transfer Confirmation", desc: "Await bank transfer confirmation."    },
  { num: 4, title: "Successful Withdrawal", desc: "Bank transfer confirmed successfully." },
];

const faqItems = [
  "How long do withdrawals take?",
  "Why was my withdrawal rejected?",
  "Can I cancel a withdrawal...",
];

const withdrawRecords = [
  { date: "13/03/24 - 20:54:29", coin: "BTC", coinName: "Bitcoin", amount: "2.3", withdrawTo: "0x412313...hbdu12rex", record: "16asfzv6...hbdu12rex" },
  { date: "13/03/24 - 20:54:29", coin: "BTC", coinName: "Bitcoin", amount: "2.3", withdrawTo: "0x412313...hbdu12rex", record: "16asfzv6...hbdu12rex" },
  { date: "13/03/24 - 20:54:29", coin: "BTC", coinName: "Bitcoin", amount: "2.3", withdrawTo: "0x412313...hbdu12rex", record: "16asfzv6...hbdu12rex" },
  { date: "13/03/24 - 20:54:29", coin: "BTC", coinName: "Bitcoin", amount: "2.3", withdrawTo: "0x412313...hbdu12rex", record: "16asfzv6...hbdu12rex" },
];

export default function Withdraw() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [showSteps, setShowSteps]         = useState(true);

  // form state
  const [selectedCrypto,  setSelectedCrypto]  = useState(cryptoList[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(networkList[0]);
  const [address,         setAddress]         = useState("TDxA3Nk2L42RLa4jwCXCmo8tDoHLrJXhnb");
  const [selectedBank,    setSelectedBank]    = useState(bankList[0]);
  const [accountNumber,   setAccountNumber]   = useState("9095311593");
  const [amount,          setAmount]          = useState("1 ETH");
  const [remarks,         setRemarks]         = useState("None of your business!");

  // modals
  const [showCryptoModal,   setShowCryptoModal]   = useState(false);
  const [showNetworkModal,  setShowNetworkModal]  = useState(false);
  const [showBankModal,     setShowBankModal]     = useState(false);
  const [cryptoSearch,      setCryptoSearch]      = useState("");
  const [networkSearch,     setNetworkSearch]     = useState("");

  // toggle between crypto network mode and bank mode
  const [isBankMode, setIsBankMode] = useState(false);

  // ── Theme tokens ──────────────────────────────────
  const bg         = isDark ? "bg-[#0B0F1A]"   : "bg-[#F0F2F8]";
  const cardBg     = isDark ? "bg-[#141827]"   : "bg-white";
  const cardBorder = isDark ? "border-white/5" : "border-gray-200";
  const innerCard  = isDark ? "bg-[#1C2236]"   : "bg-gray-50";
  const tp         = isDark ? "text-white"      : "text-gray-900";
  const ts         = isDark ? "text-gray-400"   : "text-gray-500";
  const divider    = isDark ? "border-white/8" : "border-gray-100";
  const inputCls   = isDark
    ? "bg-[#1C2236] border-white/10 text-white placeholder:text-gray-600"
    : "bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400";
  const modalBg  = isDark ? "bg-[#141827]" : "bg-white";
  const hoverRow = isDark ? "hover:bg-white/5" : "hover:bg-gray-50";

  const filteredCrypto  = cryptoList.filter(c =>
    c.symbol.toLowerCase().includes(cryptoSearch.toLowerCase()) ||
    c.name.toLowerCase().includes(cryptoSearch.toLowerCase())
  );
  const filteredNetwork = networkList.filter(n =>
    n.label.toLowerCase().includes(networkSearch.toLowerCase()) ||
    n.full.toLowerCase().includes(networkSearch.toLowerCase())
  );

  const steps = isBankMode ? withdrawStepsBank : withdrawStepsCrypto;

  return (
    <div className={`relative min-h-screen ${bg} overflow-x-hidden transition-colors duration-300`}>

      {/* ── Header ── */}
      <div className={`fixed top-0 left-0 right-0 z-50 border-b ${cardBorder} ${isDark ? "bg-[#0B0F1A]" : "bg-white"}`}>
        <Header onToggleSidebar={() => setIsSidebarOpen(p => !p)} />
      </div>

      {/* ── Desktop Sidebar ── */}
      <div className={`hidden md:block w-[220px] fixed left-0 top-0 bottom-0 z-50 overflow-y-auto border-r ${isDark ? "bg-[#0B0F1A] border-white/5" : "bg-white border-gray-200"}`}>
        <Sidebar isOpen={true} />
      </div>

      {/* ── Mobile Sidebar ── */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className={`absolute top-0 left-0 h-full w-[220px] overflow-y-auto ${isDark ? "bg-[#0B0F1A]" : "bg-white"}`} onClick={e => e.stopPropagation()}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="pt-[57px] md:pl-[220px] min-h-screen">
        <div className="p-[14px] sm:p-[18px] md:p-[24px] lg:p-[28px] space-y-[16px] sm:space-y-[20px]">

          {/* ── Withdraw Steps Banner ── */}
          {showSteps && (
            <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px] md:p-[26px]`}>
              <div className="flex items-center justify-between mb-[16px] sm:mb-[20px]">
                <h2 className={`text-[16px] sm:text-[18px] md:text-[20px] font-bold ${tp}`}>Withdraw Steps</h2>
                <button onClick={() => setShowSteps(false)} className={`p-[6px] rounded-full transition-colors ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                  <X className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] sm:gap-[12px]">
                {steps.map(step => (
                  <div key={step.num} className={`${innerCard} rounded-[12px] sm:rounded-[14px] p-[14px] sm:p-[16px] border ${cardBorder}`}>
                    <div className="flex items-center gap-[8px] sm:gap-[10px] mb-[8px] sm:mb-[10px]">
                      <span className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] rounded-[6px] bg-[#1962F0] text-white text-[11px] sm:text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                        {step.num}
                      </span>
                      <span className="text-[12px] sm:text-[13px] font-semibold text-[#1962F0]">{step.title}</span>
                    </div>
                    <p className={`text-[11px] sm:text-[12px] ${ts} leading-relaxed`}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Form + Tips ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-[14px] sm:gap-[16px]">

            {/* ── Left: Form ── */}
            <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px] md:p-[26px]`}>
              <div className="relative">
                {/* Vertical connector */}
                <div className={`absolute left-[15px] sm:left-[17px] top-[40px] bottom-[120px] w-[2px] ${isDark ? "bg-white/10" : "bg-gray-200"}`} />

                <div className="space-y-[26px] sm:space-y-[30px]">

                  {/* Step 1: Select Crypto */}
                  <div className="flex gap-[14px] sm:gap-[16px]">
                    <div className="flex-shrink-0 w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-[10px] bg-[#1962F0] flex items-center justify-center z-10">
                      <img src={Coin} alt="coin" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-[13px] sm:text-[14px] font-semibold ${ts} mb-[10px] sm:mb-[12px]`}>Select Crypto</p>
                      <button
                        onClick={() => setShowCryptoModal(true)}
                        className={`w-full flex items-center justify-between px-[14px] sm:px-[16px] py-[12px] sm:py-[13px] rounded-[12px] border ${inputCls} transition-colors hover:border-[#4A7FD4]/50`}
                      >
                        <div className="flex items-center gap-[10px]">
                          <img src={selectedCrypto.icon} alt={selectedCrypto.symbol} className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px]" />
                          <span className={`text-[13px] sm:text-[14px] font-bold ${tp}`}>{selectedCrypto.symbol}</span>
                          <span className={`text-[12px] sm:text-[13px] ${ts}`}>{selectedCrypto.name}</span>
                        </div>
                        <ChevronDown className={`w-[16px] h-[16px] ${ts}`} />
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Withdraw To */}
                  <div className="flex gap-[14px] sm:gap-[16px]">
                    <div className="flex-shrink-0 w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-[10px] bg-[#1962F0] flex items-center justify-center z-10">
                      <Wallet className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-white" />
                    </div>
                    <div className="flex-1">
                      {/* Network / Bank toggle */}
                      <div className={`inline-flex items-center rounded-[10px] p-[3px] mb-[12px] sm:mb-[14px] ${isDark ? "bg-[#1C2236]" : "bg-gray-100"}`}>
                        <button
                          onClick={() => setIsBankMode(false)}
                          className={`px-[14px] sm:px-[16px] py-[6px] sm:py-[7px] rounded-[8px] text-[12px] sm:text-[13px] font-semibold transition-colors ${!isBankMode ? "bg-[#1962F0] text-white" : ts}`}
                        >
                          Network
                        </button>
                        <button
                          onClick={() => setIsBankMode(true)}
                          className={`px-[14px] sm:px-[16px] py-[6px] sm:py-[7px] rounded-[8px] text-[12px] sm:text-[13px] font-semibold transition-colors ${isBankMode ? "bg-[#4A7FD4] text-white" : ts}`}
                        >
                          Bank
                        </button>
                      </div>

                      {!isBankMode ? (
                        /* ── Crypto mode: Network + Address ── */
                        <div className="space-y-[10px] sm:space-y-[12px]">
                          {/* Network label */}
                          <p className={`text-[11px] sm:text-[12px] font-medium ${ts}`}>Network</p>
                          <button
                            onClick={() => setShowNetworkModal(true)}
                            className={`w-full flex items-center justify-between px-[14px] sm:px-[16px] py-[12px] sm:py-[13px] rounded-[12px] border ${inputCls} transition-colors hover:border-[#4A7FD4]/50`}
                          >
                            <span className={`text-[13px] sm:text-[14px] font-semibold ${tp}`}>
                              {selectedNetwork.label}
                            </span>
                            <ChevronDown className={`w-[16px] h-[16px] ${ts}`} />
                          </button>

                          {/* Address */}
                          <p className={`text-[11px] sm:text-[12px] font-medium ${ts} flex items-center justify-between`}>
                            <span>Address</span>
                            <span className="text-[#4A7FD4] cursor-pointer hover:opacity-80 text-[11px] sm:text-[12px]">Manage Address</span>
                          </p>
                          <div className={`flex items-center gap-[8px] px-[14px] sm:px-[16px] py-[12px] sm:py-[13px] rounded-[12px] border ${inputCls}`}>
                            <input
                              type="text"
                              value={address}
                              onChange={e => setAddress(e.target.value)}
                              className="bg-transparent outline-none text-[12px] sm:text-[13px] w-full"
                            />
                            {address && (
                              <button onClick={() => setAddress("")} className={`flex-shrink-0 ${ts} hover:text-white transition-colors`}>
                                <X className="w-[14px] h-[14px]" />
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* ── Bank mode: Bank + Account Number ── */
                        <div className="space-y-[10px] sm:space-y-[12px]">
                          <p className={`text-[11px] sm:text-[12px] font-medium ${ts}`}>Bank</p>
                          <button
                            onClick={() => setShowBankModal(true)}
                            className={`w-full flex items-center justify-between px-[14px] sm:px-[16px] py-[12px] sm:py-[13px] rounded-[12px] border ${inputCls} transition-colors hover:border-[#4A7FD4]/50`}
                          >
                            <span className={`text-[13px] sm:text-[14px] font-semibold ${tp}`}>{selectedBank}</span>
                            <ChevronDown className={`w-[16px] h-[16px] ${ts}`} />
                          </button>

                          <div className="flex items-center justify-between">
                            <p className={`text-[11px] sm:text-[12px] font-medium ${ts}`}>Account Number</p>
                            <span className="text-[#4A7FD4] text-[11px] sm:text-[12px] font-medium">Bilyamin Abiola Abdullahi</span>
                          </div>
                          <div className={`flex items-center gap-[8px] px-[14px] sm:px-[16px] py-[12px] sm:py-[13px] rounded-[12px] border ${inputCls}`}>
                            <input
                              type="text"
                              value={accountNumber}
                              onChange={e => setAccountNumber(e.target.value)}
                              className="bg-transparent outline-none text-[13px] sm:text-[14px] font-semibold w-full"
                            />
                            {accountNumber && (
                              <button onClick={() => setAccountNumber("")} className={`flex-shrink-0 ${ts} hover:text-white transition-colors`}>
                                <X className="w-[14px] h-[14px]" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 3: Withdraw Amount */}
                  <div className="flex gap-[14px] sm:gap-[16px]">
                    <div className="flex-shrink-0 w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-[10px] bg-[#1962F0] flex items-center justify-center z-10">
                      <Calculator className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-white" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-[13px] sm:text-[14px] font-semibold ${ts} mb-[10px] sm:mb-[12px]`}>Withdraw Amount</p>

                      <div className="space-y-[10px] sm:space-y-[12px]">
                        {/* Amount */}
                        <div className="flex items-center justify-between mb-[4px]">
                          <p className={`text-[11px] sm:text-[12px] font-medium ${ts}`}>
                            {isBankMode ? "Amount USD" : "Amount"}
                          </p>
                          <p className={`text-[11px] sm:text-[12px] ${ts}`}>
                            Available Balance: <span className={`font-semibold ${tp}`}>{isBankMode ? selectedCrypto.usd : selectedCrypto.bal}</span>
                          </p>
                        </div>
                        <input
                          type="text"
                          value={amount}
                          onChange={e => setAmount(e.target.value)}
                          className={`w-full px-[14px] sm:px-[16px] py-[12px] sm:py-[13px] rounded-[12px] border outline-none text-[13px] sm:text-[14px] font-semibold ${inputCls}`}
                        />

                        {/* Remarks */}
                        <p className={`text-[11px] sm:text-[12px] font-medium ${ts}`}>Remarks (optional)</p>
                        <input
                          type="text"
                          value={remarks}
                          onChange={e => setRemarks(e.target.value)}
                          className={`w-full px-[14px] sm:px-[16px] py-[12px] sm:py-[13px] rounded-[12px] border outline-none text-[13px] sm:text-[14px] ${inputCls}`}
                        />
                      </div>

                      {/* Summary */}
                      <div className="mt-[16px] sm:mt-[18px] flex flex-col items-end gap-[2px] mb-[12px] sm:mb-[14px]">
                        <span className={`text-[14px] sm:text-[15px] font-bold ${tp}`}>1 ETH</span>
                        <div className="flex items-center gap-[4px]">
                          <span className={`text-[11px] sm:text-[12px] ${ts}`}>Fee: 0.01 ETH</span>
                          <span className={`w-[14px] h-[14px] rounded-full border ${isDark ? "border-gray-600 text-gray-500" : "border-gray-300 text-gray-400"} flex items-center justify-center text-[9px] cursor-pointer`}>ⓘ</span>
                        </div>
                      </div>

                      {/* Submit */}
                      <button className="w-full bg-[#1962F0] hover:bg-[#2b19f0] text-white text-[14px] sm:text-[15px] font-bold py-[13px] sm:py-[14px] rounded-[12px] transition-colors">
                        Submit
                      </button>

                      <p className={`text-[11px] sm:text-[12px] ${ts} mt-[8px]`}>24-hour withdrawal limit: 0/10 BTC</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ── Right: Tips + FAQs ── */}
            <div className="space-y-[14px] sm:space-y-[16px]">
              {/* Tips */}
              <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
                <div className="flex items-center gap-[8px] mb-[14px] sm:mb-[16px]">
                  <Lightbulb className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] ${isDark?  "text-[#4A7FD4]" : "text-black" } `} />
                  <h3 className={`text-[14px] sm:text-[15px] font-bold ${tp}`}>Tips</h3>
                </div>
                <p className={`text-[12px] sm:text-[13px] ${ts} leading-relaxed`}>
                  For the safety of your funds, our customer support team may contact you by phone or email to confirm your withdrawal
                </p>
              </div>

              {/* FAQs */}
              <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
                <div className="flex items-center justify-between mb-[14px] sm:mb-[16px]">
                  <div className="flex items-center gap-[8px]">
                    <CircleQuestionMark alt="faq" className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] opacity-60 ${isDark? "text-white " : "text-black"}`} />
                    <h3 className={`text-[14px] sm:text-[15px] font-bold ${tp}`}>FAQs</h3>
                  </div>
                  <button className="flex items-center gap-[4px] text-[#4A7FD4] text-[12px] sm:text-[13px] font-medium hover:opacity-80">
                    View more <ChevronDown className="w-[14px] h-[14px]" />
                  </button>
                </div>
                <div className="space-y-[10px] sm:space-y-[12px]">
                  {faqItems.map((faq, i) => (
                    <button key={i} className={`w-full flex items-center gap-[8px] text-left rounded-[8px] py-[4px] px-[4px] ${hoverRow} transition-colors`}>
                       <MessageCircleQuestion alt="faq" className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] opacity-60 ${isDark? "text-white " : "text-black"}`} />
                      <span className={`text-[12px] sm:text-[13px] ${ts}`}>{faq}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Last 4 Withdraw Records ── */}
          <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] overflow-hidden`}>
            <div className="flex items-center justify-between px-[18px] sm:px-[22px] md:px-[26px] py-[16px] sm:py-[20px]">
              <h3 className={`text-[16px] sm:text-[18px] font-bold ${tp}`}>Last 4 Withdraw Records</h3>
              <button className="bg-[#4A7FD4] hover:bg-[#3B6EC3] text-white text-[12px] sm:text-[13px] font-semibold px-[14px] sm:px-[18px] py-[8px] sm:py-[9px] rounded-[10px] transition-colors whitespace-nowrap">
                Withdraw History
              </button>
            </div>

            <div className="overflow-x-auto [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-track]:bg-gray-800/20 [&::-webkit-scrollbar-thumb]:bg-gray-600/40 [&::-webkit-scrollbar-thumb]:rounded-full">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className={`border-b ${divider} ${isDark ? "bg-[#1C2236]/50" : "bg-gray-50"}`}>
                    {["Date/Time", "Coin", "Amount", "Withdraw to", "Blockchain Record", "Remarks", "Action"].map((col, i) => (
                      <th key={col} className={`px-[14px] sm:px-[18px] md:px-[22px] py-[12px] sm:py-[14px] text-[11px] sm:text-[12px] font-semibold ${ts} ${i === 0 ? "text-center" : "text-left"}`}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {withdrawRecords.map((row, i) => (
                    <tr key={i} className={`border-b ${divider} last:border-0 ${hoverRow} transition-colors`}>
                      <td className={`px-[14px] sm:px-[18px] md:px-[22px] py-[14px] sm:py-[16px] text-center text-[11px] sm:text-[12px] ${ts} whitespace-nowrap`}>{row.date}</td>
                      <td className="px-[14px] sm:px-[18px] md:px-[22px] py-[14px] sm:py-[16px]">
                        <p className={`text-[13px] sm:text-[14px] font-bold ${tp}`}>{row.coin}</p>
                        <p className={`text-[11px] sm:text-[12px] ${ts}`}>{row.coinName}</p>
                      </td>
                      <td className={`px-[14px] sm:px-[18px] md:px-[22px] py-[14px] sm:py-[16px] text-[13px] sm:text-[14px] font-medium ${tp}`}>{row.amount}</td>
                      <td className="px-[14px] sm:px-[18px] md:px-[22px] py-[14px] sm:py-[16px]">
                        <div className="flex items-center gap-[5px]">
                          <Copy className={`w-[11px] h-[11px] ${ts}`} />
                          <span className={`text-[11px] sm:text-[12px] ${ts}`}>{row.withdrawTo}</span>
                        </div>
                      </td>
                      <td className="px-[14px] sm:px-[18px] md:px-[22px] py-[14px] sm:py-[16px]">
                        <div className="flex items-center gap-[5px]">
                          <Copy className={`w-[11px] h-[11px] ${ts}`} />
                          <span className={`text-[11px] sm:text-[12px] ${ts}`}>{row.record}</span>
                        </div>
                      </td>
                      <td className={`px-[14px] sm:px-[18px] md:px-[22px] py-[14px] sm:py-[16px] text-[12px] sm:text-[13px] ${ts}`}>-</td>
                      <td className="px-[14px] sm:px-[18px] md:px-[22px] py-[14px] sm:py-[16px]">
                        <button className={`text-[11px] sm:text-[12px] font-medium px-[12px] sm:px-[14px] py-[5px] sm:py-[6px] rounded-[8px] border transition-colors ${isDark ? "border-white/15 text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════
          MODAL: Select Crypto
      ══════════════════════════════════ */}
      {showCryptoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[16px]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]" onClick={() => setShowCryptoModal(false)} />
          <div className={`relative w-full max-w-[440px] sm:max-w-[480px] rounded-[18px] sm:rounded-[22px] shadow-2xl ${modalBg} border ${cardBorder} overflow-hidden`}>
            <div className={`flex items-center justify-between px-[20px] sm:px-[24px] py-[16px] sm:py-[18px] border-b ${divider}`}>
              <h3 className={`text-[15px] sm:text-[16px] font-bold ${tp}`}>Select Crypto to Withdraw</h3>
              <button onClick={() => setShowCryptoModal(false)} className={`p-[6px] rounded-full ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"} transition-colors`}>
                <X className="w-[16px] h-[16px]" />
              </button>
            </div>
            <div className="px-[20px] sm:px-[24px] py-[14px] sm:py-[16px]">
              <div className={`flex items-center gap-[8px] px-[12px] sm:px-[14px] py-[9px] sm:py-[10px] rounded-[10px] border ${isDark ? "bg-[#1C2236] border-white/10 text-gray-300 placeholder:text-gray-600" : "bg-gray-50 border-gray-200 text-gray-700"}`}>
                <Search className="w-[14px] h-[14px] opacity-50 flex-shrink-0" />
                <input autoFocus type="text" placeholder="Search crypto" value={cryptoSearch} onChange={e => setCryptoSearch(e.target.value)} className="bg-transparent outline-none text-[13px] sm:text-[14px] w-full" />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[280px] sm:max-h-[320px]">
              {filteredCrypto.map((c, i) => (
                <button key={c.symbol} onClick={() => { setSelectedCrypto(c); setShowCryptoModal(false); setCryptoSearch(""); setAmount(""); }}
                  className={`w-full flex items-center justify-between px-[20px] sm:px-[24px] py-[12px] sm:py-[14px] ${hoverRow} transition-colors ${i < filteredCrypto.length - 1 ? `border-b ${divider}` : ""}`}>
                  <div className="flex items-center gap-[12px]">
                    <img src={c.icon} alt={c.symbol} className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]" />
                    <div className="text-left">
                      <p className={`text-[13px] sm:text-[14px] font-bold ${tp}`}>{c.symbol}</p>
                      <p className={`text-[11px] sm:text-[12px] ${ts}`}>{c.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-[13px] sm:text-[14px] font-semibold ${tp}`}>{c.bal}</p>
                    <p className={`text-[11px] sm:text-[12px] ${ts}`}>{c.usd}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          MODAL: Select Network (crypto mode)
      ══════════════════════════════════ */}
      {showNetworkModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[16px]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]" onClick={() => setShowNetworkModal(false)} />
          <div className={`relative w-full max-w-[440px] sm:max-w-[480px] rounded-[18px] sm:rounded-[22px] shadow-2xl ${modalBg} border ${cardBorder} overflow-hidden`}>
            <div className={`flex items-center justify-between px-[20px] sm:px-[24px] py-[16px] sm:py-[18px] border-b ${divider}`}>
              <h3 className={`text-[15px] sm:text-[16px] font-bold ${tp}`}>Select Withdrawal Network</h3>
              <button onClick={() => setShowNetworkModal(false)} className={`p-[6px] rounded-full ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"} transition-colors`}>
                <X className="w-[16px] h-[16px]" />
              </button>
            </div>
            <div className="px-[20px] sm:px-[24px] py-[14px] sm:py-[16px]">
              <div className={`flex items-center gap-[8px] px-[12px] sm:px-[14px] py-[9px] sm:py-[10px] rounded-[10px] border ${isDark ? "bg-[#1C2236] border-white/10 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-700"}`}>
                <Search className="w-[14px] h-[14px] opacity-50 flex-shrink-0" />
                <input autoFocus type="text" placeholder="Search network" value={networkSearch} onChange={e => setNetworkSearch(e.target.value)} className="bg-transparent outline-none text-[13px] sm:text-[14px] w-full" />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[280px] sm:max-h-[320px]">
              {filteredNetwork.map((n, i) => (
                <button key={n.symbol} onClick={() => { setSelectedNetwork(n); setShowNetworkModal(false); setNetworkSearch(""); }}
                  className={`w-full flex items-center justify-between px-[20px] sm:px-[24px] py-[13px] sm:py-[15px] ${hoverRow} transition-colors ${i < filteredNetwork.length - 1 ? `border-b ${divider}` : ""}`}>
                  <div className="text-left">
                    <p className={`text-[13px] sm:text-[14px] font-bold ${tp}`}>{n.label}</p>
                    <p className={`text-[11px] sm:text-[12px] ${ts}`}>{n.full}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-[11px] sm:text-[12px] ${ts}`}>Fee: <span className={`font-semibold ${tp}`}>{n.fee}</span></p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          MODAL: Select Bank (bank mode)
      ══════════════════════════════════ */}
      {showBankModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[16px]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]" onClick={() => setShowBankModal(false)} />
          <div className={`relative w-full max-w-[400px] sm:max-w-[440px] rounded-[18px] sm:rounded-[22px] shadow-2xl ${modalBg} border ${cardBorder} overflow-hidden`}>
            <div className={`flex items-center justify-between px-[20px] sm:px-[24px] py-[16px] sm:py-[18px] border-b ${divider}`}>
              <h3 className={`text-[15px] sm:text-[16px] font-bold ${tp}`}>Select Bank</h3>
              <button onClick={() => setShowBankModal(false)} className={`p-[6px] rounded-full ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"} transition-colors`}>
                <X className="w-[16px] h-[16px]" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[300px]">
              {bankList.map((bank, i) => (
                <button key={bank} onClick={() => { setSelectedBank(bank); setShowBankModal(false); }}
                  className={`w-full text-left px-[20px] sm:px-[24px] py-[13px] sm:py-[15px] text-[13px] sm:text-[14px] font-medium ${tp} ${hoverRow} transition-colors ${i < bankList.length - 1 ? `border-b ${divider}` : ""} ${selectedBank === bank ? "text-[#4A7FD4]" : ""}`}>
                  {bank}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}