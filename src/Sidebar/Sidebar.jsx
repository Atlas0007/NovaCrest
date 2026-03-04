import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { X, Menu, ChevronDown,ChevronUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import Dashboard from "../Sidebar/Dashboard.svg";
import Nova from "../Sidebar/Nova.jpg";
import Novalight from "../Sidebar/Novalight.svg"; 
import Market from "../Sidebar/Market.svg";
import News from "../Sidebar/News.svg";
import Support from "../Sidebar/Support.svg";
import Trades from "../Sidebar/Trades.svg";
import Settings from "../Sidebar/Settings.svg";

import Wallet from "../Sidebar/Market.svg";

const navItems = [
  { label: "Dashboard", icon: Dashboard, path: "/dashboard", children: null },
  { label: "Market",    icon: Market,    path: "/market",    children: null },
  {
    label: "Wallet",
    icon: Wallet,
    path: "/wallet",
    children: [
      { label: "Assets",   path: "/wallet/asset"   },
      { label: "Deposit",  path: "/wallet/deposit"  },
      { label: "Withdraw", path: "/wallet/withdraw" },
    ],
  },
  {
    label: "Trades",
    icon: Trades,
    path: "/trades",
    children: [
      { label: "Open Trades",   path: "/trades/open"    },
      { label: "Trade History", path: "/trades/history" },
    ],
  },
  { label: "Settings", icon: Settings, path: "/settings", children: null },
  { label: "Support",  icon: Support,  path: "/support",  children: null },
  { label: "News",     icon: News,     path: "/news",     children: null },
];

export default function Sidebar({ isOpen: externalIsOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [expanded, setExpanded] = useState({});

  const { isDark } = useTheme();
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // ── Theme tokens ──
  const sideBg        = isDark ? "bg-[#0B0F1A]"      : "bg-white";
  const borderColor   = isDark ? "border-white/5"     : "border-gray-200";
  const textBase      = isDark ? "text-gray-400"      : "text-gray-500";
  const textHover     = isDark ? "hover:text-gray-200": "hover:text-gray-900";
  const hoverBg       = isDark ? "hover:bg-white/5"   : "hover:bg-gray-100";
  const activeBg      = isDark ? "bg-[#1A2E4A]"       : "bg-blue-50";
  const activeText    = isDark ? "text-white"          : "text-[#1A3A6E]";
  const childBorder   = isDark ? "border-white/10"    : "border-gray-200";
  const childActive   = isDark ? "text-white"          : "text-[#1A3A6E]";
  const childInactive = isDark ? "text-gray-500 hover:text-gray-300 hover:bg-white/5" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100";
  const chevronActive = isDark ? "text-gray-300"       : "text-gray-500";
  const chevronInact  = isDark ? "text-gray-600"       : "text-gray-400";
  const closeBtnCls   = isDark ? "text-gray-500 hover:text-gray-300 hover:bg-white/10" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100";

  const toggleSidebar = () => {
    if (externalIsOpen !== undefined && onClose) onClose();
    else setInternalIsOpen((prev) => !prev);
  };

  const handleNavClick = (item) => {
    if (item.children) {
      setExpanded((prev) => ({ ...prev, [item.label]: !prev[item.label] }));
    } else {
      navigate(item.path);
      if (externalIsOpen !== undefined && onClose) onClose();
      else setInternalIsOpen(false);
    }
  };

  const handleChildClick = (path) => {
    navigate(path);
    if (externalIsOpen !== undefined && onClose) onClose();
    else setInternalIsOpen(false);
  };

  const isActive       = (path) => location.pathname === path;
  const isParentActive = (item) =>
    location.pathname === item.path ||
    item.children?.some((c) => location.pathname === c.path);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-50
          w-[240px] sm:w-[252px] md:w-full
          h-full flex flex-col
          border-r transition-all duration-300 ease-in-out
          ${sideBg} ${borderColor}
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo header */}
        <div className="flex items-center justify-between px-[20px] sm:px-[22px] md:px-[24px] py-[32px] sm:py-[34px] md:py-[36px] max-w-full">
          <img
            src={Novalight}
            alt="NovaCrest logo"
            className="w-[156px] h-[36px] sm:w-[178px] sm:h-[38px] md:w-[190px] md:h-[50px] rounded-full object-cover flex-shrink-0"
          />
          {/* Close — mobile only */}
          <button
            onClick={toggleSidebar}
            className={`md:hidden p-[6px] rounded-[8px] transition-colors duration-200 ${closeBtnCls}`}
            aria-label="Close sidebar"
          >
            <X className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-[10px] sm:px-[12px] md:px-[14px] pb-[20px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <ul className="space-y-[2px] sm:space-y-[3px]">
            {navItems.map((item) => {
              const active = isParentActive(item);
              const open   = !!expanded[item.label];

              return (
                <li key={item.label}>
                  {/* Parent row */}
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`
                      w-full flex items-center gap-[14px] sm:gap-[15px] md:gap-[16px]
                      px-[14px] sm:px-[16px] md:px-[18px]
                      py-[12px] sm:py-[13px] md:py-[14px]
                      rounded-[10px] sm:rounded-[11px] md:rounded-[12px]
                      transition-all duration-200 group relative
                      ${active ? `${activeBg} ${activeText}` : `${textBase} ${hoverBg} ${textHover}`}
                    `}
                  >
                    {/* Blue left accent bar */}
                    {active && (
                      <span className="absolute left-0 top-[20%] h-[60%] w-[3px] bg-[#4A7FD4] rounded-r-full" />
                    )}

                    <img
                      src={item.icon}
                      alt={`${item.label} icon`}
                      className={`
                        w-[22px] h-[22px] sm:w-[23px] sm:h-[23px] md:w-[24px] md:h-[24px]
                        flex-shrink-0 transition-opacity duration-200
                        ${active ? "opacity-100" : "opacity-45 group-hover:opacity-75"}
                        ${!isDark ? "invert" : ""}
                      `}
                    />
                    <span
                      className={`
                        text-[14px] sm:text-[14px] md:text-[15px] font-semibold flex-1 text-left
                        ${active ? activeText : `${textBase} group-hover:${isDark ? "text-gray-200" : "text-gray-900"}`}
                      `}
                    >
                      {item.label}
                    </span>
                    {item.children && (
                      open
                        ? <ChevronUp   className={`w-[15px] h-[15px] flex-shrink-0 ${active ? chevronActive : chevronInact}`} />
                        : <ChevronDown className={`w-[15px] h-[15px] flex-shrink-0 ${active ? chevronActive : chevronInact}`} />
                    )}
                  </button>

                  {/* Children dropdown */}
                  {item.children && open && (
                    <ul className={`mt-[2px] ml-[34px] sm:ml-[38px] md:ml-[42px] space-y-[1px] border-l pl-[14px] sm:pl-[16px] ${childBorder}`}>
                      {item.children.map((child) => {
                        const cActive = isActive(child.path);
                        return (
                          <li key={child.path}>
                            <button
                              onClick={() => handleChildClick(child.path)}
                              className={`
                                w-full text-left
                                px-[10px] sm:px-[12px]
                                py-[8px] sm:py-[9px] md:py-[10px]
                                rounded-[8px]
                                text-[13px] sm:text-[14px] font-medium
                                transition-all duration-200
                                ${cActive ? `${childActive} font-semibold` : childInactive}
                              `}
                            >
                              {child.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}