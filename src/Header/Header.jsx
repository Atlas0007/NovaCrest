import { Search, BellDot, Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";
import Guy from "../Header/Guy.jpg";
import { useTheme } from "../ThemeContext";

export default function Header({ onToggleSidebar }) {
  const { isDark, toggleTheme } = useTheme();
  const [hasNotif] = useState(true);

  return (
    <header
      className={`
        w-full flex items-center justify-between
        px-[16px] sm:px-[24px] md:px-[32px] lg:px-[40px]
        py-[12px] sm:py-[14px] md:py-[16px]
        border-b
        ${isDark
          ? "bg-[#0B0F1A] border-white/5"
          : "bg-white border-gray-100"
        }
      `}
    >
      {/* Search bar */}
      {/* Hamburger — mobile only */}
      <button
        onClick={onToggleSidebar}
        className={`md:hidden p-[8px] rounded-[10px] mr-[8px] flex-shrink-0 transition-colors duration-200 ${
          isDark ? "text-gray-300 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-label="Toggle sidebar"
      >
        <Menu className="w-[22px] h-[22px]" />
      </button>

      {/* Search bar — centered */}
      <div className="flex-1 flex justify-center">
        <div
          className={`
            flex items-center gap-[10px] sm:gap-[12px]
            px-[14px] sm:px-[16px] md:px-[18px]
            py-[9px] sm:py-[10px] md:py-[11px]
            rounded-full border
            w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px]
            transition-colors duration-200
            ${isDark
              ? "bg-transparent border-white/15 hover:border-white/25"
              : "bg-gray-50 border-gray-200 hover:border-gray-300"
            }
          `}
        >
          <Search
            className={`w-[15px] h-[15px] sm:w-[16px] sm:h-[16px] flex-shrink-0 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Search assets, news, or help..."
            className={`
              bg-transparent outline-none w-full
              text-[13px] sm:text-[14px] font-medium
              placeholder:font-normal
              ${isDark
                ? "text-gray-200 placeholder:text-gray-500"
                : "text-gray-700 placeholder:text-gray-400"
              }
            `}
          />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-[6px] sm:gap-[8px] md:gap-[12px] flex-shrink-0">

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`
            p-[8px] sm:p-[9px] rounded-full transition-colors duration-200
            ${isDark
              ? "text-gray-400 hover:text-gray-200 hover:bg-white/10"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }
          `}
          aria-label="Toggle theme"
        >
          {isDark
            ? <Sun  className="w-[17px] h-[17px] sm:w-[18px] sm:h-[18px]" />
            : <Moon className="w-[17px] h-[17px] sm:w-[18px] sm:h-[18px]" />
          }
        </button>

        {/* Bell */}
        <button
          className={`
            relative p-[8px] sm:p-[9px] rounded-full transition-colors duration-200
            ${isDark
              ? "text-gray-400 hover:text-gray-200 hover:bg-white/10"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }
          `}
          aria-label="Notifications"
        >
          <BellDot className="w-[17px] h-[17px] sm:w-[18px] sm:h-[18px]" />
          {hasNotif && (
            <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] bg-[#4A7FD4] rounded-full border-2 border-[#0B0F1A]" />
          )}
        </button>

        {/* Divider */}
        <div className={`hidden sm:block w-[1px] h-[28px] mx-[2px] ${isDark ? "bg-white/10" : "bg-gray-200"}`} />

        {/* User info */}
        <div className="flex items-center gap-[8px] sm:gap-[10px]">
          <img
            src={Guy}
            alt="Alex Johnson"
            className="w-[34px] h-[34px] sm:w-[36px] sm:h-[36px] md:w-[38px] md:h-[38px] rounded-full object-cover flex-shrink-0 ring-2 ring-[#4A7FD4]/30"
          />
          <div className="hidden sm:block">
            <p className={`text-[13px] sm:text-[14px] font-bold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              Alex Johnson
            </p>
            <p className={`text-[11px] sm:text-[12px] font-medium leading-tight ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Pro Trader
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}