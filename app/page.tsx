import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold">
            AI Chat Assistant
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Your AI-Powered Chat History Assistant
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Organize, search, and analyze your chat conversations with the power of AI.
              Keep track of important discussions and never lose valuable information again.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/50 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-background p-8">
                <h3 className="text-lg font-semibold">Smart Organization</h3>
                <p className="mt-2 text-muted-foreground">
                  Automatically categorize and tag your conversations for easy access
                </p>
              </div>
              <div className="rounded-lg border bg-background p-8">
                <h3 className="text-lg font-semibold">Powerful Search</h3>
                <p className="mt-2 text-muted-foreground">
                  Find any conversation instantly with our advanced search capabilities
                </p>
              </div>
              <div className="rounded-lg border bg-background p-8">
                <h3 className="text-lg font-semibold">AI Analysis</h3>
                <p className="mt-2 text-muted-foreground">
                  Get insights and summaries of your conversations powered by AI
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} AI Chat Assistant. All rights reserved.
        </div>
      </footer>
    </div>
  )
}