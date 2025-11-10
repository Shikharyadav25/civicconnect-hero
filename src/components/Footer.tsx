import { MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-base md:text-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">CivicConnect</span>
            </div>
            <p className="text-base text-muted-foreground">
              Empowering citizens through technology. Making civic engagement accessible,
              transparent, and effective for everyone.
            </p>
          </div>

          {/* Contact Info */}
          <div id="contact" className="flex flex-col items-end">
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href="mailto:hello@civicconnect.com" className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                hello@civicconnect.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CivicConnect. All rights reserved. Building better communities together.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
