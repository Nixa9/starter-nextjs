"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

interface OnboardingModalProps {
    isOpen: boolean
    onClose: () => void
    userId: string
}

export function OnboardingModal({ isOpen, onClose, userId }: OnboardingModalProps) {
    const [step, setStep] = useState(1)
    const [teamName, setTeamName] = useState("")
    const [teamLogo, setTeamLogo] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

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

    const handleNext = () => {
        if (step === 1 && !teamName.trim()) {
            setError("Team name is required")
            return
        }
        setError(null)
        setStep(step + 1)
    }

    const handleBack = () => {
        setStep(step - 1)
    }

    const handleSubmit = async () => {
        if (!teamName.trim()) {
            setError("Team name is required")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            // Upload logo if exists
            let logoUrl = null
            if (teamLogo) {
                const fileName = `team-logos/${userId}-${Date.now()}`
                const { error: uploadError } = await supabase.storage
                    .from('team-logos')
                    .upload(fileName, teamLogo)

                if (uploadError) throw uploadError

                const { data: publicUrlData } = supabase.storage
                    .from('team-logos')
                    .getPublicUrl(fileName)

                logoUrl = publicUrlData.publicUrl
            }

            // Create team in database
            const { data: newTeam, error: teamError } = await supabase
                .from('teams')
                .insert([
                    {
                        name: teamName,
                        logo_url: logoUrl,
                        owner_id: userId,
                    }
                ])
                .select()
                .single()

            if (teamError) throw teamError

            // Mark onboarding as completed
            localStorage.setItem("onboarding_completed", "true")

            // Close modal and refresh
            onClose()
            router.refresh()
            
            // Emit custom event with team details
            const event = new CustomEvent('teamCreated', { 
              detail: { 
                id: newTeam.id,
                name: teamName 
              } 
            })
            window.dispatchEvent(event)
            
            // Remove window.location.reload() as it's no longer needed
        } catch (err) {
            console.error("Error creating team:", err)
            setError("Failed to create team. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Welcome to {process.env.NEXT_PUBLIC_APP_NAME || "Acme Inc"}</DialogTitle>
                    <DialogDescription>
                        Let&apos;s set up your team to get started.
                    </DialogDescription>
                </DialogHeader>

                {step === 1 && (
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="team-name">Team Name</Label>
                            <Input
                                id="team-name"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder="Acme Inc"
                            />
                            {error && <p className="text-sm text-destructive">{error}</p>}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="team-logo">Team Logo</Label>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={logoPreview || undefined} />
                                    <AvatarFallback>{teamName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <Input
                                    id="team-logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground">Optional: Upload a logo for your team</p>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    {step > 1 && (
                        <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                            Back
                        </Button>
                    )}
                    {step < 2 ? (
                        <Button onClick={handleNext}>Next</Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Create Team
                                </>
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}