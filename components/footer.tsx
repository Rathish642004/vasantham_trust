import Link from "next/link";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface ContactDetails {
  address: string;
  phone: string;
  email: string;
  notification_email: string;
}

async function getContactDetails(): Promise<ContactDetails> {
  try {
    const supabase = await createClient();
    const { data: settings } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "contact_details")
      .single();

    return settings?.value || getDefaultContactDetails();
  } catch {
    return getDefaultContactDetails();
  }
}

function getDefaultContactDetails(): ContactDetails {
  return {
    address:
      "3-55, Samathuvapuram, ward no 3, Kothapulli, Reddiyarchathiram (po), Dindigul District, Tamil Nadu - 624 622",
    phone: "+91 73737 07162",
    email: "vasanthamcharitabletrust82@gmail.com",
    notification_email: "",
  };
}

export async function Footer() {
  const contactDetails = await getContactDetails();
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-serif text-lg font-bold text-primary">
              <Heart className="h-5 w-5 fill-primary" />
              <Link href="/auth/login" className="w-full cursor-pointer">
                  Vasantham
              </Link>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A DARPAN registered charitable trust dedicated to transforming
              lives through compassionate service in rural Tamil Nadu.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                href="/about"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                About Us
              </Link>
              <Link
                href="/activities"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Our Activities
              </Link>
              <Link
                href="/gallery"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Photo Gallery
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="whitespace-pre-line">{contactDetails.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{contactDetails.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{contactDetails.email}</span>
              </div>
            </div>
          </div>

          {/* DARPAN Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Registration</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">DARPAN ID:</span>
                <br />
                TN/2025/0697149
              </p>
              <p className="text-xs leading-relaxed">
                Registered under the Indian Trust Act with full transparency and
                compliance.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Vasantham Charitable Trust. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
