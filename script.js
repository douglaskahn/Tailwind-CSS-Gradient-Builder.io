/**
 * Gradient Builder JavaScript
 * Modular functions for gradient configuration and live preview
 */

// ==========================================================================
// Global Variables and State
// ==========================================================================

let activeTarget = ''; // Stores the ID of the color circle being edited
const root = document.documentElement;

// Define the default colors for easy reset
const defaultColors = {
  'base-from': {
    hex: '#312e81',
    tailwind: 'bg-indigo-900',
    rgb: 'rgb(49, 46, 129)',
  },
  'base-via': {
    hex: '#581c87',
    tailwind: 'bg-purple-900',
    rgb: 'rgb(88, 28, 135)',
  },
  'base-to': {
    hex: '#9d174d',
    tailwind: 'bg-pink-800',
    rgb: 'rgb(157, 23, 77)',
  },
  'overlay-from': {
    hex: '#2563eb',
    tailwind: 'bg-blue-600',
    rgb: 'rgba(37, 99, 235, 0.2)',
  },
  'overlay-to': {
    hex: '#22d3ee',
    tailwind: 'bg-cyan-400',
    rgb: 'rgba(34, 211, 238, 0.2)',
  },
};

// ==========================================================================
// Tailwind Color Data
// ==========================================================================

