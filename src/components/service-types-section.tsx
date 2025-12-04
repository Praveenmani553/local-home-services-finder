"use client";

import { SERVICE_TYPES } from "@/types/worker";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Zap, 
  Wrench, 
  Droplet, 
  Hammer, 
  Paintbrush, 
  Sparkles, 
  Bike, 
  Wind,
  Settings,
  MoreHorizontal
} from "lucide-react";

const serviceIcons: Record<string, React.ReactNode> = {
  "Electrician": <Zap className="w-8 h-8" />,
  "Plumber": <Droplet className="w-8 h-8" />,
  "Mechanic": <Wrench className="w-8 h-8" />,
  "Carpenter": <Hammer className="w-8 h-8" />,
  "Painter": <Paintbrush className="w-8 h-8" />,
  "Cleaner": <Sparkles className="w-8 h-8" />,
  "Bike Repair": <Bike className="w-8 h-8" />,
  "AC Repair": <Wind className="w-8 h-8" />,
  "Appliance Repair": <Settings className="w-8 h-8" />,
  "Other": <MoreHorizontal className="w-8 h-8" />,
};

const serviceColors = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-primary",
];

export function ServiceTypesSection() {
  return (
    <div className="bg-gradient-to-b from-muted/30 to-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse workers by service type and find the right professional for your needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-8">
          {SERVICE_TYPES.map((service, index) => (
            <Link key={service} href={`/browse?service=${encodeURIComponent(service)}`}>
              <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full border-2 hover:border-primary">
                <CardContent className="p-6 text-center">
                  <div className={`${serviceColors[index]} mb-3 flex justify-center`}>
                    {serviceIcons[service]}
                  </div>
                  <h3 className="font-semibold text-sm">{service}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/browse">
            <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              View All Workers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}