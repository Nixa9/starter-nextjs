"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, GalleryVerticalEnd } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { OnboardingModal } from "@/components/onboarding-modal"

interface Team {
  id: string
  name: string
  logo_url: string | null
}

export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const [teams, setTeams] = React.useState<Team[]>([])
  const [activeTeam, setActiveTeam] = React.useState<Team | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [showOnboarding, setShowOnboarding] = React.useState(false)
  const [userId, setUserId] = React.useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  React.useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          setUserId(user.id)
          const { data: userTeams, error } = await supabase
            .from('teams')
            .select('*')
            .eq('owner_id', user.id)

          if (error) throw error

          if (userTeams && userTeams.length > 0) {
            setTeams(userTeams)
            setActiveTeam(userTeams[0])
          } else {
            // Show onboarding if user has no teams
            setShowOnboarding(true)
          }
        }
      } catch (error) {
        console.error("Error fetching teams:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()

    // Updated event handler with toast notification
    const handleTeamCreated = (event: CustomEvent) => {
      fetchTeams()
      // Add toast notification
      const teamName = event.detail?.name || "Team"
      toast.success(`${teamName} successfully created!`, {
        description: "You can now start inviting members to your team.",
        duration: 5000,
      })
    }

    window.addEventListener('teamCreated', handleTeamCreated as EventListener)

    return () => {
      window.removeEventListener('teamCreated', handleTeamCreated as EventListener)
    }
  }, [supabase])

  const handleCreateTeam = () => {
    // Open modal to create new team
    router.push('/dashboard/teams/new')
  }

  if (loading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Loading...</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  // Uklonjena provera za activeTeam
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {activeTeam ? (
                  <>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={activeTeam.logo_url || undefined} />
                      <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground rounded-lg">
                        {activeTeam.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{activeTeam.name}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <GalleryVerticalEnd className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Select Team</span>
                    </div>
                  </>
                )}
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Teams
              </DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2"
                >
                  <Avatar className="h-6 w-6 rounded-xs">
                    <AvatarImage src={team.logo_url || undefined} />
                    <AvatarFallback className="border text-xs">
                      {team.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2" onClick={handleCreateTeam}>
                <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Add team</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {userId && (
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          userId={userId}
        />
      )}
    </>
  )
}