// Tailwind color data from the original implementation
const tailwindColors = {
  'bg-black': { hex: '#000000', rgb: 'rgb(0, 0, 0)' },
  'bg-white': { hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' },
  'bg-slate-50': { hex: '#F8FAFC', rgb: 'rgb(248, 250, 252)' },
  'bg-slate-100': { hex: '#F1F5F9', rgb: 'rgb(241, 245, 249)' },
  'bg-slate-200': { hex: '#E2E8F0', rgb: 'rgb(226, 232, 240)' },
  'bg-slate-300': { hex: '#CBD5E1', rgb: 'rgb(203, 213, 225)' },
  'bg-slate-400': { hex: '#94A3B8', rgb: 'rgb(148, 163, 184)' },
  'bg-slate-500': { hex: '#64748B', rgb: 'rgb(100, 116, 139)' },
  'bg-slate-600': { hex: '#475569', rgb: 'rgb(71, 85, 105)' },
  'bg-slate-700': { hex: '#334155', rgb: 'rgb(51, 65, 85)' },
  'bg-slate-800': { hex: '#1E293B', rgb: 'rgb(30, 41, 59)' },
  'bg-slate-900': { hex: '#0F172A', rgb: 'rgb(15, 23, 42)' },
  'bg-slate-950': { hex: '#020617', rgb: 'rgb(2, 6, 23)' },
  'bg-gray-50': { hex: '#F9FAFB', rgb: 'rgb(249, 250, 251)' },
  'bg-gray-100': { hex: '#F3F4F6', rgb: 'rgb(243, 244, 246)' },
  'bg-gray-200': { hex: '#E5E7EB', rgb: 'rgb(229, 231, 235)' },
  'bg-gray-300': { hex: '#D1D5DB', rgb: 'rgb(209, 213, 219)' },
  'bg-gray-400': { hex: '#9CA3AF', rgb: 'rgb(156, 163, 175)' },
  'bg-gray-500': { hex: '#6B7280', rgb: 'rgb(107, 114, 128)' },
  'bg-gray-600': { hex: '#4B5563', rgb: 'rgb(75, 85, 99)' },
  'bg-gray-700': { hex: '#374151', rgb: 'rgb(55, 65, 81)' },
  'bg-gray-800': { hex: '#1F2937', rgb: 'rgb(31, 41, 55)' },
  'bg-gray-900': { hex: '#111827', rgb: 'rgb(17, 24, 39)' },
  'bg-gray-950': { hex: '#030712', rgb: 'rgb(3, 7, 18)' },
  'bg-zinc-50': { hex: '#FAFAFA', rgb: 'rgb(250, 250, 250)' },
  'bg-zinc-100': { hex: '#F4F4F5', rgb: 'rgb(244, 244, 245)' },
  'bg-zinc-200': { hex: '#E4E4E7', rgb: 'rgb(228, 228, 231)' },
  'bg-zinc-300': { hex: '#D4D4D8', rgb: 'rgb(212, 212, 216)' },
  'bg-zinc-400': { hex: '#A1A1AA', rgb: 'rgb(161, 161, 170)' },
  'bg-zinc-500': { hex: '#71717A', rgb: 'rgb(113, 113, 122)' },
  'bg-zinc-600': { hex: '#52525B', rgb: 'rgb(82, 82, 91)' },
  'bg-zinc-700': { hex: '#3F3F46', rgb: 'rgb(63, 63, 70)' },
  'bg-zinc-800': { hex: '#27272A', rgb: 'rgb(39, 39, 42)' },
  'bg-zinc-900': { hex: '#18181B', rgb: 'rgb(24, 24, 27)' },
  'bg-zinc-950': { hex: '#09090B', rgb: 'rgb(9, 9, 11)' },
  'bg-neutral-50': { hex: '#FAFAFA', rgb: 'rgb(250, 250, 250)' },
  'bg-neutral-100': { hex: '#F5F5F5', rgb: 'rgb(245, 245, 245)' },
  'bg-neutral-200': { hex: '#E5E5E5', rgb: 'rgb(229, 229, 229)' },
  'bg-neutral-300': { hex: '#D4D4D4', rgb: 'rgb(212, 212, 212)' },
  'bg-neutral-400': { hex: '#A3A3A3', rgb: 'rgb(163, 163, 163)' },
  'bg-neutral-500': { hex: '#737373', rgb: 'rgb(115, 115, 115)' },
  'bg-neutral-600': { hex: '#525252', rgb: 'rgb(82, 82, 82)' },
  'bg-neutral-700': { hex: '#404040', rgb: 'rgb(64, 64, 64)' },
  'bg-neutral-800': { hex: '#262626', rgb: 'rgb(38, 38, 38)' },
  'bg-neutral-900': { hex: '#171717', rgb: 'rgb(23, 23, 23)' },
  'bg-neutral-950': { hex: '#0A0A0A', rgb: 'rgb(10, 10, 10)' },
  'bg-stone-50': { hex: '#FAFAF9', rgb: 'rgb(250, 250, 249)' },
  'bg-stone-100': { hex: '#F5F5F4', rgb: 'rgb(245, 245, 244)' },
  'bg-stone-200': { hex: '#E7E5E4', rgb: 'rgb(231, 229, 228)' },
  'bg-stone-300': { hex: '#D6D3D1', rgb: 'rgb(214, 211, 209)' },
  'bg-stone-400': { hex: '#A8A29E', rgb: 'rgb(168, 162, 158)' },
  'bg-stone-500': { hex: '#78716C', rgb: 'rgb(120, 113, 108)' },
  'bg-stone-600': { hex: '#57534E', rgb: 'rgb(87, 83, 78)' },
  'bg-stone-700': { hex: '#44403C', rgb: 'rgb(68, 64, 60)' },
  'bg-stone-800': { hex: '#292524', rgb: 'rgb(41, 37, 36)' },
  'bg-stone-900': { hex: '#1C1917', rgb: 'rgb(28, 25, 23)' },
  'bg-stone-950': { hex: '#0C0A09', rgb: 'rgb(12, 10, 9)' },
  'bg-red-50': { hex: '#FEF2F2', rgb: 'rgb(254, 242, 242)' },
  'bg-red-100': { hex: '#FEE2E2', rgb: 'rgb(254, 226, 226)' },
  'bg-red-200': { hex: '#FECACA', rgb: 'rgb(254, 202, 202)' },
  'bg-red-300': { hex: '#FCA5A5', rgb: 'rgb(252, 165, 165)' },
  'bg-red-400': { hex: '#F87171', rgb: 'rgb(248, 113, 113)' },
  'bg-red-500': { hex: '#EF4444', rgb: 'rgb(239, 68, 68)' },
  'bg-red-600': { hex: '#DC2626', rgb: 'rgb(220, 38, 38)' },
  'bg-red-700': { hex: '#B91C1C', rgb: 'rgb(185, 28, 28)' },
  'bg-red-800': { hex: '#991B1B', rgb: 'rgb(153, 27, 27)' },
  'bg-red-900': { hex: '#7F1D1D', rgb: 'rgb(127, 29, 29)' },
  'bg-red-950': { hex: '#450A0A', rgb: 'rgb(69, 10, 10)' },
  'bg-orange-50': { hex: '#FFF7ED', rgb: 'rgb(255, 247, 237)' },
  'bg-orange-100': { hex: '#FFEDD5', rgb: 'rgb(255, 237, 213)' },
  'bg-orange-200': { hex: '#FED7AA', rgb: 'rgb(254, 215, 170)' },
  'bg-orange-300': { hex: '#FDBA74', rgb: 'rgb(253, 186, 116)' },
  'bg-orange-400': { hex: '#FB923C', rgb: 'rgb(251, 146, 60)' },
  'bg-orange-500': { hex: '#F97316', rgb: 'rgb(249, 115, 22)' },
  'bg-orange-600': { hex: '#EA580C', rgb: 'rgb(234, 88, 12)' },
  'bg-orange-700': { hex: '#C2410C', rgb: 'rgb(194, 65, 12)' },
  'bg-orange-800': { hex: '#9A3412', rgb: 'rgb(154, 52, 18)' },
  'bg-orange-900': { hex: '#7C2D12', rgb: 'rgb(124, 45, 18)' },
  'bg-orange-950': { hex: '#431407', rgb: 'rgb(67, 20, 7)' },
  'bg-amber-50': { hex: '#FFFBEB', rgb: 'rgb(255, 251, 235)' },
  'bg-amber-100': { hex: '#FEF3C7', rgb: 'rgb(254, 243, 199)' },
  'bg-amber-200': { hex: '#FDE68A', rgb: 'rgb(253, 230, 138)' },
  'bg-amber-300': { hex: '#FCD34D', rgb: 'rgb(252, 211, 77)' },
  'bg-amber-400': { hex: '#FBBF24', rgb: 'rgb(251, 191, 36)' },
  'bg-amber-500': { hex: '#F59E0B', rgb: 'rgb(245, 158, 11)' },
  'bg-amber-600': { hex: '#D97706', rgb: 'rgb(217, 119, 6)' },
  'bg-amber-700': { hex: '#B45309', rgb: 'rgb(180, 83, 9)' },
  'bg-amber-800': { hex: '#92400E', rgb: 'rgb(146, 64, 14)' },
  'bg-amber-900': { hex: '#78350F', rgb: 'rgb(120, 53, 15)' },
  'bg-amber-950': { hex: '#422006', rgb: 'rgb(66, 32, 6)' },
  'bg-yellow-50': { hex: '#FEFCE8', rgb: 'rgb(254, 252, 232)' },
  'bg-yellow-100': { hex: '#FEF9C3', rgb: 'rgb(254, 249, 195)' },
  'bg-yellow-200': { hex: '#FEF08A', rgb: 'rgb(254, 240, 138)' },
  'bg-yellow-300': { hex: '#FDE047', rgb: 'rgb(253, 224, 71)' },
  'bg-yellow-400': { hex: '#FACC15', rgb: 'rgb(250, 204, 21)' },
  'bg-yellow-500': { hex: '#EAB308', rgb: 'rgb(234, 179, 8)' },
  'bg-yellow-600': { hex: '#CA8A04', rgb: 'rgb(202, 138, 4)' },
  'bg-yellow-700': { hex: '#A16207', rgb: 'rgb(161, 98, 7)' },
  'bg-yellow-800': { hex: '#854D0E', rgb: 'rgb(133, 77, 14)' },
  'bg-yellow-900': { hex: '#713F12', rgb: 'rgb(113, 63, 18)' },
  'bg-yellow-950': { hex: '#422006', rgb: 'rgb(66, 32, 6)' },
  'bg-lime-50': { hex: '#F7FEE7', rgb: 'rgb(247, 254, 231)' },
  'bg-lime-100': { hex: '#ECFCCB', rgb: 'rgb(236, 252, 203)' },
  'bg-lime-200': { hex: '#D9F99D', rgb: 'rgb(217, 249, 157)' },
  'bg-lime-300': { hex: '#BEF264', rgb: 'rgb(190, 242, 100)' },
  'bg-lime-400': { hex: '#A3E635', rgb: 'rgb(163, 230, 53)' },
  'bg-lime-500': { hex: '#84CC16', rgb: 'rgb(132, 204, 22)' },
  'bg-lime-600': { hex: '#65A30D', rgb: 'rgb(101, 163, 13)' },
  'bg-lime-700': { hex: '#4D7C0F', rgb: 'rgb(77, 124, 15)' },
  'bg-lime-800': { hex: '#3F6212', rgb: 'rgb(63, 98, 18)' },
  'bg-lime-900': { hex: '#365314', rgb: 'rgb(54, 83, 20)' },
  'bg-lime-950': { hex: '#1A2E05', rgb: 'rgb(26, 46, 5)' },
  'bg-green-50': { hex: '#F0FDF4', rgb: 'rgb(240, 253, 244)' },
  'bg-green-100': { hex: '#DCFCE7', rgb: 'rgb(220, 252, 231)' },
  'bg-green-200': { hex: '#BBF7D0', rgb: 'rgb(187, 247, 208)' },
  'bg-green-300': { hex: '#86EFAC', rgb: 'rgb(134, 239, 172)' },
  'bg-green-400': { hex: '#4ADE80', rgb: 'rgb(74, 222, 128)' },
  'bg-green-500': { hex: '#22C55E', rgb: 'rgb(34, 197, 94)' },
  'bg-green-600': { hex: '#16A34A', rgb: 'rgb(22, 163, 74)' },
  'bg-green-700': { hex: '#15803D', rgb: 'rgb(21, 128, 61)' },
  'bg-green-800': { hex: '#166534', rgb: 'rgb(22, 101, 52)' },
  'bg-green-900': { hex: '#14532D', rgb: 'rgb(20, 83, 45)' },
  'bg-green-950': { hex: '#052E16', rgb: 'rgb(5, 46, 22)' },
  'bg-emerald-50': { hex: '#ECFDF5', rgb: 'rgb(236, 253, 245)' },
  'bg-emerald-100': { hex: '#D1FAE5', rgb: 'rgb(209, 250, 229)' },
  'bg-emerald-200': { hex: '#A7F3D0', rgb: 'rgb(167, 243, 208)' },
  'bg-emerald-300': { hex: '#6EE7B7', rgb: 'rgb(110, 231, 183)' },
  'bg-emerald-400': { hex: '#34D399', rgb: 'rgb(52, 211, 153)' },
  'bg-emerald-500': { hex: '#10B981', rgb: 'rgb(16, 185, 129)' },
  'bg-emerald-600': { hex: '#059669', rgb: 'rgb(5, 150, 105)' },
  'bg-emerald-700': { hex: '#047857', rgb: 'rgb(4, 120, 87)' },
  'bg-emerald-800': { hex: '#065F46', rgb: 'rgb(6, 95, 70)' },
  'bg-emerald-900': { hex: '#064E3B', rgb: 'rgb(6, 78, 59)' },
  'bg-emerald-950': { hex: '#022C22', rgb: 'rgb(2, 44, 34)' },
  'bg-teal-50': { hex: '#F0FDFA', rgb: 'rgb(240, 253, 250)' },
  'bg-teal-100': { hex: '#CCFBF1', rgb: 'rgb(204, 251, 241)' },
  'bg-teal-200': { hex: '#99F6E4', rgb: 'rgb(153, 246, 228)' },
  'bg-teal-300': { hex: '#5EEAD4', rgb: 'rgb(94, 234, 212)' },
  'bg-teal-400': { hex: '#2DD4BF', rgb: 'rgb(45, 212, 191)' },
  'bg-teal-500': { hex: '#14B8A6', rgb: 'rgb(20, 184, 166)' },
  'bg-teal-600': { hex: '#0D9488', rgb: 'rgb(13, 148, 136)' },
  'bg-teal-700': { hex: '#0F766E', rgb: 'rgb(15, 118, 110)' },
  'bg-teal-800': { hex: '#115E59', rgb: 'rgb(17, 94, 89)' },
  'bg-teal-900': { hex: '#134E4A', rgb: 'rgb(19, 78, 74)' },
  'bg-teal-950': { hex: '#042F2E', rgb: 'rgb(4, 47, 46)' },
  'bg-cyan-50': { hex: '#ECFEFF', rgb: 'rgb(236, 254, 255)' },
  'bg-cyan-100': { hex: '#CFFAFE', rgb: 'rgb(207, 250, 254)' },
  'bg-cyan-200': { hex: '#A5F3FC', rgb: 'rgb(165, 243, 252)' },
  'bg-cyan-300': { hex: '#67E8F9', rgb: 'rgb(103, 232, 249)' },
  'bg-cyan-400': { hex: '#22D3EE', rgb: 'rgb(34, 211, 238)' },
  'bg-cyan-500': { hex: '#06B6D4', rgb: 'rgb(6, 182, 212)' },
  'bg-cyan-600': { hex: '#0891B2', rgb: 'rgb(8, 145, 178)' },
  'bg-cyan-700': { hex: '#0E7490', rgb: 'rgb(14, 116, 144)' },
  'bg-cyan-800': { hex: '#155E75', rgb: 'rgb(21, 94, 117)' },
  'bg-cyan-900': { hex: '#164E63', rgb: 'rgb(22, 78, 99)' },
  'bg-cyan-950': { hex: '#083344', rgb: 'rgb(8, 51, 68)' },
  'bg-sky-50': { hex: '#F0F9FF', rgb: 'rgb(240, 249, 255)' },
  'bg-sky-100': { hex: '#E0F2FE', rgb: 'rgb(224, 242, 254)' },
  'bg-sky-200': { hex: '#BAE6FD', rgb: 'rgb(186, 230, 253)' },
  'bg-sky-300': { hex: '#7DD3FC', rgb: 'rgb(125, 211, 252)' },
  'bg-sky-400': { hex: '#38BDF8', rgb: 'rgb(56, 189, 248)' },
  'bg-sky-500': { hex: '#0EA5E9', rgb: 'rgb(14, 165, 233)' },
  'bg-sky-600': { hex: '#0284C7', rgb: 'rgb(2, 132, 199)' },
  'bg-sky-700': { hex: '#0369A1', rgb: 'rgb(3, 105, 161)' },
  'bg-sky-800': { hex: '#075985', rgb: 'rgb(7, 89, 133)' },
  'bg-sky-900': { hex: '#0C4A6E', rgb: 'rgb(12, 74, 110)' },
  'bg-sky-950': { hex: '#082F49', rgb: 'rgb(8, 47, 73)' },
  'bg-blue-50': { hex: '#EFF6FF', rgb: 'rgb(239, 246, 255)' },
  'bg-blue-100': { hex: '#DBEAFE', rgb: 'rgb(219, 234, 254)' },
  'bg-blue-200': { hex: '#BFDBFE', rgb: 'rgb(191, 219, 254)' },
  'bg-blue-300': { hex: '#93C5FD', rgb: 'rgb(147, 197, 253)' },
  'bg-blue-400': { hex: '#60A5FA', rgb: 'rgb(96, 165, 250)' },
  'bg-blue-500': { hex: '#3B82F6', rgb: 'rgb(59, 130, 246)' },
  'bg-blue-600': { hex: '#2563EB', rgb: 'rgb(37, 99, 235)' },
  'bg-blue-700': { hex: '#1D4ED8', rgb: 'rgb(29, 78, 216)' },
  'bg-blue-800': { hex: '#1E40AF', rgb: 'rgb(30, 64, 175)' },
  'bg-blue-900': { hex: '#1E3A8A', rgb: 'rgb(30, 58, 138)' },
  'bg-blue-950': { hex: '#172554', rgb: 'rgb(23, 37, 84)' },
  'bg-indigo-50': { hex: '#EEF2FF', rgb: 'rgb(238, 242, 255)' },
  'bg-indigo-100': { hex: '#E0E7FF', rgb: 'rgb(224, 231, 255)' },
  'bg-indigo-200': { hex: '#C7D2FE', rgb: 'rgb(199, 210, 254)' },
  'bg-indigo-300': { hex: '#A5B4FC', rgb: 'rgb(165, 180, 252)' },
  'bg-indigo-400': { hex: '#818CF8', rgb: 'rgb(129, 140, 248)' },
  'bg-indigo-500': { hex: '#6366F1', rgb: 'rgb(99, 102, 241)' },
  'bg-indigo-600': { hex: '#4F46E5', rgb: 'rgb(79, 70, 229)' },
  'bg-indigo-700': { hex: '#4338CA', rgb: 'rgb(67, 56, 202)' },
  'bg-indigo-800': { hex: '#3730A3', rgb: 'rgb(55, 48, 163)' },
  'bg-indigo-900': { hex: '#312E81', rgb: 'rgb(49, 46, 129)' },
  'bg-indigo-950': { hex: '#1E1B4B', rgb: 'rgb(30, 27, 75)' },
  'bg-violet-50': { hex: '#F5F3FF', rgb: 'rgb(245, 243, 255)' },
  'bg-violet-100': { hex: '#EDE9FE', rgb: 'rgb(237, 233, 254)' },
  'bg-violet-200': { hex: '#DDD6FE', rgb: 'rgb(221, 214, 254)' },
  'bg-violet-300': { hex: '#C4B5FD', rgb: 'rgb(196, 181, 253)' },
  'bg-violet-400': { hex: '#A78BFA', rgb: 'rgb(167, 139, 250)' },
  'bg-violet-500': { hex: '#8B5CF6', rgb: 'rgb(139, 92, 246)' },
  'bg-violet-600': { hex: '#7C3AED', rgb: 'rgb(124, 58, 237)' },
  'bg-violet-700': { hex: '#6D28D9', rgb: 'rgb(109, 40, 217)' },
  'bg-violet-800': { hex: '#5B21B6', rgb: 'rgb(91, 33, 182)' },
  'bg-violet-900': { hex: '#4C1D95', rgb: 'rgb(76, 29, 149)' },
  'bg-violet-950': { hex: '#2E1065', rgb: 'rgb(46, 16, 101)' },
  'bg-purple-50': { hex: '#FAF5FF', rgb: 'rgb(250, 245, 255)' },
  'bg-purple-100': { hex: '#F3E8FF', rgb: 'rgb(243, 232, 255)' },
  'bg-purple-200': { hex: '#E9D5FF', rgb: 'rgb(233, 213, 255)' },
  'bg-purple-300': { hex: '#D8B4FE', rgb: 'rgb(216, 180, 254)' },
  'bg-purple-400': { hex: '#C084FC', rgb: 'rgb(192, 132, 252)' },
  'bg-purple-500': { hex: '#A855F7', rgb: 'rgb(168, 85, 247)' },
  'bg-purple-600': { hex: '#9333EA', rgb: 'rgb(147, 51, 234)' },
  'bg-purple-700': { hex: '#7E22CE', rgb: 'rgb(126, 34, 206)' },
  'bg-purple-800': { hex: '#6B21A8', rgb: 'rgb(107, 33, 168)' },
  'bg-purple-900': { hex: '#581C87', rgb: 'rgb(88, 28, 135)' },
  'bg-purple-950': { hex: '#3B0764', rgb: 'rgb(59, 7, 100)' },
  'bg-fuchsia-50': { hex: '#FDF4FF', rgb: 'rgb(253, 244, 255)' },
  'bg-fuchsia-100': { hex: '#FAE8FF', rgb: 'rgb(250, 232, 255)' },
  'bg-fuchsia-200': { hex: '#F5D0FE', rgb: 'rgb(245, 208, 254)' },
  'bg-fuchsia-300': { hex: '#F0ABFC', rgb: 'rgb(240, 171, 252)' },
  'bg-fuchsia-400': { hex: '#E879F9', rgb: 'rgb(232, 121, 249)' },
  'bg-fuchsia-500': { hex: '#D946EF', rgb: 'rgb(217, 70, 239)' },
  'bg-fuchsia-600': { hex: '#C026D3', rgb: 'rgb(192, 38, 211)' },
  'bg-fuchsia-700': { hex: '#A21CAF', rgb: 'rgb(162, 28, 175)' },
  'bg-fuchsia-800': { hex: '#86198F', rgb: 'rgb(134, 25, 143)' },
  'bg-fuchsia-900': { hex: '#701A75', rgb: 'rgb(112, 26, 117)' },
  'bg-fuchsia-950': { hex: '#4A044E', rgb: 'rgb(74, 4, 78)' },
  'bg-pink-50': { hex: '#FDF2F8', rgb: 'rgb(253, 242, 248)' },
  'bg-pink-100': { hex: '#FCE7F3', rgb: 'rgb(252, 231, 243)' },
  'bg-pink-200': { hex: '#FBCFE8', rgb: 'rgb(251, 207, 232)' },
  'bg-pink-300': { hex: '#F9A8D4', rgb: 'rgb(249, 168, 212)' },
  'bg-pink-400': { hex: '#F472B6', rgb: 'rgb(244, 114, 182)' },
  'bg-pink-500': { hex: '#EC4899', rgb: 'rgb(236, 72, 153)' },
  'bg-pink-600': { hex: '#DB2777', rgb: 'rgb(219, 39, 119)' },
  'bg-pink-700': { hex: '#BE185D', rgb: 'rgb(190, 24, 93)' },
  'bg-pink-800': { hex: '#9D174D', rgb: 'rgb(157, 23, 77)' },
  'bg-pink-900': { hex: '#831843', rgb: 'rgb(131, 24, 67)' },
  'bg-pink-950': { hex: '#500724', rgb: 'rgb(80, 7, 36)' },
  'bg-rose-50': { hex: '#FFF1F2', rgb: 'rgb(255, 241, 242)' },
  'bg-rose-100': { hex: '#FFE4E6', rgb: 'rgb(255, 228, 230)' },
  'bg-rose-200': { hex: '#FECDD3', rgb: 'rgb(254, 205, 211)' },
  'bg-rose-300': { hex: '#FDA4AF', rgb: 'rgb(253, 164, 175)' },
  'bg-rose-400': { hex: '#FB7185', rgb: 'rgb(251, 113, 133)' },
  'bg-rose-500': { hex: '#F43F5E', rgb: 'rgb(244, 63, 94)' },
  'bg-rose-600': { hex: '#E11D48', rgb: 'rgb(225, 29, 72)' },
  'bg-rose-700': { hex: '#BE123C', rgb: 'rgb(190, 18, 60)' },
  'bg-rose-800': { hex: '#9F1239', rgb: 'rgb(159, 18, 57)' },
  'bg-rose-900': { hex: '#881337', rgb: 'rgb(136, 19, 55)' },
  'bg-rose-950': { hex: '#4C0519', rgb: 'rgb(76, 5, 25)' },
};

// ==========================================================================
// Color Conversion Utilities
// ==========================================================================

/**
 * Convert hex color to RGB format
 * @param {string} hex - Hex color code (e.g., "#ff0000")
 * @returns {string} RGB color string (e.g., "rgb(255, 0, 0)")
 */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Convert RGB string to hex format
 * @param {string} rgb - RGB color string (e.g., "rgb(255, 0, 0)")
 * @returns {string|null} Hex color code or null if invalid
 */
function rgbToHex(rgb) {
  const parts = rgb.match(/(\d+)/g);
  if (!parts || parts.length < 3) return null;
  const r = parseInt(parts[0], 10).toString(16).padStart(2, '0');
  const g = parseInt(parts[1], 10).toString(16).padStart(2, '0');
  const b = parseInt(parts[2], 10).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

/**
 * Convert hex color to RGBA with specified opacity
 * @param {string} hex - Hex color code
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} RGBA color string
 */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ==========================================================================
// Color Palette Management
// ==========================================================================

/**
 * Generate and display the Tailwind color palette
 */
function createColorPalette() {
  const colorGrid = document.getElementById('color-grid');
  colorGrid.innerHTML = '';

  for (const className in tailwindColors) {
    const colorData = tailwindColors[className];
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = colorData.hex;
    swatch.dataset.hex = colorData.hex;
    swatch.dataset.rgb = colorData.rgb;
    swatch.dataset.tailwind = className.replace('bg-', '');
    swatch.dataset.fullTailwind = className;
    colorGrid.appendChild(swatch);
  }
}

/**
 * Handle click on a color swatch in the palette modal
 * @param {Event} event - Click event
 */
function handlePaletteClick(event) {
  const swatch = event.target;
  if (!swatch.classList.contains('color-swatch')) return;

  const hexValue = swatch.dataset.hex;
  const rgbValue = swatch.dataset.rgb;
  const tailwindValue = swatch.dataset.tailwind;

  // Update the corresponding input fields based on the active target
  const targetTailwind = document.getElementById(`${activeTarget}-tailwind`);
  const targetHex = document.getElementById(`${activeTarget}-hex`);
  const targetRgb = document.getElementById(`${activeTarget}-rgb`);
  const targetColorCircle = document.getElementById(`${activeTarget}-circle`);
  const targetColorInput = document.getElementById(`${activeTarget}-color`);

  if (targetTailwind) {
    targetTailwind.value = tailwindValue;
  }
  if (targetHex) {
    targetHex.value = hexValue;
  }
  if (targetRgb) {
    // Check if it's an overlay color to add opacity
    if (activeTarget.startsWith('overlay')) {
      const rgbaValue = hexToRgba(hexValue, 0.2);
      targetRgb.value = rgbaValue;
      root.style.setProperty(`--${activeTarget}`, rgbaValue);
    } else {
      targetRgb.value = rgbValue;
      root.style.setProperty(`--${activeTarget}`, hexValue);
    }
  }
  if (targetColorCircle) {
    targetColorCircle.style.backgroundColor = hexValue;
  }
  if (targetColorInput) {
    targetColorInput.value = hexValue;
  }

  closePaletteModal();
}

// ==========================================================================
// Color Control Setup
// ==========================================================================

/**
 * Set up event listeners for a color control group
 * @param {string} inputColorId - ID of color picker input
 * @param {string} inputHexId - ID of hex text input
 * @param {string} inputRgbId - ID of RGB text input
 * @param {string} inputTailwindId - ID of Tailwind text input
 * @param {string} cssVarName - CSS variable name to update
 * @param {boolean} isOverlay - Whether this is an overlay color (adds opacity)
 */
function setupColorControl(
  inputColorId,
  inputHexId,
  inputRgbId,
  inputTailwindId,
  cssVarName,
  isOverlay = false
) {
  const inputColor = document.getElementById(inputColorId);
  const inputHex = document.getElementById(inputHexId);
  const inputRgb = document.getElementById(inputRgbId);
  const inputTailwind = document.getElementById(inputTailwindId);

  // Update displays and CSS variable from color picker
  inputColor.addEventListener('input', () => {
    const hexValue = inputColor.value;
    inputHex.value = hexValue;
    if (isOverlay) {
      inputRgb.value = hexToRgba(hexValue, 0.2);
      root.style.setProperty(cssVarName, hexToRgba(hexValue, 0.2));
    } else {
      inputRgb.value = hexToRgb(hexValue);
      root.style.setProperty(cssVarName, hexValue);
    }
    inputTailwind.value = '';
  });

  // Update displays and CSS variable from hex input
  inputHex.addEventListener('input', () => {
    const hexValue = inputHex.value;
    if (/^#([0-9A-F]{3}){1,2}$/i.test(hexValue)) {
      inputColor.value = hexValue;
      if (isOverlay) {
        inputRgb.value = hexToRgba(hexValue, 0.2);
        root.style.setProperty(cssVarName, hexToRgba(hexValue, 0.2));
      } else {
        inputRgb.value = hexToRgb(hexValue);
        root.style.setProperty(cssVarName, hexValue);
      }
      inputTailwind.value = '';
    }
  });

  // Update displays and CSS variable from RGB input
  inputRgb.addEventListener('input', () => {
    const rgbValue = inputRgb.value.replace(/\s/g, ''); // Remove spaces
    if (rgbValue.startsWith('rgb(') || rgbValue.startsWith('rgba(')) {
      const hexValue = rgbToHex(rgbValue);
      if (hexValue) {
        inputColor.value = hexValue;
        inputHex.value = hexValue;
        root.style.setProperty(cssVarName, rgbValue);
        inputTailwind.value = '';
      }
    }
  });
}

// ==========================================================================
// UI State Management
// ==========================================================================

/**
 * Reset all colors to their default values
 */
function resetColors() {
  const tailwindToggle = document.getElementById('tailwind-toggle');
  tailwindToggle.checked = false;
  toggleTailwindView();

  document.getElementById('base-from-color').value =
    defaultColors['base-from'].hex;
  document.getElementById('base-via-color').value =
    defaultColors['base-via'].hex;
  document.getElementById('base-to-color').value = defaultColors['base-to'].hex;
  document.getElementById('overlay-from-color').value =
    defaultColors['overlay-from'].hex;
  document.getElementById('overlay-to-color').value =
    defaultColors['overlay-to'].hex;

  // Set initial text values and trigger updates
  updateColorDisplays(
    'base-from',
    defaultColors['base-from'].hex,
    defaultColors['base-from'].rgb,
    defaultColors['base-from'].tailwind
  );
  updateColorDisplays(
    'base-via',
    defaultColors['base-via'].hex,
    defaultColors['base-via'].rgb,
    defaultColors['base-via'].tailwind
  );
  updateColorDisplays(
    'base-to',
    defaultColors['base-to'].hex,
    defaultColors['base-to'].rgb,
    defaultColors['base-to'].tailwind
  );
  updateColorDisplays(
    'overlay-from',
    defaultColors['overlay-from'].hex,
    defaultColors['overlay-from'].rgb,
    defaultColors['overlay-from'].tailwind,
    true
  );
  updateColorDisplays(
    'overlay-to',
    defaultColors['overlay-to'].hex,
    defaultColors['overlay-to'].rgb,
    defaultColors['overlay-to'].tailwind,
    true
  );
}

/**
 * Update all color display inputs for a specific color
 * @param {string} prefix - Color prefix (e.g., 'base-from')
 * @param {string} hex - Hex color value
 * @param {string} rgb - RGB color value
 * @param {string} tailwind - Tailwind class name
 * @param {boolean} isOverlay - Whether this is an overlay color
 */
function updateColorDisplays(prefix, hex, rgb, tailwind, isOverlay = false) {
  const hexInput = document.getElementById(`${prefix}-hex`);
  const rgbInput = document.getElementById(`${prefix}-rgb`);
  const tailwindInput = document.getElementById(`${prefix}-tailwind`);
  const colorInput = document.getElementById(`${prefix}-color`);
  const colorCircle = document.getElementById(`${prefix}-circle`);

  if (hexInput) hexInput.value = hex;
  if (rgbInput) {
    if (isOverlay) {
      rgbInput.value = hexToRgba(hex, 0.2);
      root.style.setProperty(`--${prefix}`, hexToRgba(hex, 0.2));
    } else {
      rgbInput.value = rgb;
      root.style.setProperty(`--${prefix}`, hex);
    }
  }
  if (tailwindInput) tailwindInput.value = tailwind;
  if (colorInput) colorInput.value = hex;
  if (colorCircle) colorCircle.style.backgroundColor = hex;
}

/**
 * Toggle between regular color inputs and Tailwind-only view
 */
function toggleTailwindView() {
  const isTailwindOnly = document.getElementById('tailwind-toggle').checked;
  const controls = document.querySelectorAll('.color-group');

  controls.forEach((group) => {
    const colorInput = group.querySelector('.color-input');
    const colorCircle = group.querySelector('.tailwind-color-circle');
    const hexInput = group.querySelector('[id$="-hex"]');
    const rgbInput = group.querySelector('[id$="-rgb"]');
    const tailwindInput = group.querySelector('[id$="-tailwind"]');

    if (isTailwindOnly) {
      if (colorInput) colorInput.classList.add('hidden');
      if (colorCircle) colorCircle.classList.remove('hidden');
      if (hexInput) hexInput.classList.add('hidden');
      if (rgbInput) rgbInput.classList.add('hidden');
      if (tailwindInput) tailwindInput.classList.remove('hidden');
    } else {
      if (colorInput) colorInput.classList.remove('hidden');
      if (colorCircle) colorCircle.classList.add('hidden');
      if (hexInput) hexInput.classList.remove('hidden');
      if (rgbInput) rgbInput.classList.remove('hidden');
      if (tailwindInput) tailwindInput.classList.add('hidden');
    }
  });
}

// ==========================================================================
// Code Generation and Export
// ==========================================================================

/**
 * Generate and display CSS code based on current gradient configuration
 */
function provideCss() {
  const isTailwindOnly = document.getElementById('tailwind-toggle').checked;
  let cssString = '';

  if (isTailwindOnly) {
    const baseFromTailwind =
      document.getElementById('base-from-tailwind').value;
    const baseViaTailwind = document.getElementById('base-via-tailwind').value;
    const baseToTailwind = document.getElementById('base-to-tailwind').value;
    const overlayFromTailwind = document.getElementById(
      'overlay-from-tailwind'
    ).value;
    const overlayToTailwind = document.getElementById(
      'overlay-to-tailwind'
    ).value;

    // Get the actual color values from the current CSS variables
    const baseFromValue = getComputedStyle(root)
      .getPropertyValue('--base-from')
      .trim();
    const baseViaValue = getComputedStyle(root)
      .getPropertyValue('--base-via')
      .trim();
    const baseToValue = getComputedStyle(root)
      .getPropertyValue('--base-to')
      .trim();
    const overlayFromValue = getComputedStyle(root)
      .getPropertyValue('--overlay-from')
      .trim();
    const overlayToValue = getComputedStyle(root)
      .getPropertyValue('--overlay-to')
      .trim();

    // Use the Tailwind class names in comments but actual values in CSS
    cssString = `
/*
 * Base Gradient
 * Tailwind classes: ${baseFromTailwind}, ${baseViaTailwind}, ${baseToTailwind}
 */
.base-gradient {
  background-image: linear-gradient(to bottom right, ${baseFromValue}, ${baseViaValue}, ${baseToValue});
}

/*
 * Overlay Gradient  
 * Tailwind classes: ${overlayFromTailwind}, ${overlayToTailwind}
 */
.overlay-gradient {
  background-image: linear-gradient(to top right, ${overlayFromValue}, transparent, ${overlayToValue});
}
        `.trim();
  } else {
    const baseFrom = document.getElementById('base-from-rgb').value;
    const baseVia = document.getElementById('base-via-rgb').value;
    const baseTo = document.getElementById('base-to-rgb').value;
    const overlayFrom = document.getElementById('overlay-from-rgb').value;
    const overlayTo = document.getElementById('overlay-to-rgb').value;

    cssString = `
/* Base Gradient */
.base-gradient {
  background-image: linear-gradient(to bottom right, ${baseFrom}, ${baseVia}, ${baseTo});
}

/* Overlay Gradient */
.overlay-gradient {
  background-image: linear-gradient(to top right, ${overlayFrom}, transparent, ${overlayTo});
}
        `.trim();
  }

  document.getElementById('css-code-block').textContent = cssString;
  document.getElementById('css-modal').classList.remove('hidden');
}

/**
 * Copy generated CSS code to clipboard
 */
function copyCode() {
  const codeBlock = document.getElementById('css-code-block');
  const textToCopy = codeBlock.textContent;

  // Modern clipboard API with fallback
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showCopyFeedback();
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
        // Fallback to execCommand
        copyTextUsingExecCommand(textToCopy);
      });
  } else {
    copyTextUsingExecCommand(textToCopy);
  }
}

