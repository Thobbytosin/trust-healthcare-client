import {
  ContactSupportIcon,
  ContactSupportOutlinedIcon,
  HomeIcon,
  HomeOutlinedIcon,
  MedicalServicesIcon,
  MedicalServicesOutlinedIcon,
  NotificationsIcon,
  PersonIcon,
  SettingsIcon,
  VaccinesIcon,
  VaccinesOutlinedIcon,
} from "@/icons/icons";

export const menuItems = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon fontSize="small" color="inherit" />,
    iconOutline: <HomeOutlinedIcon fontSize="small" color="inherit" />,
  },
  {
    name: "Services",
    dropdown: ["Consultation", "Medical Check-up"],
    icon: <MedicalServicesIcon fontSize="small" color="inherit" />,
    iconOutline: (
      <MedicalServicesOutlinedIcon fontSize="small" color="inherit" />
    ),
  },

  {
    name: "Find Doctors",
    link: "/find-doctors",
    icon: <VaccinesIcon fontSize="small" color="inherit" />,
    iconOutline: <VaccinesOutlinedIcon fontSize="small" color="inherit" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <ContactSupportIcon fontSize="small" color="inherit" />,
    iconOutline: (
      <ContactSupportOutlinedIcon fontSize="small" color="inherit" />
    ),
  },
];

export const userMenuItems = [
  { name: "Profile", icon: <PersonIcon fontSize="small" color="inherit" /> },
  {
    name: "Notifications",
    tab: "notifications",
    icon: <NotificationsIcon fontSize="small" color="inherit" />,
  },
  {
    name: "Settings",
    tab: "settings",
    icon: <SettingsIcon fontSize="small" color="inherit" />,
  },
];
