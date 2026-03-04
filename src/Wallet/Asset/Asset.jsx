import { useState } from "react";
import { useTheme } from "../../ThemeContext";
import Bitcoin from "../../assets/Bitcoin.svg";
import Eth from "../../assets/Eth.svg";
import Tether from "../../assets/Tether.svg";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Header from "../../Header/Header";
import Sidebar from "../../Sidebar/Sidebar";

const marketAssets = [
  { icon: Bitcoin, name: "Bitcoin",  pair: "BTC/USD", price: "USD 68,168.35", vol: "35,215.23", change: "+0.57%", pos: true  },
  { icon: Eth,     name: "Ethereum", pair: "BTC/USD", price: "USD 46,168.35", vol: "35,215.23", change: "-0.79%", pos: false },
  { icon: Tether,  name: "Tether",   pair: "BTC/USD", price: "USD 46,168.35", vol: "35,215.23", change: "-0.61%", pos: false },
  { icon: Bitcoin, name: "Bitcoin",  pair: "BTC/USD", price: "USD 46,168.35", vol: "35,215.23", change: "-0.45%", pos: false },
];

const assetRows = [
  { id: 1,  icon: Bitcoin, name: "USDT"      },
  { id: 2,  icon: Eth,     name: "Ethereum"  },
  { id: 3,  icon: Bitcoin, name: "Binance"   },
  { id: 4,  icon: Bitcoin, name: "Solana"    },
  { id: 5,  icon: Bitcoin, name: "XRP"       },
  { id: 6,  icon: Bitcoin, name: "Cardano"   },
  { id: 7,  icon: Bitcoin, name: "Avalanche" },
  { id: 8,  icon: Tether,  name: "Tether"    },
  { id: 9,  icon: Bitcoin, name: "USDT"      },
  { id: 10, icon: Bitcoin, name: "USDT"      },
  { id: 11, icon: Bitcoin, name: "USDT"      },
  { id: 12, icon: Bitcoin, name: "USDT"      },
  { id: 13, icon: Bitcoin, name: "USDT"      },
];

const marketTabs = ["All", "Crypto", "Forex", "NFT", "Metaverse", "Stock", "Solana", "Opensea", "Makersplace"];

