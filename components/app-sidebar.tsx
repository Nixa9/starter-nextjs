"use client"

import * as React from "react"
import {
  Frame,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"

const navMainItems = [
  {
    title: "Playground",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "History",
        url: "/dashboard", // Point to existing dashboard page
      },
      {
        title: "Starred",
        url: "/dashboard", // Point to existing dashboard page
      },
      {
        title: "Settings",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Settings",
    url: "/dashboard",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "/dashboard",
      },
      {
        title: "Team",
        url: "/dashboard",
      },
      {
        title: "Billing",
        url: "/dashboard", // Point to existing dashboard page
      },
      {
        title: "Limits",
        url: "/dashboard", // Point to existing dashboard page
      },
    ],
  },
]

const projectItems = [
  {
    name: "Design Engineering",
    url: "/dashboard", // Point to existing dashboard page
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "/dashboard", // Point to existing dashboard page
    icon: PieChart,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavProjects projects={projectItems} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
