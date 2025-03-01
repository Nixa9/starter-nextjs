import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-border/40 backdrop-blur-sm fixed w-full z-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg">ChatHistory</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-medium">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="text-sm font-medium">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden pt-36 pb-24">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-background to-transparent"></div>
            <div className="absolute left-1/2 top-0 ml-[-38%] h-[500px] w-[80%] rounded-full bg-primary/10 blur-[100px]"></div>
            <div className="absolute right-1/2 top-1/3 ml-[-38%] h-[300px] w-[80%] rounded-full bg-secondary/10 blur-[100px]"></div>
          </div>

          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border border-border/40 bg-background/80 px-3 py-1 text-sm backdrop-blur">
                <span className="mr-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">New</span>
                <span className="text-muted-foreground">Introducing AI-powered chat history</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Your conversations,
                <span className="text-primary"> intelligently organized</span>
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground">
                Never lose track of important discussions again. ChatHistory uses AI to organize,
                search, and analyze your conversations across all platforms.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Get started for free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    See how it works
                  </Button>
                </Link>
              </div>
            </div>
          
            {/* Hero image */}
            <div className="mt-16 rounded-xl border border-border/40 bg-background/80 shadow-lg backdrop-blur-sm overflow-hidden">
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-muted/50 to-muted p-4">
                <div className="h-full w-full rounded-lg bg-card flex items-center justify-center">
                  <p className="text-muted-foreground">App screenshot will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}