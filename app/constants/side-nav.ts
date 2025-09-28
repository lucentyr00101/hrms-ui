export const navItems = [
  {
    label: "Dashboard",
    icon: "i-material-symbols:space-dashboard",
    to: "/",
  },
  {
    label: "Employees",
    icon: "i-material-symbols:emoji-people",
    to: "/employees",
  },
  {
    label: "Interviews",
    icon: "i-material-symbols:3p-rounded",
    to: "/interviews",
    children: [
      {
        label: "Candidates",
        icon: "i-material-symbols:person-search",
        to: "/interviews/candidates",
      }
    ]
  },
];

// Additional navigation sections for collapsible groups
export const additionalNavItems = [
  {
    label: "Reports",
    icon: "i-material-symbols:analytics",
    to: "/reports",
  },
  {
    label: "Settings",
    icon: "i-material-symbols:settings", 
    to: "/settings",
  },
];
