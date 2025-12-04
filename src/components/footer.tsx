import Link from "next/link";
import { Wrench } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-primary/20 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">LocalWorkers</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Connecting local workers with people in need of quick and reliable home repair services. 
              Supporting local communities one service at a time.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-muted-foreground hover:text-secondary transition-colors">
                  Browse Workers
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-accent transition-colors">
                  Register as Worker
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-secondary">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Electrician</li>
              <li>Plumber</li>
              <li>Mechanic</li>
              <li>Carpenter</li>
              <li>And more...</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; FOR PEOPLES AND WORKERS.</p>
        </div>
      </div>
    </footer>
  );
}