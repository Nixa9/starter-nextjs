import { AppSidebar } from "@/components/app-sidebar"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { TrendChart } from "@/components/dashboard/trend-chart"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Playground
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <ActivityChart />
            <TrendChart />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-4">Total Users</h3>
              <p className="text-3xl font-bold">24,531</p>
              <p className="text-muted-foreground text-sm mt-2">+2.5% from last month</p>
            </div>
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-4">Active Sessions</h3>
              <p className="text-3xl font-bold">1,203</p>
              <p className="text-muted-foreground text-sm mt-2">Current active users</p>
            </div>
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-4">Conversion Rate</h3>
              <p className="text-3xl font-bold">3.2%</p>
              <p className="text-muted-foreground text-sm mt-2">+0.3% from last week</p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
