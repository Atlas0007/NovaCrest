import { useTheme } from "../../ThemeContext";
import { useState } from "react";
import Bitcoin from "../../assets/Bitcoin.svg";
import Eth from "../../assets/Eth.svg";
import Tether from "../../assets/Tether.svg";
import Cardano from "../../Market/Cardano.svg";
import Doge from "../../Market/Doge.svg";
import Coin from "../../Wallet/Coin.svg";
import Network from "../../Wallet/Network.svg";
import Qr from "../../Wallet/Qr.svg";
import Question from "../../Wallet/Question.svg";
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";
import { ChevronDown, ChevronUp, Search, Copy, Lightbulb, X,MessageCircleQuestion,CircleQuestionMark } from "lucide-react";

// ── Data ──────────────────────────────────────────────
const cryptoList = [
  { symbol: "ADA",  name: "Cardano",  icon: Cardano,  bal: "0.00" },
  { symbol: "ETH",  name: "Ethereum", icon: Eth,      bal: "0.00" },
  { symbol: "BTC",  name: "Bitcoin",  icon: Bitcoin,  bal: "0.00" },
  { symbol: "DOGE", name: "Dogecoin", icon: Doge,     bal: "0.00" },
  { symbol: "USDT", name: "Tether",   icon: Tether,   bal: "0.00" },
];

const networkList = [
  { symbol: "TRX",     name: "Tron(TRC20)",          arrival: "≈ 1m 44s", fee: "0.8 USDT (~0.80 USD)"  },
  { symbol: "BSC",     name: "BNB Smart Chain(BEP20)",arrival: "≈ 1m 19s", fee: "0 USDT (~0.00 USD)"   },
  { symbol: "TONCOIN", name: "Toncoin(TON)",          arrival: "≈ 2m 50s", fee: "0 USDT (~0.00 USD)"   },
  { symbol: "ARB",     name: "Arbitrum One(ARB)",     arrival: "≈ 0m 57s", fee: "0.15 USDT (~0.15 USD)" },
  { symbol: "ETH",     name: "Ethereum(ERC20)",       arrival: "≈ 5m 18s", fee: "3.8 USDT (~3.80 USD)"  },
];

const depositRecords = [
  { date: "13/03/24 - 20:54:29", coin: "BTC", coinName: "Bitcoin", amount: "1.2", record: "16asfzv6...hbdu12rex" },
  { date: "13/03/24 - 20:54:29", coin: "BTC", coinName: "Bitcoin", amount: "1.2", record: "16asfzv6...hbdu12rex" },
  { date: "13/03/24 - 20:54:29", coin: "BTC", coinName: "Bitcoin", amount: "1.2", record: "16asfzv6...hbdu12rex" },
  { date: "13/03/24 - 20:54:29", coin: "BTC", coinName: "Bitcoin", amount: "1.2", record: "16asfzv6...hbdu12rex" },
];

const depositSteps = [
  { num: 1, title: "Copy the wallet address", desc: "Select crypto, network & copy address." },
  { num: 2, title: "Confirm Address",         desc: "Paste address on other exchange."       },
  { num: 3, title: "Transfer Confirmation",   desc: "Await blockchain confirmation for transfer." },
  { num: 4, title: "Successful Deposit",      desc: "FalconX will send assets to wallet."    },
];

const faqItems = [
  "How to deposit on FalconX?",
  "What is a crypto network?",
  "What network should I use?",
];