/**
 * Fallback copy method using execCommand
 * @param {string} textToCopy - Text to copy to clipboard
 */
function copyTextUsingExecCommand(textToCopy) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = textToCopy;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  try {
    document.execCommand('copy');
    showCopyFeedback();
  } catch (err) {
    console.error('Could not copy text: ', err);
  }
  document.body.removeChild(tempTextArea);
}

/**
 * Show visual feedback when code is copied
 */
function showCopyFeedback() {
  const button = document.getElementById('copy-code-button');
  const originalText = button.textContent;
  button.textContent = 'Copied!';
  setTimeout(() => {
    button.textContent = originalText;
  }, 2000);
}

// ==========================================================================
// Modal Management
// ==========================================================================

/**
 * Open the color palette modal
 * @param {Event} event - Click event from color circle
 */
function openPaletteModal(event) {
  // Set the active target based on the data-target attribute of the circle
  activeTarget = event.target.dataset.target;
  document.getElementById('palette-modal').classList.remove('hidden');
}

/**
 * Close the color palette modal
 */
function closePaletteModal() {
  document.getElementById('palette-modal').classList.add('hidden');
}

/**
 * Close the CSS code modal
 */
function closeCssModal() {
  document.getElementById('css-modal').classList.add('hidden');
}

// ==========================================================================
// Application Initialization
// ==========================================================================

