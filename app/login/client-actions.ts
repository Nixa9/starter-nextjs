'use client'

import { createClient } from '@/lib/supabase/client'

export async function handleGoogleSignIn() {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `/auth/callback`,
        },
    })

    if (error) {
        console.error('Google sign in error:', error)
    }
}
