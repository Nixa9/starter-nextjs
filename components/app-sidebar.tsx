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
        url: "/dashboard/history",
      },
      {
        title: "Starred",
        url: "/dashboard/starred",
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
      },
    ],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "/dashboard/settings/general",
      },
      {
        title: "Team",
        url: "/dashboard/settings/team",
      },
      {
        title: "Billing",
        url: "/dashboard/settings/billing",
      },
      {
        title: "Limits",
        url: "/dashboard/settings/limits",
      },
    ],
  },
]

const projectItems = [
  {
    name: "Design Engineering",
    url: "/dashboard/projects/design",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "/dashboard/projects/sales",
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