export default function Asset() {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [searchVal, setSearchVal] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [showBalance, setShowBalance] = useState(false);

  
  const { isDark, toggleTheme } = useTheme();
  const toggleSidebar = () => setIsSidebarOpen((p) => !p);

  // ── Theme tokens ──
  const bg          = isDark ? "bg-[#0B0F1A]"   : "bg-[#F0F2F8]";
  const cardBg      = isDark ? "bg-[#141827]"   : "bg-white";
  const cardBorder  = isDark ? "border-white/5" : "border-gray-200";
  const innerCard   = isDark ? "bg-[#1C2236]"   : "bg-gray-50";
  const textPrimary = isDark ? "text-white"      : "text-gray-900";
  const textSec     = isDark ? "text-gray-400"   : "text-gray-500";
  const divider     = isDark ? "border-white/5" : "border-gray-200";
  const inputBg     = isDark ? "bg-[#1C2236] border-white/10 text-gray-300 placeholder:text-gray-600" : "bg-gray-50 border-gray-200 text-gray-700 placeholder:text-gray-400";
  const rowHover    = isDark ? "hover:bg-white/5" : "hover:bg-gray-50";
  const headerBg    = isDark ? "bg-[#0B0F1A]"   : "bg-white";

  return (
    <div className={`relative min-h-screen ${bg} overflow-x-hidden transition-colors duration-300`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 border-b ${cardBorder} ${headerBg}`}>
        <Header onToggleSidebar={toggleSidebar} isDark={isDark} onToggleTheme={toggleTheme} />
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden md:block w-[220px] fixed left-0 top-0 bottom-0 z-50 overflow-y-auto border-r ${isDark ? "bg-[#0B0F1A] border-white/5" : "bg-white border-gray-200"}`}>
        <Sidebar isOpen={true} isDark={isDark} />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className={`absolute top-0 left-0 h-full w-[220px] overflow-y-auto ${isDark ? "bg-[#0B0F1A]" : "bg-white"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isDark={isDark} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-[57px] md:pl-[220px] min-h-screen">
        <div className="p-[14px] sm:p-[18px] md:p-[24px] lg:p-[28px] space-y-[16px] sm:space-y-[20px]">

          {/* ── Market Tabs + Asset Cards ── */}
          <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
            {/* Tabs */}
            <div className="flex items-center gap-[6px] sm:gap-[8px] overflow-x-auto pb-[14px] mb-[16px] sm:mb-[20px] [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-600/40 [&::-webkit-scrollbar-thumb]:rounded-full">
              {marketTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-[12px] sm:px-[14px] py-[5px] sm:py-[6px] rounded-full text-[11px] sm:text-[12px] font-medium transition-colors border ${
                    activeTab === tab
                      ? "bg-transparent border-[#4A7FD4] text-[#4A7FD4]"
                      : `border-transparent ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Asset Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px] sm:gap-[14px]">
              {marketAssets.map((asset, i) => (
                <div key={i} className={`rounded-[12px] sm:rounded-[14px] p-[14px] sm:p-[16px] md:p-[18px] border ${cardBorder} ${innerCard}`}>
                  <div className="flex items-center justify-between mb-[10px] sm:mb-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <img src={asset.icon} alt={asset.name} className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px]" />
                      <span className={`text-[13px] sm:text-[14px] font-semibold ${textPrimary}`}>{asset.name}</span>
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-medium px-[6px] py-[2px] rounded-[4px] ${isDark ? "bg-white/10 text-gray-400" : "bg-gray-100 text-gray-500"}`}>{asset.pair}</span>
                  </div>
                  <div className={`text-[16px] sm:text-[17px] font-bold ${textPrimary} mb-[6px]`}>{asset.price}</div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] sm:text-[12px] ${textSec}`}>{asset.vol}</span>
                    <span className={`text-[11px] sm:text-[12px] font-semibold px-[8px] sm:px-[10px] py-[3px] rounded-full ${asset.pos ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{asset.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Overview ── */}
          <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px] md:p-[28px]`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px] sm:gap-[24px]">
              {/* Left: balance info */}
              <div>
                <h2 className={`text-[20px] sm:text-[22px] md:text-[24px] font-bold ${textPrimary} mb-[12px] sm:mb-[14px]`}>Overview</h2>
                <p className={`text-[11px] sm:text-[12px] ${textSec} mb-[6px]`}>Total Balance</p>
                <div className="flex items-center gap-[10px] sm:gap-[12px] mb-[4px]">
                  <span className={`text-[24px] sm:text-[28px] md:text-[32px] font-bold ${textPrimary}`}>1.79253864</span>
                  <button className="flex items-center gap-[5px] bg-[#4A7FD4] text-white text-[11px] sm:text-[12px] font-semibold px-[10px] sm:px-[12px] py-[4px] sm:py-[5px] rounded-full">
                    BTC <ChevronDown className="w-[12px] h-[12px]" />
                  </button>
                </div>
                <p className={`text-[13px] sm:text-[14px] font-medium ${textSec}`}>$118,068.83</p>
              </div>

              {/* Right: search + show balance */}
              <div className="flex flex-col gap-[10px] sm:gap-[12px] w-full lg:w-[280px] xl:w-[320px]">
                <div className={`flex items-center gap-[8px] px-[12px] sm:px-[14px] py-[9px] sm:py-[10px] rounded-[10px] border ${inputBg}`}>
                  <Search className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] flex-shrink-0 opacity-50" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className="bg-transparent outline-none text-[13px] sm:text-[14px] w-full"
                  />
                  <div className="flex items-center gap-[4px] flex-shrink-0 border-l pl-[8px] border-white/10">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="bg-transparent outline-none text-[12px] sm:text-[13px] font-medium cursor-pointer"
                    >
                      <option value="USD">USD</option>
                      <option value="BTC">BTC</option>
                      <option value="EUR">EUR</option>
                    </select>
                    <ChevronDown className="w-[12px] h-[12px] opacity-50" />
                  </div>
                </div>
                <button
                  onClick={() => setShowBalance((p) => !p)}
                  className="w-full bg-[#4A7FD4] hover:bg-[#3B6EC3] text-white text-[13px] sm:text-[14px] font-semibold py-[10px] sm:py-[11px] rounded-[10px] transition-colors"
                >
                  {showBalance ? "Hide Balance" : "Show Balance"}
                </button>
              </div>
            </div>
          </div>

          {/* ── Assets Table ── */}
          <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] overflow-hidden`}>
            <div className="overflow-x-auto [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-track]:bg-gray-800/30 [&::-webkit-scrollbar-thumb]:bg-gray-600/50 [&::-webkit-scrollbar-thumb]:rounded-full">
              <table className="w-full min-w-[700px]">
                {/* Table Head */}
                <thead>
                  <tr className={`border-b ${divider}`}>
                    {["#", "Asset", "Earn", "On Orders", "Available balance", "Total balance"].map((col, i) => (
                      <th
                        key={col}
                        className={`px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px] text-[11px] sm:text-[12px] font-semibold ${textSec} ${i === 0 ? "text-center w-[60px]" : i === 1 ? "text-left" : "text-left"}`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {assetRows
                    .filter((r) => r.name.toLowerCase().includes(searchVal.toLowerCase()))
                    .map((row, idx) => (
                      <tr key={row.id} className={`border-b ${divider} last:border-0 transition-colors ${rowHover}`}>
                        {/* # */}
                        <td className={`px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px] text-center text-[12px] sm:text-[13px] ${textSec}`}>
                          {row.id}
                        </td>

                        {/* Asset */}
                        <td className="px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px]">
                          <div className="flex items-center gap-[10px] sm:gap-[12px]">
                            <img src={row.icon} alt={row.name} className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] flex-shrink-0" />
                            <span className={`text-[13px] sm:text-[14px] font-semibold ${textPrimary}`}>{row.name}</span>
                          </div>
                        </td>

                        {/* Earn */}
                        <td className="px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px]">
                          <span className="text-[12px] sm:text-[13px] font-semibold text-green-400">7.46% APR</span>
                        </td>

                        {/* On Orders */}
                        <td className="px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px]">
                          <div>
                            <p className={`text-[12px] sm:text-[13px] font-medium ${textPrimary}`}>0.2785689852 BTC</p>
                            <p className={`text-[10px] sm:text-[11px] ${textSec} mt-[2px]`}>$10,098.36</p>
                          </div>
                        </td>

                        {/* Available balance */}
                        <td className="px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px]">
                          <div>
                            <p className={`text-[12px] sm:text-[13px] font-medium ${textPrimary}`}>0.2785689852 BTC</p>
                            <p className={`text-[10px] sm:text-[11px] ${textSec} mt-[2px]`}>$10,098.36</p>
                          </div>
                        </td>

                        {/* Total balance */}
                        <td className="px-[16px] sm:px-[20px] md:px-[24px] py-[14px] sm:py-[16px]">
                          <div>
                            <p className={`text-[12px] sm:text-[13px] font-medium ${textPrimary}`}>0.2785689852 BTC</p>
                            <p className={`text-[10px] sm:text-[11px] ${textSec} mt-[2px]`}>$10,098.36</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}