import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
          <Heart className="h-6 w-6 fill-primary" />
            <span className="sm:text-base md:text-xl">Vasantham Charitable Trust</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About Us
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary">
              Activities
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/activities" className="w-full cursor-pointer">
                  All Activities
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/activities/elder-care" className="w-full cursor-pointer">
                  Elder Care Services
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/activities/food-distribution" className="w-full cursor-pointer">
                  Food Distribution
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/activities/education" className="w-full cursor-pointer">
                  Educational Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/activities/medical-camps" className="w-full cursor-pointer">
                  Medical Camps
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Link href="/gallery" className="text-sm font-medium transition-colors hover:text-primary">
            Gallery
          </Link> */}
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
          <Button asChild size="sm" className="ml-2">
            <Link href="/donate">Donate Now</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8 p-4" aria-label="Mobile navigation">
              <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/about" className="text-lg font-medium transition-colors hover:text-primary">
                About Us
              </Link>
              <Link href="/activities" className="text-lg font-medium transition-colors hover:text-primary">
                All Activities
              </Link>
              <Link
                href="/activities/elder-care"
                className="pl-4 text-base font-medium transition-colors hover:text-primary"
              >
                Elder Care Services
              </Link>
              <Link
                href="/activities/food-distribution"
                className="pl-4 text-base font-medium transition-colors hover:text-primary"
              >
                Food Distribution
              </Link>
              <Link
                href="/activities/education"
                className="pl-4 text-base font-medium transition-colors hover:text-primary"
              >
                Educational Support
              </Link>
              <Link
                href="/activities/medical-camps"
                className="pl-4 text-base font-medium transition-colors hover:text-primary"
              >
                Medical Camps
              </Link>
              <Link href="/gallery" className="text-lg font-medium transition-colors hover:text-primary">
                Gallery
              </Link>
              <Link href="/contact" className="text-lg font-medium transition-colors hover:text-primary">
                Contact
              </Link>
              <Button asChild className="mt-4">
                <Link href="/donate">Donate Now</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
