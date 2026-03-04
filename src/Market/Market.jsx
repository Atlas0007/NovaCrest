import { useTheme } from "../ThemeContext";
import React, { useState, useEffect } from 'react';
import Gwei from "../Market/Gwei.svg";
import Trading from "../Market/Trading.svg";
import AAVE from "../Market/AAVE.svg";
import ANT from "../Market/ANT.svg";
import ECA from "../Market/ECA.svg";
import GAS from "../Market/GAS.svg";
import NEO from "../Market/NEO.svg";
import RAP from "../Market/RAP.svg";
import LEO from "../Market/LEO.svg";
import Bitcoin from "../assets/Bitcoin.svg";
import Eth from "../assets/Eth.svg";
import Ltc from "../Market/Ltc.svg";
import SNGLS from "../Market/SNGLS.svg";
import STAK from "../Market/STAK.svg";
import TNC from "../Market/TNC.svg";
import PRL from "../Market/PRL.svg";
import Tron from "../Market/Tron.svg";
import BNB from "../Market/BNB.svg";
import Ripple from "../Market/Ripple.svg";
import Doge from "../Market/Doge.svg";
import Ontology from "../Market/Ontology.svg";
import Cardano from "../Market/Cardano.svg";
import Zilliqa from "../Market/Zilliqa.svg";
import BtcChart from "../Market/BtcChart.svg";
import EthChart from "../Market/EthChart.svg";
import TronChart from "../Market/TronChart.svg";
import BinanceChart from "../Market/BinanceChart.svg";
import RippleChart from "../Market/RippleChart.svg";
import DogeChart from "../Market/DogeChart.svg";
import LtcChart from "../Market/LtcChart.svg";
import OntologyChart from "../Market/OntologyChart.svg";
import CardanoChart from "../Market/CardanoChart.svg";
import ZilliqaChart from "../Market/ZilliqaChart.svg";
import { TrendingUp, TrendingDown, Star, ChevronUp, ChevronDown, Search } from "lucide-react";
import Chart from "react-apexcharts";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

