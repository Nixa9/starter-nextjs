"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface Team {
    id: string
    name: string
    logo_url: string | null
    owner_id: string
}

interface TeamSettingsModalProps {
    isOpen: boolean
    onClose: () => void
    teamId: string
    onTeamUpdated?: (team: Team) => void
}

export function TeamSettingsModal({ isOpen, onClose, teamId, onTeamUpdated }: TeamSettingsModalProps) {
    const [team, setTeam] = useState<Team | null>(null)
    const [teamName, setTeamName] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [teamLogo, setTeamLogo] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const fetchTeam = async () => {
            if (!teamId) return

            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('teams')
                    .select('*')
                    .eq('id', teamId)
                    .single()

                if (error) throw error

                if (data) {
                    setTeam(data)
                    setTeamName(data.name)
                    if (data.logo_url) {
                        setLogoPreview(data.logo_url)
                    }
                }
            } catch (error) {
                console.error("Error fetching team:", error)
                toast.error("Failed to load team settings")
            } finally {
                setLoading(false)
            }
        }

        if (isOpen && teamId) {
            fetchTeam()
        }
    }, [teamId, isOpen, supabase])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setTeamLogo(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = async () => {
        if (!teamName.trim()) {
            toast.error("Team name is required")
            return
        }

        setSaving(true)

        try {
            let logoUrl = team?.logo_url || null

            // Upload new logo if selected
            if (teamLogo) {
                const fileName = `team-logos/${team?.owner_id}-${Date.now()}`
                const { error: uploadError } = await supabase.storage
                    .from('team-logos')
                    .upload(fileName, teamLogo)

                if (uploadError) throw uploadError

                const { data: publicUrlData } = supabase.storage
                    .from('team-logos')
                    .getPublicUrl(fileName)

                logoUrl = publicUrlData.publicUrl
            }

            // Update team in database
            const { error: updateError } = await supabase
                .from('teams')
                .update({
                    name: teamName,
                    logo_url: logoUrl,
                })
                .eq('id', teamId)
                .select()
                .single()

            if (updateError) throw updateError

            toast.success("Team settings updated successfully")

            // Update local state
            if (team) {
                const updatedTeam = {
                    ...team,
                    name: teamName,
                    logo_url: logoUrl
                }
                setTeam(updatedTeam)

                // Call the callback with the updated team
                if (onTeamUpdated) {
                    onTeamUpdated(updatedTeam)
                }
            }

            // Close the modal
            onClose()
        } catch (err) {
            console.error("Error updating team:", err)
            toast.error("Failed to update team settings")
        } finally {
            setSaving(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Team Settings</DialogTitle>
                    <DialogDescription>
                        Manage your team profile and settings
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="py-6">Loading team settings...</div>
                ) : (
                    <div className="space-y-6 py-4">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={logoPreview || undefined} />
                                        <AvatarFallback className="text-lg">
                                            {teamName.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-2 -right-2">
                                        <Label htmlFor="logo-upload" className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="17 8 12 3 7 8"></polyline>
                                                <line x1="12" y1="3" x2="12" y2="15"></line>
                                            </svg>
                                            <span className="sr-only">Upload logo</span>
                                        </Label>
                                        <Input
                                            id="logo-upload"
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium">Team Logo</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Upload a logo for your team
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="team-name">Team Name</Label>
                                <Input
                                    id="team-name"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="Enter team name"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={saving || loading}>
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}