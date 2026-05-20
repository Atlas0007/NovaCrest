import { useTheme } from "../ThemeContext";
import { useState } from "react";
import Bitcoin from "../assets/Bitcoin.svg";
import Eth from "../assets/Eth.svg";
import Robot from "../assets/Robot.png";
import Setting from "../assets/Setting.svg";
import Tether from "../assets/Tether.svg";
import Usd from "../assets/Usd.svg";
import { Wallet2, AlertCircle, Calendar, Star, ChevronDown, ChevronUp,BriefcaseBusiness,ArrowUpRightIcon } from "lucide-react";
import Chart from "react-apexcharts";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Link, Navigate } from "react-router-dom";

export default function Dashboard() {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [selectedCurrency, setSelectedCurrency] = useState("BTC/USD");
  const [activeMarketTab, setActiveMarketTab] = useState("All");
  const [buySell, setBuySell] = useState("Buy");
  const [usdAmount, setUsdAmount] = useState("4,000");

  const { isDark } = useTheme();
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  

  const bg = isDark ? "bg-[#0B0F1A]" : "bg-[#F0F2F8]";
  const cardBg = isDark ? "bg-black" : "bg-white";
  const cardBorder = isDark ? "border-white/5" : "border-gray-200";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const innerCard = isDark ? "bg-[#1C2236]" : "bg-gray-50";

  const securityItems = [
    { label: "Passkey", status: "Activate", active: false },
    { label: "2-Step Verification", status: "Active", active: true },
    { label: "Anti-phishing code", status: "Activate", active: false },
  ];

  const identityItems = [
    { label: "Basic Information", status: "Completed", done: true },
    { label: "ID Photo", status: "Upload", done: false },
    { label: "Review", status: "", done: false },
  ];

  const marketTabs = ["All", "Crypto", "Forex", "NFT", "Metaverse", "Stock", "Solana", "Opensea", "Makersplace"];

  const marketAssets = [
    { icon: Bitcoin, name: "Bitcoin", pair: "BTC/USD", price: "USD 68,168.35", vol: "35,215.23", change: "+0.57%", pos: true, highlight: false },
    { icon: Eth, name: "Ethereum", pair: "BTC/USD", price: "USD 46,168.35", vol: "35,215.23", change: "-0.79%", pos: false, highlight: true },
    { icon: Tether, name: "Tether", pair: "BTC/USD", price: "USD 46,168.35", vol: "35,215.23", change: "-0.61%", pos: false, highlight: false },
    { icon: Bitcoin, name: "Bitcoin", pair: "BTC/USD", price: "USD 46,168.35", vol: "35,215.23", change: "-0.45%", pos: false, highlight: false },
  ];

  const spendingData = [
    { name: "Withdraw", value: 50, color: "#4A7FD4" },
    { name: "Subscription", value: 30, color: "#A78BFA" },
    { name: "Other", value: 10, color: "#F59E0B" },
  ];

  const recentNews = [
    {
      title: "Circle Stock Reclaims Gains Ahead of Earnings",
      date: "02 December 2026",
      read: "3 Min. To Read",
      tags: ["Stock", "Blockchain"],
      desc: "Shares of Circle (CRCL) have recovered lost ground ahead of its upcoming earnings report.",
    },
    {
      title: "Strategy Stock (MSTR) Up on New Bitcoin Purchase",
      date: "02 December 2026",
      read: "3 Min. To Read",
      tags: ["Stock", "Blockchain"],
      desc: "MicroStrategy's stock ticked higher after the company filed disclosures showing an additional ~$39.8 million purchase of Bitcoin.",
    },
  ];

  const chartOptions = {
    chart: {
      type: "line",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: { width: 2, curve: "smooth" },
    colors: ["#22C55E", "#EF4444"],
    xaxis: {
      categories: ["20", "21", "22", "23", "24", "25", "26", "27"],
      labels: { style: { colors: isDark ? "#6B7280" : "#9CA3AF", fontSize: "11px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0.001,
      max: 0.006,
      tickAmount: 5,
      labels: {
        style: { colors: isDark ? "#6B7280" : "#9CA3AF", fontSize: "11px" },
        formatter: (val) => val.toFixed(3),
      },
    },
    grid: { borderColor: isDark ? "#1F2937" : "#E5E7EB", strokeDashArray: 3 },
    legend: { show: false },
    tooltip: { theme: isDark ? "dark" : "light" },
    annotations: {
      xaxis: [
        {
          x: "24",
          borderColor: "#4A7FD4",
          label: {
            style: { background: "#4A7FD4", color: "#fff", fontSize: "11px" },
            text: "24",
          },
        },
      ],
    },
  };

  const chartSeries = [
    { name: "BTC", data: [0.004, 0.0035, 0.005, 0.004, 0.0055, 0.004, 0.0045, 0.004] },
    { name: "ETH", data: [0.003, 0.0045, 0.003, 0.005, 0.003, 0.0045, 0.003, 0.0035] },
  ];

  const balanceChartOpts = {
    chart: { type: "area", background: "transparent", toolbar: { show: false }, sparkline: { enabled: true } },
    stroke: { width: 2.5, curve: "straight" },
    colors: ["#ffffff"],
    fill: { type: "gradient", gradient: { shadeIntensity: 1, colorStops: [{ offset: 0, color: "#60A5FA", opacity: 0.55 }, { offset: 100, color: "#3B82F6", opacity: 0.05 }] } },
    tooltip: { enabled: false },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } },
  };
  const balanceSeries = [{ name: "Balance", data: [60, 80, 55, 90, 75, 110, 95, 130] }];

 const bestBuyOpts = {
    chart: { type: "area", background: "transparent", toolbar: { show: false }, sparkline: { enabled: true } },
    stroke: { width: 2, curve: "straight" },
    colors: ["#34D399"],
    fill: { type: "gradient", gradient: { shadeIntensity: 1, colorStops: [{ offset: 0, color: "#34D399", opacity: 0.35 }, { offset: 100, color: "#34D399", opacity: 0.02 }] } },
    tooltip: { enabled: false },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } },
  };
  const bestBuySeries = [{ name: "Price", data: [40, 55, 45, 60, 50, 70, 60, 80, 65, 90] }];

  return (
    <div className={`relative min-h-screen ${bg} overflow-x-hidden transition-colors duration-300`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 ${isDark ? "bg-[#0B0F1A]" : "bg-white"} border-b ${cardBorder}`}>
        <Header onToggleSidebar={toggleSidebar} />
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden md:block w-[220px] fixed left-0 top-0 bottom-0 z-50 overflow-y-auto border-r ${isDark ? "bg-[#0B0F1A] border-white/5" : "bg-white border-gray-200"}`}>
        <Sidebar isOpen={true} />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className={`absolute top-0 left-0 h-full w-[220px] overflow-y-auto ${isDark ? "bg-[#0B0F1A]" : "bg-white"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-[57px] md:pl-[220px] min-h-screen">
        <div className="p-[14px] sm:p-[18px] md:p-[24px] lg:p-[28px] space-y-[16px] sm:space-y-[20px]">

          {/* Row 1: Security + Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] sm:gap-[16px]">
            {/* Security */}
            <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
              <div className="flex items-center justify-between mb-[6px]">
                <h3 className={`text-[15px] sm:text-[16px] font-bold ${textPrimary}`}>Security</h3>
                <div className="flex items-center gap-[4px]">
                  <span className={`text-[11px] sm:text-[12px] ${textSecondary}`}>Strength</span>
                  <div className="flex gap-[3px] ml-[6px]">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`w-[18px] sm:w-[22px] h-[5px] rounded-full ${i <= 2 ? "bg-red-500" : isDark ? "bg-white/10" : "bg-gray-200"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className={`text-[11px] sm:text-[12px] ${textSecondary} mb-[14px] sm:mb-[16px]`}>Increase your account security strength</p>
              <div className="space-y-[10px] sm:space-y-[12px]">
                {securityItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className={`text-[12px] sm:text-[13px] ${textSecondary}`}>{item.label}</span>
                    <button >
                    <span className={`text-[11px] sm:text-[12px] font-medium px-[10px] sm:px-[12px] py-[4px] rounded-[6px] ${item.active ? "text-green-400 hover:bg-transparent flex items-center gap-[4px]" : `${isDark ? "bg-[#1C2236] hover:bg-gray-900 text-gray-300 border border-white/10" : "bg-black  hover:bg-black/60  text-white border border-gray-200"}`}`}>
                      {item.active && <span className="mr-[2px]">✓</span>}
                      {item.status}
                    </span>
                     </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Identity Verification */}
            <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
              <div className="flex items-center justify-between mb-[6px]">
                <h3 className={`text-[15px] sm:text-[16px] font-bold ${textPrimary}`}>Identify Verification</h3>
                <button className="flex items-center gap-[6px] bg-[#7B5D24] text-[white] text-[11px] sm:text-[12px] font-semibold px-[10px] sm:px-[12px] py-[4px] sm:py-[5px] rounded-xl border border-[#F59E0B]/30">
                  <AlertCircle />
                  Enable
                </button>
              </div>
              <p className={`text-[11px] sm:text-[12px] ${textSecondary} mb-[14px] sm:mb-[16px]`}>This process only takes around 1 minute</p>
              <div className="space-y-[10px] sm:space-y-[12px]">
                {identityItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <div className={`w-[6px] h-[6px] rounded-full ${i < 2 ? "bg-[#4A7FD4]" : isDark ? "bg-white/20 " : "bg-gray-300"}`} />

                      <span className={`text-[12px] sm:text-[13px] font-semibold ${isDark? "text-white" :"text-black"  }`}>{item.label}</span>
                  
                  </div>
                    {item.done ? (
                      <span className="text-[11px] sm:text-[12px] text-green-400 flex items-center gap-[4px]">✓ Completed</span>
                    ) : item.status ? (
                      <button className={`text-[11px] sm:text-[12px] px-[10px] sm:px-[12px] py-[4px] rounded-[6px] font-medium ${isDark ? "bg-[#1C2236]  hover:bg-gray-900 text-gray-300 border border-white/10" : "bg-black hover:bg-black/60  text-white border border-gray-200"}`}>
                        {item.status}
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Balance + Spending + News */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] sm:gap-[16px]">
            {/* My Balance */}
            <div className="rounded-[16px] sm:rounded-[20px] p-[20px] sm:p-[24px] relative overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]" style={{ minHeight: "220px" }}>
              <div className="flex items-center justify-between mb-[16px] sm:mb-[20px]">
                <div className="flex items-center gap-[10px]">
                  <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-full bg-white flex items-center justify-center">
                    <Wallet2 className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-black" />
                  </div>
                  <span className="text-[14px] sm:text-[15px] font-semibold text-white">My Balance</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <button className="flex items-center gap-[4px] border-white border-[1px] text-white text-[11px] sm:text-[12px] font-medium px-[10px] sm:px-[12px] py-[5px] rounded-full">
                    Weekly <ChevronDown className="w-[12px] h-[12px]" />
                  </button>
                  <button className={`w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] rounded-full border-white  border-1 flex items-center justify-center text-white`}>···</button>
                </div>
              </div>
              <div className="mb-[4px]">
                <div className="flex items-center justify-between md:gap-[30px]">
                     <div className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-white">$120.980</div>
                <div className="text-[12px] sm:text-[13px] text-green-300 mt-[2px]">+$250 <span className="text-white">this week</span></div>
              </div>
                </div>
             

              <div className="h-[60px] sm:h-[70px] mt-[8px] mb-[16px] sm:mb-[20px]">
                <Chart options={balanceChartOpts} series={balanceSeries} type="area" height="100%" />
              </div>
              <button className="w-full bg-[#0F172A] text-white text-[13px] sm:text-[14px]  py-[11px] sm:py-[12px] rounded-[12px] flex items-center justify-center gap-[8px] hover:bg-[#1e293b] transition-colors">
                ⇅ Exchange
              </button>
            </div>

            {/* Spending Overview */}
            <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
              <div className="flex items-center justify-between mb-[12px]">
                <div className="flex items-center gap-[8px]">
                  <div className={`w-[38px] bg-blue-600 h-[38px] sm:w-[38px] sm:h-[38px] rounded-full  flex items-center justify-center`}>
                    <BriefcaseBusiness className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-white" />
                  </div>
                  <span className={`text-[14px] sm:text-[15px] font-semibold ${textPrimary}`}>Spending Overview</span>
                </div>
                <button className={`text-[18px] w-8 border-gray-500 rounded-full border-1 ${textSecondary}`}>···</button>
              </div>
              <div className="flex items-center justify-between gap-[10px] mb-[12px]">
                <div className={`text-[24px] sm:text-[28px] ${isDark? "text-white" : "text-black"}`}>$87,230</div>
                <div>
                    <span className="text-[11px] sm:text-[12px] text-green-400 font-medium">+$50 
                  <span className={` ${isDark? "text-white" : "text-gray-400"}`}> this week</span> 
                </span>
                </div>
              
              </div>
              <div className="h-[300px] mb-[12px]">
                              <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {/* Outer track (grey) */}
                    <Pie data={[{ value: 1 }]} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius="68%" outerRadius="88%" dataKey="value" stroke="none" fill={isDark ? " #E5E7EB" : "#2A2D3A"} />
                    {/* Outer fill - blue (Withdraw ~70%) */}
                    <Pie data={[{ value: 70 }, { value: 30 }]} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius="68%" outerRadius="88%" dataKey="value" stroke="none" fill="#4A7FD4">
                      <Cell fill="#4A7FD4" />
                      <Cell fill="transparent" />
                    </Pie>

                    {/* Middle track (grey) */}
                    <Pie data={[{ value: 1 }]} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius="44%" outerRadius="62%" dataKey="value" stroke="none" fill={isDark ? "#E5E7EB" : "#2A2D3A"} />
                    {/* Middle fill - purple (Subscription ~50%) */}
                    <Pie data={[{ value: 50 }, { value: 50 }]} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius="44%" outerRadius="62%" dataKey="value" stroke="none" fill="#A78BFA">
                      <Cell fill="#A78BFA" />
                      <Cell fill="transparent" />
                    </Pie>

                    {/* Inner track (grey) */}
                    <Pie data={[{ value: 1 }]} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius="20%" outerRadius="38%" dataKey="value" stroke="none" fill={isDark ? "#E5E7EB" : "#2A2D3A"} />
                    {/* Inner fill - amber (Other ~40%) */}
                    <Pie data={[{ value: 40 }, { value: 60 }]} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius="20%" outerRadius="38%" dataKey="value" stroke="none" fill="#F59E0B">
                      <Cell fill="#F59E0B" />
                      <Cell fill="transparent" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-[6px] sm:space-y-[8px]">
                {spendingData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: item.color }} />
                      <span className={`text-[12px] sm:text-[13px] ${textSecondary}`}>{item.name}</span>
                    </div>
                    <span className={`text-[12px] sm:text-[13px] font-medium ${textPrimary}`}>${item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Posted */}
            <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
              <h3 className="mb-[14px] sm:mb-[16px]">
                <span className="text-[15px] sm:text-[16px] font-bold ] text-white px-[6px] py-[1px] rounded-[4px]">Recently</span>
                <span className={`text-[15px] sm:text-[16px] font-bold ${textPrimary} ml-[6px]`}>Posted</span>
              </h3>
              <div className="space-y-[14px] sm:space-y-[16px]">
                {recentNews.map((news, i) => (
                  <div key={i} className={`pb-[14px] sm:pb-[16px] ${i < recentNews.length - 1 ? `border-b ${cardBorder}` : ""}`}>
                    <p className={`text-[13px] sm:text-[14px] font-semibold ${textPrimary} mb-[4px] leading-snug`}>{news.title}</p>
                    <div className={`flex items-center gap-[10px] text-[10px] sm:text-[11px] ${textSecondary} mb-[6px]`}>
                      <span className="flex items-center gap-[4px]"><Calendar className="w-[10px] h-[10px]" /> {news.date}</span>
                      <span>{news.read}</span>
                    </div>
                    <p className={`text-[11px] sm:text-[12px] ${textSecondary} mb-[8px] leading-relaxed line-clamp-2`}>{news.desc}</p>
                    <div className="flex gap-[6px]">
                      {news.tags.map((tag, j) => (
                        <span key={j} className={`text-[10px] sm:text-[11px] font-medium px-[8px] py-[3px] rounded-full ${j === 0 ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Market Tabs + Assets */}
          <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
            <div className="flex items-center gap-[6px] sm:gap-[8px] overflow-x-auto pb-[12px] sm:pb-[14px] mb-[14px] sm:mb-[16px] [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-600/40 [&::-webkit-scrollbar-thumb]:rounded-full">
              {marketTabs.map((tab) => (
                <button key={tab} onClick={() => setActiveMarketTab(tab)} className={`flex-shrink-0 px-[12px] sm:px-[14px] py-[5px] sm:py-[6px] rounded-full text-[11px] sm:text-[12px] font-medium transition-colors ${activeMarketTab === tab ? "bg-[#4A7FD4] text-white" : `${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px] sm:gap-[14px]">
              {marketAssets.map((asset, i) => (
                <div key={i} className={`rounded-[12px] sm:rounded-[14px] p-[14px] sm:p-[16px] border transition-all ${asset.highlight ? "border-[#4A7FD4] bg-[#4A7FD4]/10" : `${cardBorder} ${innerCard}`}`}>
                  <div className="flex items-center justify-between mb-[10px] sm:mb-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <img src={asset.icon} alt={asset.name} className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px]" />
                      <span className={`text-[13px] sm:text-[14px] font-semibold ${textPrimary}`}>{asset.name}</span>
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-medium px-[6px] py-[2px] rounded-[4px] ${isDark ? "bg-white/10 text-gray-400" : "bg-gray-100 text-gray-500"}`}>{asset.pair}</span>
                  </div>
                  <div className={`text-[15px] sm:text-[16px] font-bold ${textPrimary} mb-[4px]`}>{asset.price}</div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] sm:text-[12px] ${textSecondary}`}>{asset.vol}</span>
                    <span className={`text-[11px] sm:text-[12px] font-semibold px-[8px] py-[3px] rounded-full ${asset.pos ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{asset.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 4: Chart + Buy/Sell */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-[14px] sm:gap-[16px]">
            {/* Chart */}
            <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[12px] mb-[14px] sm:mb-[16px]">
                <h3 className={`text-[16px] sm:text-[17px] font-bold ${textPrimary}`}>Choose a Currency</h3>
                <div className="flex items-center gap-[8px]">
                  <img src={Setting} alt="settings" className={`w-[24px] h-[26px] opacity-90 ${isDark ? "border-white/50 rounded-full border-2 "  : "border-blue-500 rounded-full border-2 text-blue-700"}`} />
                  <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className={`text-[12px] sm:text-[13px] px-[10px] py-[5px] rounded-[8px] border outline-none ${isDark ? "bg-[#1C2236] border-white/10 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-700"}`}>
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-[10px] justify-between mb-[14px]">
                <button className={`flex items-center gap-[4px] text-[13px] sm:text-[14px] font-semibold ${textPrimary}`}>
                  {selectedCurrency} <ChevronDown className="w-[14px] h-[14px]" />
                </button>
                <div>
                <span className={`text-[22px] sm:text-[26px] font-bold ${textPrimary} ml-[8px]`}>$68,352.02</span>
                <span className="text-[12px] sm:text-[13px] ml-4 text-green-400 font-semibold">+15.69%</span>
                </div>
              </div>
              <div className="h-[220px] sm:h-[260px] md:h-[280px]">
                <Chart options={chartOptions} series={chartSeries} type="line" height="100%" />
              </div>
            </div>

            {/* Buy / Sell */}
            <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
              <div className={`flex rounded-[10px] p-[3px] mb-[18px] sm:mb-[22px] ${innerCard}`}>
                {["Buy", "Sell"].map((tab) => (
                  <button key={tab} onClick={() => setBuySell(tab)} className={`flex-1 py-[8px] sm:py-[9px] text-[13px] sm:text-[14px] font-semibold rounded-[8px] transition-colors ${buySell === tab ? "bg-[#4A7FD4] text-white" : textSecondary}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="space-y-[12px] sm:space-y-[14px]">
                <div className="flex justify-between">
                  <div>
                      <p className={`text-[11px] sm:text-[12px] ${textSecondary} mb-[4px]`}>1 BTC is roughly</p>
                  <p className={`text-[20px] sm:text-[22px] font-bold ${textPrimary}`}>$68,260.20</p>
                  </div>
                  <div>
                     <p className="text-[11px] sm:text-[12px] text-[#4A7FD4] font-medium mt-[2px] cursor-pointer">Claim $10 in Rewards</p>
                  </div>
                </div>
                <div className={`flex items-center justify-between rounded-[10px] px-[14px] py-[10px] sm:py-[11px] border ${isDark ? "bg-[#1C2236] border-white/10" : "bg-gray-50 border-gray-200"}`}>
                  <input value={usdAmount} onChange={(e) => setUsdAmount(e.target.value)} className={`bg-transparent outline-none text-[15px] sm:text-[16px] font-semibold w-full ${textPrimary}`} />
                  <div className="flex items-center gap-[6px] flex-shrink-0">
                    <img src={Usd} alt="USD" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                    <span className={`text-[13px] sm:text-[14px] font-medium ${textSecondary}`}>USD</span>
                    <ChevronDown className={`w-[14px] h-[14px] ${textSecondary}`} />
                  </div>
                </div>
                <div className={`flex items-center justify-between rounded-[10px] px-[14px] py-[10px] sm:py-[11px] border ${isDark ? "bg-[#1C2236] border-white/10" : "bg-gray-50 border-gray-200"}`}>
                  <span className={`text-[15px] sm:text-[16px] font-semibold ${textPrimary}`}>
                    {(parseFloat(usdAmount.replace(/,/g, "")) / 68260.20).toFixed(6) || "0.000000"}
                  </span>
                  <div className="flex items-center gap-[6px]">
                    <img src={Bitcoin} alt="BTC" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className={`bg-transparent outline-none text-[13px] sm:text-[14px] font-medium cursor-pointer ${textSecondary}`}
                    >
                      <option value="BTC/USD">BTC</option>
                      <option value="ETH/USD">ETH</option>
                      <option value="USDT/USD">USDT</option>
                    </select>
                  </div>
                </div>
                <button className="w-full bg-[#4A7FD4] hover:bg-[#3B6EC3] text-white text-[14px] sm:text-[15px] font-bold py-[13px] sm:py-[14px] rounded-[12px] transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          {/* Row 5: Best to Buy + AI Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] sm:gap-[16px]">
            {/* Best to Buy */}
            <div className={`${cardBg} border ${cardBorder} rounded-[16px] sm:rounded-[20px] p-[18px] sm:p-[22px]`}>
              <div className="flex items-center justify-between mb-[10px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] rounded-full bg-[#4A7FD4] flex items-center justify-center">
                    <Star className="w-[14px] h-[14px] text-white" fill="white" />
                  </div>
                  <span className={`text-[14px] sm:text-[15px] font-semibold ${textPrimary}`}>Best to buy</span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <img src={Eth} alt="ETH" className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" />
                  <span className={`text-[13px] sm:text-[14px] font-medium ${textSecondary}`}>Ethereum</span>
                  <span className={`text-[11px] sm:text-[12px] ${textSecondary}`}>ETH</span>
                  <button className="bg-blue-700 text-white text-[11px] sm:text-[12px] font-semibold px-[10px] sm:px-[12px] py-[5px] sm:py-[6px] rounded-full hover:bg-[#3B6EC3] transition-colors">Buy</button>
                  <button className={`w-[30px] h-[30px] border-gray-400 border-1 rounded-full ${innerCard} flex items-center justify-center ${textSecondary}`}>···</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                      <div className={`text-[26px] sm:text-[30px] font-bold ${textPrimary}`}>$120.980</div>
              <div className="text-[12px] sm:text-[13px] text-green-400 font-medium mb-[2px]">+$250 <span className={textSecondary}>this week</span></div>
              </div>
        
              <div className="h-[70px] sm:h-[80px] mt-[10px]">
                <Chart options={bestBuyOpts} series={bestBuySeries} type="area" height="100%" />
              </div>
            </div>

            {/* NovaCrest AI Banner */}
            <div className="rounded-[16px] sm:rounded-[20px] p-[20px] sm:p-[24px] relative overflow-hidden bg-gradient-to-br from-[#0F2447] to-[#1A3A6E] flex flex-col justify-between" style={{ minHeight: "180px", background: "linear-gradient(to right, #1d4ed8 0%, #0a0f1e 45%, #0a0f1e 55%, #1d4ed8 100%)" }}>
              <div className="absolute right-[-10px] bottom-[-10px] w-[120px] sm:w-[140px] opacity-90 pointer-events-none">
                <img src={Robot} alt="AI Robot" className="w-full h-full object-contain drop-shadow-2xl" />
              </div>
              <div className="relative z-10 max-w-[85%]">
                <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-white mb-[8px] leading-snug">
                  Trade smarter with NovaCrest AI
                </h3>
                <p className="text-[12px] sm:text-[13px] text-white mb-[16px] sm:mb-[20px] leading-relaxed">
                  Automate trades based on user-defined criteria, using AI algorithms.
                </p>
                <Link to="/ai">
                <button className="inline-flex items-center gap-[6px] bg-white text-[#1A3A6E] text-[12px] sm:text-[13px] font-bold px-[16px] sm:px-[18px] py-[8px] sm:py-[9px] cursor-pointer rounded-full hover:bg-blue-50 transition-colors">
                    Try Now 
                    <ArrowUpRightIcon />
                  </button> 
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}