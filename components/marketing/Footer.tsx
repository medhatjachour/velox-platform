import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="font-bold text-xl mb-2 bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Velox
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              The last business card you{'\''}ll ever need. AI-powered portfolios meets NFC technology for instant networking.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://twitter.com" className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://github.com" className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://linkedin.com" className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Velox. All rights reserved.</p>
          <p>Built with ❤️ for modern professionals</p>
        </div>
      </div>
    </footer>
  );
}