export default function Deposit() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [showSteps, setShowSteps]         = useState(true);

  // selected state
  const [selectedCrypto,  setSelectedCrypto]  = useState(cryptoList[4]); // USDT default
  const [selectedNetwork, setSelectedNetwork] = useState(null);

  // modals
  const [showCryptoModal,  setShowCryptoModal]  = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);

  // modal search/tabs
  const [cryptoSearch,  setCryptoSearch]  = useState("");
  const [cryptoTab,     setCryptoTab]     = useState("Recent");
  const [networkSearch, setNetworkSearch] = useState("");
  const [networkSort,   setNetworkSort]   = useState("Most popular");
  const [copied,        setCopied]        = useState(false);

  const walletAddress = "TPdBs4gzVawph92jsR2toaqdBs4gzVwph92j2t";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Theme tokens ──
  const bg         = isDark ? "bg-[#0B0F1A]"   : "bg-[#F0F2F8]";
  const cardBg     = isDark ? "bg-[#141827]"   : "bg-white";
  const cardBorder = isDark ? "border-white/5" : "border-gray-200";
  const innerCard  = isDark ? "bg-[#1C2236]"   : "bg-gray-50";
  const tp         = isDark ? "text-white"      : "text-gray-900";
  const ts         = isDark ? "text-white"   : "text-black";
  const divider    = isDark ? "border-white/8" : "border-gray-100";
  const inputCls   = isDark
    ? "bg-[#1C2236] border-white/10 text-gray-300 placeholder:text-gray-600"
    : "bg-gray-50 border-gray-200 text-gray-700 placeholder:text-gray-400";
  const modalBg    = isDark ? "bg-[#141827]"   : "bg-white";
  const hoverRow   = isDark ? "hover:bg-white/5" : "hover:bg-gray-50";

  const filteredCrypto  = cryptoList.filter(c =>
    c.symbol.toLowerCase().includes(cryptoSearch.toLowerCase()) ||
    c.name.toLowerCase().includes(cryptoSearch.toLowerCase())
  );
  const filteredNetwork = networkList.filter(n =>
    n.symbol.toLowerCase().includes(networkSearch.toLowerCase()) ||
    n.name.toLowerCase().includes(networkSearch.toLowerCase())
  );

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

          {/* ── Deposit Steps Banner ── */}
          {showSteps && (
            <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px] md:p-[26px]`}>
              <div className="flex items-center justify-between mb-[16px] sm:mb-[20px]">
                <h2 className={`text-[16px] sm:text-[18px] md:text-[20px] font-bold ${tp}`}>Deposit Steps</h2>
                <button onClick={() => setShowSteps(false)} className={`p-[6px] rounded-full ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"} transition-colors`}>
                  <X className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] sm:gap-[12px]">
                {depositSteps.map((step) => (
                  <div key={step.num} className={`${innerCard} rounded-[12px] sm:rounded-[14px] p-[14px] sm:p-[16px] border ${cardBorder}`}>
                    <div className="flex items-center gap-[8px] sm:gap-[10px] mb-[8px] sm:mb-[10px]">
                      <span className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] rounded-[6px] bg-[#1962F0] text-white text-[11px] sm:text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                        {step.num}
                      </span>
                      <span className="text-[12px] sm:text-[13px] font-semibold text-[#4A7FD4]">{step.title}</span>
                    </div>
                    <p className={`text-[11px] sm:text-[12px] ${ts} leading-relaxed`}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Main Form + Tips ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-[14px] sm:gap-[16px]">

            {/* Left: Form */}
            <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px] md:p-[26px]`}>

              {/* Vertical step line */}
              <div className="relative">
                {/* Step connector line */}
                <div className={`absolute left-[15px] sm:left-[17px] top-[40px] bottom-[40px] w-[2px] ${isDark ? "bg-white/10" : "bg-gray-200"}`} />

                <div className="space-y-[28px] sm:space-y-[32px]">

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
                          <span className={`text-[13px] sm:text-[14px] font-semibold ${tp}`}>{selectedCrypto.symbol}</span>
                          <span className={`text-[12px] sm:text-[13px] ${ts}`}>{selectedCrypto.name}</span>
                        </div>
                        <ChevronDown className={`w-[16px] h-[16px] ${ts}`} />
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Select Network */}
                  <div className="flex gap-[14px] sm:gap-[16px]">
                    <div className="flex-shrink-0 w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-[10px] bg-[#1962F0] flex items-center justify-center z-10">
                      <img src={Network} alt="network" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-[13px] sm:text-[14px] font-semibold ${ts} mb-[10px] sm:mb-[12px]`}>Select Network</p>
                      <button
                        onClick={() => setShowNetworkModal(true)}
                        className={`w-full flex items-center justify-between px-[14px] sm:px-[16px] py-[12px] sm:py-[13px] rounded-[12px] border ${inputCls} transition-colors hover:border-[#4A7FD4]/50`}
                      >
                        {selectedNetwork ? (
                          <div className="flex flex-col items-start">
                            <span className={`text-[13px] sm:text-[14px] font-semibold ${tp}`}>{selectedNetwork.symbol} <span className={`font-normal ${ts}`}>{selectedNetwork.name.split("(")[1]?.replace(")", "") || ""}</span></span>
                            <span className={`text-[11px] sm:text-[12px] ${ts}`}>Expected Arrival: {selectedNetwork.arrival.replace("≈ ", "").replace("m ", "min ").replace("s", "sec")}</span>
                          </div>
                        ) : (
                          <span className={`text-[13px] sm:text-[14px] ${ts}`}>Select Network you want to deposit through</span>
                        )}
                        <ChevronDown className={`w-[16px] h-[16px] ${ts} flex-shrink-0`} />
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Copy Wallet Address */}
                  <div className="flex gap-[14px] sm:gap-[16px]">
                    <div className={`flex-shrink-0 w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-[10px] flex items-center justify-center z-10 ${selectedNetwork ? "bg-[#1962F0]" : isDark ? "bg-white/5" : "bg-gray-100"}`}>
                    <Copy alt="copy" className={`w-[16px] text-white h-[16px] sm:w-[18px] sm:h-[18px] ${!selectedNetwork ? "opacity-30" : ""}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-[13px] sm:text-[14px] font-semibold mb-[10px] sm:mb-[12px] ${selectedNetwork ? ts : isDark ? "text-gray-600" : "text-gray-300"}`}>Copy Wallet Address</p>

                      {selectedNetwork && (
                        <div className={`${innerCard} border ${cardBorder} rounded-[14px] sm:rounded-[16px] p-[16px] sm:p-[18px] md:p-[20px]`}>
                          <div className="flex items-start justify-between gap-[16px]">
                            <div className="flex-1">
                              <p className={`text-[13px] sm:text-[14px] font-bold ${tp} mb-[8px] sm:mb-[10px]`}>{selectedNetwork.name} address is published!</p>
                              <p className={`text-[11px] sm:text-[12px] ${ts} leading-relaxed mb-[14px] sm:mb-[16px]`}>
                                Please use the address below to deposit your cryptocurrency using the {selectedNetwork.symbol} network. You can either copy the address or scan the QR code for convenience.
                              </p>
                              <div className={`flex items-center gap-[8px] px-[12px] sm:px-[14px] py-[9px] sm:py-[10px] rounded-[10px] border ${isDark ? "bg-[#0B0F1A] border-white/10" : "bg-white border-gray-200"}`}>
                                <span className={`text-[11px] sm:text-[12px] font-mono ${ts} flex-1 truncate`}>{walletAddress}</span>
                                <button onClick={handleCopy} className="flex items-center gap-[4px] text-white rounded-[10px]  border-2 text-[11px] sm:text-[12px] font-semibold hover:opacity-80 px-[20px] py-[5px] bg-blue-700 transition-opacity flex-shrink-0">
                                  <Copy className="w-[12px] h-[12px]" />
                                  {copied ? "Copied!" : "copy"}
                                </button>
                              </div>
                            </div>
                            <div className="flex-shrink-0 w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] rounded-[10px] overflow-hidden bg-white p-[4px]">
                              <img src={Qr} alt="QR Code" className="w-full h-full object-contain" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right: Tips + FAQs */}
            <div className="space-y-[14px] sm:space-y-[16px]">
              {/* Tips */}
              <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
                <div className="flex items-center gap-[8px] mb-[14px] sm:mb-[16px]">
                  <Lightbulb className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] ${isDark?  "text-[#4A7FD4]" : "text-black" } `} />
                  <h3 className={`text-[14px] sm:text-[15px] font-bold ${tp}`}>Tips</h3>
                </div>
                <div className="space-y-[12px] sm:space-y-[14px]">
                  {[0, 1].map((i) => (
                    <p key={i} className={`text-[12px] text-[#32343A] font-semibold sm:text-[13px] ${ts} leading-relaxed ${i === 0 ? `pb-[12px] sm:pb-[14px] border-b ${divider}` : ""}`}>
                      For the safety of your funds, our customer support team may contact you by phone to confirm your withdrawal
                    </p>
                  ))}
                </div>
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
                    <button key={i} className={`w-full flex items-center gap-[8px] text-left ${hoverRow} rounded-[8px] py-[4px] px-[4px] transition-colors`}>
                       <MessageCircleQuestion alt="faq" className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] opacity-60 ${isDark? "text-white " : "text-black"}`} />
                      <span className={`text-[12px] sm:text-[13px] ${ts}`}>{faq}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Last 4 Deposit Records ── */}
          <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] overflow-hidden`}>
            <div className="flex items-center justify-between px-[18px] sm:px-[22px] md:px-[26px] py-[16px] sm:py-[20px]">
              <h3 className={`text-[16px] sm:text-[18px] font-bold ${tp}`}>Last 4 Deposit Records</h3>
              <button className="bg-[#4A7FD4] hover:bg-[#3B6EC3] text-white text-[12px] sm:text-[13px] font-semibold px-[14px] sm:px-[18px] py-[8px] sm:py-[9px] rounded-[10px] transition-colors">
                Deposit History
              </button>
            </div>

            <div className="overflow-x-auto [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-track]:bg-gray-800/20 [&::-webkit-scrollbar-thumb]:bg-gray-600/40 [&::-webkit-scrollbar-thumb]:rounded-full">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className={`border-b ${divider} ${isDark ? "bg-[#1C2236]/50" : "bg-gray-50"}`}>
                    {["Date/Time", "Coin", "Amount", "Blockchain Record", "Remarks", "Action"].map((col, i) => (
                      <th key={col} className={`px-[16px] sm:px-[20px] md:px-[24px] py-[12px] sm:py-[14px] text-[11px] sm:text-[12px] font-semibold ${ts} ${i === 0 ? "text-center" : "text-left"}`}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {depositRecords.map((row, i) => (
                    <tr key={i} className={`border-b ${divider} last:border-0 ${hoverRow} transition-colors`}>
                      <td className={`px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px] text-center text-[12px] sm:text-[13px] ${ts} whitespace-nowrap`}>{row.date}</td>
                      <td className="px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px]">
                        <p className={`text-[13px] sm:text-[14px] font-bold ${tp}`}>{row.coin}</p>
                        <p className={`text-[11px] sm:text-[12px] ${ts}`}>{row.coinName}</p>
                      </td>
                      <td className={`px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px] text-[13px] sm:text-[14px] font-medium ${tp}`}>{row.amount}</td>
                      <td className="px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px]">
                        <div className="flex  items-center gap-[6px]">
                            <button > <Copy className={`w-[12px] h-[12px] ${ts}`} />  </button>
                          <span className={`text-[12px] sm:text-[13px] ${ts}`}>{row.record}</span>
                        </div>
                      </td>
                      <td className={`px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px] text-[13px] sm:text-[14px] ${ts}`}>-</td>
                      <td className="px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px]">
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
            {/* Modal Header */}
            <div className={`flex items-center justify-between px-[20px] sm:px-[24px] py-[16px] sm:py-[18px] border-b ${divider}`}>
              <h3 className={`text-[15px] sm:text-[16px] font-bold ${tp}`}>Select Crypto to Deposit</h3>
              <button onClick={() => setShowCryptoModal(false)} className={`p-[6px] rounded-full ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"} transition-colors`}>
                <X className="w-[16px] h-[16px]" />
              </button>
            </div>

            {/* Search */}
            <div className="px-[20px] sm:px-[24px] py-[14px] sm:py-[16px]">
              <div className={`flex items-center gap-[8px] px-[12px] sm:px-[14px] py-[9px] sm:py-[10px] rounded-[10px] border ${inputCls}`}>
                <Search className="w-[14px] h-[14px] opacity-50 flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search crypto"
                  value={cryptoSearch}
                  onChange={e => setCryptoSearch(e.target.value)}
                  className="bg-transparent outline-none text-[13px] sm:text-[14px] w-full"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-[6px] px-[20px] sm:px-[24px] pb-[12px] sm:pb-[14px]">
              {["Recent", "All", "Favorite"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setCryptoTab(tab)}
                  className={`px-[12px] sm:px-[14px] py-[5px] sm:py-[6px] rounded-[8px] text-[11px] sm:text-[12px] font-medium border transition-colors ${cryptoTab === tab ? "border-[#4A7FD4] text-[#4A7FD4] bg-[#4A7FD4]/10" : `${cardBorder} ${ts} ${hoverRow}`}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="overflow-y-auto max-h-[280px] sm:max-h-[320px] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-600/40 [&::-webkit-scrollbar-thumb]:rounded-full">
              {filteredCrypto.map((c, i) => (
                <button
                  key={c.symbol}
                  onClick={() => { setSelectedCrypto(c); setShowCryptoModal(false); setCryptoSearch(""); }}
                  className={`w-full flex items-center justify-between px-[20px] sm:px-[24px] py-[12px] sm:py-[14px] ${hoverRow} transition-colors ${i < filteredCrypto.length - 1 ? `border-b ${divider}` : ""}`}
                >
                  <div className="flex items-center gap-[12px]">
                    <img src={c.icon} alt={c.symbol} className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]" />
                    <div className="text-left">
                      <p className={`text-[13px] sm:text-[14px] font-bold ${tp}`}>{c.symbol}</p>
                      <p className={`text-[11px] sm:text-[12px] ${ts}`}>{c.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-[13px] sm:text-[14px] font-semibold ${tp}`}>{c.bal}</p>
                    <p className={`text-[11px] sm:text-[12px] ${ts}`}>≈ 0.00 USDT</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          MODAL: Select Network
      ══════════════════════════════════ */}
      {showNetworkModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[16px]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]" onClick={() => setShowNetworkModal(false)} />
          <div className={`relative w-full max-w-[460px] sm:max-w-[500px] rounded-[18px] sm:rounded-[22px] shadow-2xl ${modalBg} border ${cardBorder} overflow-hidden`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between px-[20px] sm:px-[24px] py-[16px] sm:py-[18px] border-b ${divider}`}>
              <h3 className={`text-[15px] sm:text-[16px] font-bold ${tp}`}>Please Select a Deposit Network</h3>
              <button onClick={() => setShowNetworkModal(false)} className={`p-[6px] rounded-full ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"} transition-colors`}>
                <X className="w-[16px] h-[16px]" />
              </button>
            </div>

            {/* Warning banner */}
            <div className="px-[20px] sm:px-[24px] pt-[14px] sm:pt-[16px]">
              <div className={`flex items-center gap-[10px] px-[14px] sm:px-[16px] py-[10px] sm:py-[11px] rounded-[10px] ${isDark ? "bg-[#1C2236] border border-white/10" : "bg-blue-50 border border-blue-100"}`}>
                <span className="text-[18px]">🌐</span>
                <p className={`text-[11px] sm:text-[12px] ${ts} leading-snug`}>Make sure your selected crypto and deposit network match, or assets may be lost.</p>
              </div>
            </div>

            {/* Search */}
            <div className="px-[20px] sm:px-[24px] py-[12px] sm:py-[14px]">
              <div className={`flex items-center gap-[8px] px-[12px] sm:px-[14px] py-[9px] sm:py-[10px] rounded-[10px] border ${inputCls}`}>
                <Search className="w-[14px] h-[14px] opacity-50 flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search network"
                  value={networkSearch}
                  onChange={e => setNetworkSearch(e.target.value)}
                  className="bg-transparent outline-none text-[13px] sm:text-[14px] w-full"
                />
              </div>
            </div>

            {/* Sort pills */}
            <div className="flex items-center gap-[6px] px-[20px] sm:px-[24px] pb-[12px] sm:pb-[14px] flex-wrap">
              <span className={`text-[11px] sm:text-[12px] ${ts} flex items-center gap-[4px] mr-[4px]`}>
                <span className="text-[12px]">⇅</span> Sort by:
              </span>
              {["Most popular", "Fastest", "Less confirmations"].map(s => (
                <button
                  key={s}
                  onClick={() => setNetworkSort(s)}
                  className={`px-[10px] sm:px-[12px] py-[4px] sm:py-[5px] rounded-[8px] text-[11px] sm:text-[12px] font-medium border transition-colors ${networkSort === s ? "border-[#4A7FD4] text-[#4A7FD4] bg-[#4A7FD4]/10" : `${cardBorder} ${ts} ${hoverRow}`}`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Network list */}
            <div className="overflow-y-auto max-h-[280px] sm:max-h-[320px] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-600/40 [&::-webkit-scrollbar-thumb]:rounded-full">
              {filteredNetwork.map((n, i) => (
                <button
                  key={n.symbol}
                  onClick={() => { setSelectedNetwork(n); setShowNetworkModal(false); setNetworkSearch(""); }}
                  className={`w-full flex items-center justify-between px-[20px] sm:px-[24px] py-[13px] sm:py-[15px] ${hoverRow} transition-colors ${i < filteredNetwork.length - 1 ? `border-b ${divider}` : ""}`}
                >
                  <div className="text-left">
                    <p className={`text-[13px] sm:text-[14px] font-bold ${tp}`}>{n.symbol}</p>
                    <p className={`text-[11px] sm:text-[12px] ${ts}`}>{n.name}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-[11px] sm:text-[12px] ${ts}`}>Expected Arrival {n.arrival}</p>
                    <p className={`text-[11px] sm:text-[12px] ${ts}`}>Fee: <span className={`font-semibold ${tp}`}>{n.fee}</span></p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}