/**
 * Initialize the gradient builder application
 */
function initializeGradientBuilder() {
  // Set up controls for each color
  setupColorControl(
    'base-from-color',
    'base-from-hex',
    'base-from-rgb',
    'base-from-tailwind',
    '--base-from'
  );
  setupColorControl(
    'base-via-color',
    'base-via-hex',
    'base-via-rgb',
    'base-via-tailwind',
    '--base-via'
  );
  setupColorControl(
    'base-to-color',
    'base-to-hex',
    'base-to-rgb',
    'base-to-tailwind',
    '--base-to'
  );
  setupColorControl(
    'overlay-from-color',
    'overlay-from-hex',
    'overlay-from-rgb',
    'overlay-from-tailwind',
    '--overlay-from',
    true
  );
  setupColorControl(
    'overlay-to-color',
    'overlay-to-hex',
    'overlay-to-rgb',
    'overlay-to-tailwind',
    '--overlay-to',
    true
  );

  // Attach event listeners to buttons and toggle
  document
    .getElementById('provide-css-button')
    .addEventListener('click', provideCss);
  document
    .getElementById('reset-button')
    .addEventListener('click', resetColors);
  document
    .getElementById('copy-code-button')
    .addEventListener('click', copyCode);
  document
    .getElementById('close-css-modal')
    .addEventListener('click', closeCssModal);
  document
    .getElementById('tailwind-toggle')
    .addEventListener('change', toggleTailwindView);

  // Attach event listeners to color circles for Tailwind palette
  document.querySelectorAll('.tailwind-color-circle').forEach((circle) => {
    circle.addEventListener('click', openPaletteModal);
  });

  // Attach event listeners for modals
  document
    .getElementById('close-palette-modal')
    .addEventListener('click', closePaletteModal);
  document
    .getElementById('color-grid')
    .addEventListener('click', handlePaletteClick);

  // Initial setup
  createColorPalette();
  resetColors();
}

// ==========================================================================
// DOM Ready Event Listener
// ==========================================================================

document.addEventListener('DOMContentLoaded', initializeGradientBuilder);