export default function Market() {
  
  const { isDark, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [activeFilter, setActiveFilter] = useState('All');
  const [favorites, setFavorites] = useState({
    'BTC/USDT': true,
    'ETH/USDT': true,
    'Tron/USDT': true,
    'DOGE/USDT': true,
    'LTC/USDT': true,
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // ── Theme tokens ──────────────────────────────────
  const bg         = isDark ? "bg-[#0B0F1A]"   : "bg-[#F0F2F8]";
  const cardBg     = isDark ? "bg-[#141827]"   : "bg-white";
  const cardBorder = isDark ? "border-[#1962F0]/40" : "border-blue-200";
  const innerRow   = isDark ? "bg-[#1C1E24]"   : "bg-gray-50";
  const hoverRow   = isDark ? "hover:bg-[#1a1f3a]" : "hover:bg-blue-50/50";
  const tp         = isDark ? "text-white"      : "text-gray-900";
  const ts         = isDark ? "text-gray-400"   : "text-gray-500";
  const divider    = isDark ? "border-[#1e2a4a]" : "border-gray-200";
  const pillActive = isDark ? "bg-[#4A7FD4] text-white" : "bg-[#4A7FD4] text-white";
  const pillInact  = isDark ? "bg-[#1a1f3a] text-gray-400 hover:bg-[#252b4a]" : "bg-gray-100 text-gray-500 hover:bg-gray-200";
  const tableBg    = isDark ? "bg-[#0d1128]"   : "bg-white";
  const headerBg   = isDark ? "bg-[#0B0F1A]"   : "bg-white";

  const toggleFavorite = (name) => setFavorites(prev => ({ ...prev, [name]: !prev[name] }));

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSidebarOpen]);

  // ── Donut chart data ──────────────────────────────
  const longPct  = 79;
  const shortPct = 21;
  const sentimentData = [
    { name: 'Short', value: shortPct, color: '#E2464A' },
    { name: 'Long',  value: longPct,  color: '#2FA766' },
  ];

  // ── Market data apex chart (tiny sparkline for Market Data card) ──
  const gweiChartOpts = {
    chart: { type: 'line', sparkline: { enabled: true }, background: 'transparent' },
    stroke: { width: 1.5, curve: 'smooth' },
    colors: ['#6B7280'],
    tooltip: { enabled: false },
  };
  const gweiSeries = [{ data: [3, 4, 3.5, 5, 4, 4.5, 3.8, 4.2, 3.5, 4] }];

  const tradingChartOpts = {
    chart: { type: 'line', sparkline: { enabled: true }, background: 'transparent' },
    stroke: { width: 1.5, curve: 'smooth' },
    colors: ['#6B7280'],
    tooltip: { enabled: false },
  };
  const tradingSeries = [{ data: [6, 5, 7, 5.5, 6.5, 5, 6, 4.5, 5.5, 4] }];

  // ── Data ─────────────────────────────────────────
  const topGainers = [
    { icon: AAVE, name: 'AAVE', price: '$45.56',  change: '+8.88%', positive: true  },
    { icon: ANT,  name: 'ANT',  price: '$302.74', change: '+7.23%', positive: true  },
    { icon: ECA,  name: 'ECA',  price: '$0.24',   change: '+6.59%', positive: true  },
    { icon: GAS,  name: 'GAS',  price: '$1.81',   change: '+4.63%', positive: true  },
  ];

  const trending = [
    { icon: NEO,     name: 'NEO', price: '$223.15', change: '+0.17%', positive: true  },
    { icon: Bitcoin, name: 'BTC', price: '$65,000', change: '+0.02%', positive: true  },
    { icon: RAP,     name: 'RAP', price: '$35.18',  change: '-4.21%', positive: false },
    { icon: LEO,     name: 'LEO', price: '$84.56',  change: '+0.15%', positive: true  },
  ];

  const newListings = [
    { icon: SNGLS, name: 'SNGLS', price: '$2.19',  change: '-0.16%', positive: false },
    { icon: STAK,  name: 'STAK',  price: '$0.015', change: '+2.12%', positive: true  },
    { icon: TNC,   name: 'TNC',   price: '$0.34',  change: '+3.15%', positive: true  },
    { icon: PRL,   name: 'PRL',   price: '$1.51',  change: '-0.18%', positive: false },
  ];

  const trendingSectors = [
    { name: 'Memes',         change: '+8.88%' },
    { name: 'AI',            change: '+8.88%' },
    { name: 'Gaming (GameFi)', change: '+8.88%' },
    { name: 'RWA',           change: '+8.88%' },
  ];

  const marketData = [
    { icon: Bitcoin, name: 'BTC/USDT',  fullName: 'Bitcoin',         price: '$65,230.56', change: '+8.88%', positive: true,  marketCap: '$1,149,301,700,874', volume: '$37,169,951,326', volumeUnit: '638,587 BTC',  chart: BtcChart      },
    { icon: Eth,     name: 'ETH/USDT',  fullName: 'Ethereum',        price: '$2,540.74',  change: '+1.32%', positive: true,  marketCap: '$283,122,954,710',   volume: '$14,986,278,893', volumeUnit: '6,351,495 ETH', chart: EthChart     },
    { icon: Tron,    name: 'Tron/USDT', fullName: 'Tron',            price: '$0.1637',    change: '-2.08%', positive: false, marketCap: '$14,154,817,051',    volume: '$37,169,951,326', volumeUnit: '638,587 TRX',  chart: TronChart     },
    { icon: BNB,     name: 'BNB/USDT',  fullName: 'Binance Coin',    price: '$593.40',    change: '-0.03%', positive: false, marketCap: '$86,563,297,643',    volume: '$37,169,951,326', volumeUnit: '698,587 BNB',  chart: BinanceChart  },
    { icon: Ripple,  name: 'XRP/USDT',  fullName: 'Ripple',          price: '$0.5256',    change: '+1.06%', positive: true,  marketCap: '$29,437,532,642',    volume: '$37,169,951,326', volumeUnit: '638,587 XRP',  chart: RippleChart   },
    { icon: Doge,    name: 'DOGE/USDT', fullName: 'Dogecoin',        price: '$0.1453',    change: '-1.64%', positive: false, marketCap: '$21,324,662,756',    volume: '$37,169,951,326', volumeUnit: '638,587 DOGE', chart: DogeChart     },
    { icon: Ltc,     name: 'LTC/USDT',  fullName: 'Litecoin',        price: '$70.92',     change: '+0.20%', positive: true,  marketCap: '$5,321,168,478',     volume: '$37,169,951,326', volumeUnit: '638,587 LTC',  chart: LtcChart      },
    { icon: Ontology,name: 'ONT/USDT',  fullName: 'Ontology Token',  price: '$56,878.27', change: '-0.23%', positive: false, marketCap: '$158,621,084',       volume: '$37,169,951,326', volumeUnit: '638,587 ONT',  chart: OntologyChart },
    { icon: Cardano, name: 'ADA/USDT',  fullName: 'Cardano',         price: '$0.3391',    change: '-3.11%', positive: false, marketCap: '$11,862,872,392',    volume: '$37,169,951,326', volumeUnit: '638,587 ADA',  chart: CardanoChart  },
    { icon: Zilliqa, name: 'ZIL/USDT',  fullName: 'Zilliqa',         price: '$0.01406',   change: '+4.43%', positive: true,  marketCap: '$268,485,123',       volume: '$37,169,951,326', volumeUnit: '638,587 ZIL',  chart: ZilliqaChart  },
  ];

  const parseValue = (v) => parseFloat(v.replace(/[$,+%]/g, ''));

  const sortedMarketData = [...marketData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const map = { price: 'price', change: 'change', marketCap: 'marketCap', volume: 'volume' };
    const aVal = parseValue(a[map[sortConfig.key]]);
    const bVal = parseValue(b[map[sortConfig.key]]);
    return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const SortIcon = ({ col }) => (
    <span className="inline-flex flex-col ml-[3px]">
      <ChevronUp   className={`w-[10px] h-[10px] -mb-[2px] ${sortConfig.key === col && sortConfig.direction === 'asc'  ? tp : 'text-gray-600'}`} />
      <ChevronDown className={`w-[10px] h-[10px]            ${sortConfig.key === col && sortConfig.direction === 'desc' ? tp : 'text-gray-600'}`} />
    </span>
  );

  // Mini list card shared component
  const MiniListCard = ({ title, items }) => (
    <div className={`${cardBg} rounded-[14px] sm:rounded-[16px] p-[14px] sm:p-[18px] md:p-[20px] border ${cardBorder}`}>
      <div className={`flex items-center justify-between mb-[10px] sm:mb-[12px] pb-[10px] sm:pb-[12px] border-b ${divider}`}>
        <h3 className={`${tp} font-semibold text-[13px] sm:text-[14px] md:text-[15px]`}>{title}</h3>
        <button className={`${ts} text-[11px] sm:text-[12px] hover:${tp} transition`}>More →</button>
      </div>
      <div className={`flex items-center justify-between text-[10px] sm:text-[11px] ${ts} mb-[8px] sm:mb-[10px] px-[6px]`}>
        <span>Pairs</span><span>Price</span><span>24h Change</span>
      </div>
      <div className="space-y-[4px] sm:space-y-[6px]">
        {items.map((item, idx) => (
          <div key={idx} className={`flex items-center justify-between py-[6px] sm:py-[8px] px-[6px] sm:px-[8px] rounded-[8px] sm:rounded-[10px] ${hoverRow} transition ${idx % 2 === 0 ? innerRow : ''}`}>
            <div className="flex items-center gap-[6px] sm:gap-[8px] flex-1">
              <img src={item.icon} alt={item.name} className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px]" />
              <span className={`${tp} text-[11px] sm:text-[12px] md:text-[13px] font-medium`}>{item.name}</span>
            </div>
            <div className={`${tp} text-[11px] sm:text-[12px] font-semibold flex-1 text-center`}>{item.price}</div>
            <div className={`flex items-center justify-end gap-[4px] text-[11px] sm:text-[12px] font-semibold flex-1 ${item.positive ? 'text-emerald-400' : 'text-red-400'}`}>
              <span>{item.change}</span>
              {item.positive
                ? <TrendingUp  className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]" />
                : <TrendingDown className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`relative min-h-screen ${bg} overflow-x-hidden transition-colors duration-300`}>

      {/* ── Header ── */}
      <div className={`fixed top-0 left-0 right-0 z-50 border-b ${isDark ? "border-white/5 bg-[#0B0F1A]" : "border-gray-200 bg-white"}`}>
        <Header onToggleSidebar={() => setIsSidebarOpen(p => !p)} isDark={isDark} onToggleTheme={() => setIsDark(p => !p)} />
      </div>

      {/* ── Desktop Sidebar ── */}
      <div className={`hidden md:block w-[220px] fixed left-0 top-0 bottom-0 z-50 overflow-y-auto border-r ${isDark ? "bg-[#0B0F1A] border-white/5" : "bg-white border-gray-200"}`}>
        <Sidebar isOpen={true} isDark={isDark} />
      </div>

      {/* ── Mobile Sidebar ── */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className={`absolute top-0 left-0 h-full w-[220px] overflow-y-auto ${isDark ? "bg-[#0B0F1A]" : "bg-white"}`} onClick={e => e.stopPropagation()}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isDark={isDark} />
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="pt-[57px] md:pl-[220px] min-h-screen">
        <div className="p-[14px] sm:p-[18px] md:p-[22px] lg:p-[28px] space-y-[14px] sm:space-y-[18px]">

          {/* ── Row 1: Sentiment + Market Data + Trending Sectors ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px] sm:gap-[16px]">

            {/* Market Sentiments */}
            <div className={`${cardBg} rounded-[14px] sm:rounded-[16px] p-[14px] sm:p-[18px] md:p-[20px] border ${cardBorder}`}>
              <div className="flex items-center justify-between mb-[12px] sm:mb-[14px]">
                <h3 className={`${tp} font-semibold text-[13px] sm:text-[14px] md:text-[15px]`}>Market Sentiments</h3>
                <button className={`${ts} text-[11px] sm:text-[12px] hover:${tp} transition`}>More →</button>
              </div>

              {/* ── Recharts donut ── */}
              <div className="relative flex items-center justify-center my-[8px] sm:my-[10px]">
                <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        innerRadius="62%"
                        outerRadius="82%"
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                        paddingAngle={3}
                      >
                        {sentimentData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-emerald-400 font-bold text-[13px] sm:text-[14px]">{longPct}%</span>
                  <span className={`${ts} text-[9px] sm:text-[10px]`}>Long</span>
                </div>
              </div>

              {/* Legend bar */}
              <div className="mt-[8px] sm:mt-[10px]">
                <div className="flex rounded-full overflow-hidden h-[6px] sm:h-[7px] mb-[8px] sm:mb-[10px]">
                  <div className="bg-emerald-500" style={{ width: `${longPct}%` }} />
                  <div className="bg-red-500"     style={{ width: `${shortPct}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[5px]">
                    <div className="w-[8px] h-[8px] rounded-full bg-emerald-500" />
                    <span className="text-emerald-400 font-semibold text-[11px] sm:text-[12px]">{longPct} Long</span>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <span className="text-red-400 font-semibold text-[11px] sm:text-[12px]">Short {shortPct}</span>
                    <div className="w-[8px] h-[8px] rounded-full bg-red-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Market Data */}
            <div className={`${cardBg} rounded-[14px] sm:rounded-[16px] p-[14px] sm:p-[18px] md:p-[20px] border ${cardBorder}`}>
              <div className="flex items-center justify-between mb-[12px] sm:mb-[16px]">
                <h3 className={`${tp} font-semibold text-[13px] sm:text-[14px] md:text-[15px]`}>Market Data</h3>
                <button className={`${ts} text-[11px] sm:text-[12px] hover:${tp} transition`}>More →</button>
              </div>
              <div className="space-y-[16px] sm:space-y-[20px]">
                {/* ETH Gas */}
                <div className="flex items-center justify-between gap-[12px]">
                  <div className="flex-1 min-w-0">
                    <p className={`${ts} text-[10px] sm:text-[11px] mb-[4px]`}>Current ETH Gas Price</p>
                    <div className="flex items-baseline gap-[6px] mb-[2px]">
                      <span className={`${tp} text-[14px] sm:text-[16px] md:text-[18px] font-bold`}>3.011588451</span>
                      <span className={`${ts} text-[10px] sm:text-[11px]`}>= 0.144USD</span>
                    </div>
                    <p className={`${ts} text-[10px] sm:text-[11px]`}>Gwei</p>
                  </div>
                  <div className="flex-shrink-0 w-[80px] sm:w-[100px] h-[40px] sm:h-[48px]">
                    <img src={Gwei} alt="Gwei chart" className="w-full h-full object-contain opacity-60" />
                  </div>
                </div>
                {/* Trading Volume */}
                <div className="flex items-center justify-between gap-[12px]">
                  <div className="flex-1 min-w-0">
                    <p className={`${ts} text-[10px] sm:text-[11px] mb-[4px]`}>Trading Volume</p>
                    <div className="flex items-baseline gap-[6px] flex-wrap">
                      <span className={`${tp} text-[14px] sm:text-[16px] md:text-[18px] font-bold`}>165.12B USDT</span>
                      <span className="text-red-400 text-[10px] sm:text-[11px] font-semibold">-24.71%</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-[80px] sm:w-[100px] h-[40px] sm:h-[48px]">
                    <img src={Trading} alt="Trading chart" className="w-full h-full object-contain opacity-60" />
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Sectors */}
            <div className={`${cardBg} rounded-[14px] sm:rounded-[16px] p-[14px] sm:p-[18px] md:p-[20px] border ${cardBorder}`}>
              <div className={`flex items-center justify-between mb-[10px] sm:mb-[12px] pb-[10px] sm:pb-[12px] border-b ${divider}`}>
                <h3 className={`${tp} font-semibold text-[13px] sm:text-[14px] md:text-[15px]`}>Trending Sectors</h3>
                <button className={`${ts} text-[11px] sm:text-[12px] hover:${tp} transition`}>More →</button>
              </div>
              <div className={`flex items-center justify-between text-[10px] sm:text-[11px] ${ts} mb-[8px] sm:mb-[10px]`}>
                <span>Name</span><span>Avg. Price Change</span>
              </div>
              <div className="space-y-[4px] sm:space-y-[6px]">
                {trendingSectors.map((sector, idx) => (
                  <div key={idx} className={`flex items-center justify-between py-[8px] sm:py-[10px] px-[8px] sm:px-[10px] rounded-[8px] sm:rounded-[10px] ${hoverRow} transition ${idx % 2 === 0 ? innerRow : ''}`}>
                    <span className={`${tp} text-[12px] sm:text-[13px]`}>{sector.name}</span>
                    <div className="flex items-center gap-[4px]">
                      <span className="text-emerald-400 text-[12px] sm:text-[13px] font-semibold">{sector.change}</span>
                      <TrendingUp className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] text-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Row 2: Top Gainers + Trending + New Listings ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px] sm:gap-[16px]">
            <MiniListCard title="Top Gainers" items={topGainers} />
            <MiniListCard title="Trending"    items={trending}   />
            <MiniListCard title="New Listings" items={newListings} />
          </div>

          {/* ── Markets Table ── */}
          <div className={`${tableBg} rounded-[14px] sm:rounded-[16px] md:rounded-[20px] p-[14px] sm:p-[18px] md:p-[22px] lg:p-[26px] border ${isDark ? "border-[#1e2a4a]" : "border-gray-200"}`}>
            <h2 className={`${tp} font-bold text-[18px] sm:text-[20px] md:text-[22px] mb-[16px] sm:mb-[18px]`}>Markets</h2>

            {/* Tabs */}
            <div className={`flex items-center gap-[4px] sm:gap-[6px] mb-[14px] sm:mb-[16px] border-b ${divider} overflow-x-auto pb-0 [&::-webkit-scrollbar]:hidden`}>
              {['Favorites', 'All', 'Spot', 'New Listings'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-[10px] sm:pb-[12px] px-[6px] sm:px-[8px] text-[12px] sm:text-[13px] font-medium whitespace-nowrap transition border-b-2 ${activeTab === tab ? 'text-[#4A7FD4] border-[#4A7FD4]' : `${ts} border-transparent hover:${tp}`}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-[6px] sm:gap-[8px] mb-[14px] sm:mb-[16px]">
              {['All', 'Solana ecosystem', 'Stock', 'AI', 'Meme', 'Forex'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-[10px] sm:px-[12px] py-[5px] sm:py-[6px] rounded-[8px] text-[11px] sm:text-[12px] font-medium transition ${activeFilter === f ? pillActive : pillInact}`}
                >
                  {f}
                </button>
              ))}
              {/* USDT dropdown pill */}
              <button className={`flex items-center gap-[4px] px-[10px] sm:px-[12px] py-[5px] sm:py-[6px] rounded-[8px] text-[11px] sm:text-[12px] font-medium border ${isDark ? "border-white/10 text-gray-300 bg-[#1a1f3a]" : "border-gray-200 text-gray-600 bg-gray-100"}`}>
                USDT <ChevronDown className="w-[12px] h-[12px]" />
              </button>

              {/* Search */}
              <div className={`ml-auto flex items-center gap-[6px] px-[10px] sm:px-[12px] py-[5px] sm:py-[6px] rounded-[8px] border text-[11px] sm:text-[12px] ${isDark ? "bg-[#1a1f3a] border-white/10 text-gray-400" : "bg-gray-50 border-gray-200 text-gray-500"}`}>
                <Search className="w-[12px] h-[12px]" />
                <input type="text" placeholder="Search assets, news, or help..." className="bg-transparent outline-none w-[120px] sm:w-[160px] md:w-[200px] text-[11px] sm:text-[12px]" />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-track]:bg-gray-800/20 [&::-webkit-scrollbar-thumb]:bg-gray-600/40 [&::-webkit-scrollbar-thumb]:rounded-full">
              <table className="w-full min-w-[680px]">
                <thead>
                  <tr className={`border-b ${divider}`}>
                    <th className={`text-left py-[10px] sm:py-[12px] px-[8px] sm:px-[10px] ${ts} text-[11px] sm:text-[12px] font-medium`}>Pair</th>
                    <th className={`text-left py-[10px] sm:py-[12px] px-[8px] sm:px-[10px] ${ts} text-[11px] sm:text-[12px] font-medium`}>
                      <button onClick={() => handleSort('price')} className="flex items-center gap-[2px] hover:text-white transition">Price <SortIcon col="price" /></button>
                    </th>
                    <th className={`text-left py-[10px] sm:py-[12px] px-[8px] sm:px-[10px] ${ts} text-[11px] sm:text-[12px] font-medium`}>
                      <button onClick={() => handleSort('change')} className="flex items-center gap-[2px] hover:text-white transition">24h Change <SortIcon col="change" /></button>
                    </th>
                    <th className={`text-left py-[10px] sm:py-[12px] px-[8px] sm:px-[10px] ${ts} text-[11px] sm:text-[12px] font-medium hidden md:table-cell`}>
                      <button onClick={() => handleSort('marketCap')} className="flex items-center gap-[2px] hover:text-white transition">Market Cap <SortIcon col="marketCap" /></button>
                    </th>
                    <th className={`text-left py-[10px] sm:py-[12px] px-[8px] sm:px-[10px] ${ts} text-[11px] sm:text-[12px] font-medium hidden lg:table-cell`}>
                      <button onClick={() => handleSort('volume')} className="flex items-center gap-[2px] hover:text-white transition">24h Volume <SortIcon col="volume" /></button>
                    </th>
                    <th className={`text-left py-[10px] sm:py-[12px] px-[8px] sm:px-[10px] ${ts} text-[11px] sm:text-[12px] font-medium hidden xl:table-cell`}>Chart</th>
                    <th className={`text-right py-[10px] sm:py-[12px] px-[8px] sm:px-[10px] ${ts} text-[11px] sm:text-[12px] font-medium`}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedMarketData.map((item, idx) => (
                    <tr key={idx} className={`border-b ${divider} ${hoverRow} transition`}>
                      {/* Pair */}
                      <td className="py-[12px] sm:py-[14px] px-[8px] sm:px-[10px]">
                        <div className="flex items-center gap-[6px] sm:gap-[8px]">
                          <button onClick={() => toggleFavorite(item.name)} className="flex-shrink-0 hover:scale-110 transition">
                            <Star className={`w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] ${favorites[item.name] ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                          </button>
                          <img src={item.icon} alt={item.name} className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] flex-shrink-0" />
                          <div>
                            <p className={`${tp} text-[12px] sm:text-[13px] font-semibold`}>{item.name}</p>
                            <p className={`${ts} text-[10px] sm:text-[11px]`}>{item.fullName}</p>
                          </div>
                        </div>
                      </td>
                      {/* Price */}
                      <td className="py-[12px] sm:py-[14px] px-[8px] sm:px-[10px]">
                        <span className={`${tp} text-[12px] sm:text-[13px] font-semibold`}>{item.price}</span>
                      </td>
                      {/* 24h Change */}
                      <td className="py-[12px] sm:py-[14px] px-[8px] sm:px-[10px]">
                        <div className={`flex items-center gap-[3px] text-[12px] sm:text-[13px] font-semibold ${item.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                          {item.change}
                          {item.positive
                            ? <TrendingUp  className="w-[12px] h-[12px] sm:w-[13px] sm:h-[13px]" />
                            : <TrendingDown className="w-[12px] h-[12px] sm:w-[13px] sm:h-[13px]" />}
                        </div>
                      </td>
                      {/* Market Cap */}
                      <td className="py-[12px] sm:py-[14px] px-[8px] sm:px-[10px] hidden md:table-cell">
                        <span className={`${tp} text-[11px] sm:text-[12px]`}>{item.marketCap}</span>
                      </td>
                      {/* 24h Volume */}
                      <td className="py-[12px] sm:py-[14px] px-[8px] sm:px-[10px] hidden lg:table-cell">
                        <p className={`${tp} text-[11px] sm:text-[12px]`}>{item.volume}</p>
                        <p className={`${ts} text-[10px] sm:text-[11px]`}>{item.volumeUnit}</p>
                      </td>
                      {/* Chart */}
                      <td className="py-[12px] sm:py-[14px] px-[8px] sm:px-[10px] hidden xl:table-cell">
                        <img src={item.chart} alt="chart" className="w-[70px] sm:w-[80px] h-[28px] sm:h-[32px] object-contain" />
                      </td>
                      {/* Actions */}
                      <td className="py-[12px] sm:py-[14px] px-[8px] sm:px-[10px] text-right">
                        <div className="flex items-center justify-end gap-[4px] sm:gap-[6px]">
                          <button className={`px-[8px] sm:px-[10px] py-[4px] sm:py-[5px] rounded-[7px] border text-[10px] sm:text-[11px] font-medium transition ${isDark ? "border-white/15 text-gray-300 hover:bg-[#4A7FD4]" : "border-gray-200 text-gray-600 hover:bg-[#4A7FD4]"}`}>
                            Details
                          </button>
                          <button className={`px-[8px] sm:px-[10px] py-[4px] sm:py-[5px] rounded-[7px] text-[10px] sm:text-[11px] font-medium transition ${isDark ? "bg-[#1C2236] text-white hover:bg-[#4A7FD4]" : "bg-black text-white hover:bg-[#4A7FD4] hover:text-white"}`}>
                            Trade
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-[6px] sm:gap-[8px] mt-[16px] sm:mt-[20px]">
              {[1, 2, 3, '...', 30].map((page, i) => (
                <button
                  key={i}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  className={`w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] rounded-[8px] text-[11px] sm:text-[12px] font-medium transition ${currentPage === page ? 'bg-[#4A7FD4] text-white' : isDark ? 'bg-[#1a1f3a] text-gray-400 hover:bg-[#252b4a]' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {page}
                </button>
              ))}
              <button className={`w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] rounded-[8px] text-[11px] sm:text-[12px] font-medium transition ${isDark ? 'bg-[#1a1f3a] text-gray-400 hover:bg-[#252b4a]' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}