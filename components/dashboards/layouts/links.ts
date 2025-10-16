import {
  FaCoins,
  FaClipboardCheck,
  FaPeopleGroup,
  FaHeadset,
  FaGear,
} from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import { HiEnvelope } from "react-icons/hi2";

interface MenuProps {
  name: string;
  href: string;
  icon: React.JSXElementConstructor<any>;
  badgeLabel?: string | undefined;
  children?: React.ReactNode;
}

export const adminNavItems: MenuProps[] = [
  { name: "Dashboard", href: "/admin", icon: RxDashboard },
  {
    name: "Bookings",
    href: "/admin/bookings",
    icon: IoBriefcase,
  },
  {
    name: "Vendors",
    href: "/admin/vendor",
    icon: FaUser,
  },
  {
    name: "Vendor Registration",
    href: "/admin/vendor-registration",
    icon: FaClipboardCheck,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: FaPeopleGroup,
  },
  {
    name: "Transactions",
    href: "/admin/transactions",
    icon: FaCoins,
  },
  {
    name: "Withdrawals",
    href: "/admin/withdrawals",
    icon: FaMoneyBill,
    badgeLabel: "soon",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: FaGear,
    badgeLabel: "Soon",
  },
  {
    name: "Support",
    href: "/admin/support",
    icon: FaHeadset,
    badgeLabel: "Soon",
  },
];

export const vendorNavItems: MenuProps[] = [
  { name: "Dashboard", href: "/vendor", icon: RxDashboard },
  {
    name: "Bookings",
    href: "/vendor/bookings",
    icon: IoBriefcase,
  },
  {
    name: "Messages",
    href: "/vendor/messages",
    icon: HiEnvelope,
  },
  {
    name: "Wallet",
    href: "/vendor/wallet",
    icon: FaCoins,
    badgeLabel: "soon",
  },
  {
    name: "Settings",
    href: "/vendor/settings",
    icon: FaGear,
    badgeLabel: "Soon",
  },
  {
    name: "Support",
    href: "/vendor/support",
    icon: FaHeadset,
    badgeLabel: "Soon",
  },
];

export const customerNavItems: MenuProps[] = [
  { name: "Directory", href: "/customer", icon: RxDashboard },
  {
    name: "Bookings",
    href: "/customer/bookings",
    icon: IoBriefcase,
  },
  {
    name: "Messages",
    href: "/customer/messages",
    icon: HiEnvelope,
  },
  {
    name: "Support",
    href: "/customer/support",
    icon: FaHeadset,
    children: "New Ticket",
  },
  {
    name: "Settings",
    href: "/customer/settings",
    icon: FaGear,
  },
];

// export const VenueOwnerNavItems: MenuProps[] = [
//   { name: "Directory", href: "/directory", icon: Home },

//   {
//     name: "Bookings",
//     href: "/directory/bookings",
//     icon: Calendar,
//   },
//   {
//     name: "Messages",
//     href: "/directory/messages",
//     icon: MessageSquare,
//   },
//   {
//     name: "Support",
//     href: "/directory/support",
//     icon: HelpCircle,
//   },
//   {
//     name: "Settings",
//     href: "/directory/settings",
//     icon: Settings,
//   }
// ];
