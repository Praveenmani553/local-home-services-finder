"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Search, Phone, UserCheck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-10 h-10" />,
    title: "Search",
    description: "Find workers by city or service type using our easy search and filter options",
    color: "bg-primary text-primary-foreground",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: <UserCheck className="w-10 h-10" />,
    title: "Choose",
    description: "Browse worker profiles with details about their services, fees, and contact information",
    color: "bg-secondary text-secondary-foreground",
    iconBg: "bg-secondary/10 text-secondary",
  },
  {
    icon: <Phone className="w-10 h-10" />,
    title: "Connect",
    description: "Contact workers directly via phone or message to discuss your requirements",
    color: "bg-accent text-accent-foreground",
    iconBg: "bg-accent/10 text-accent",
  },
  {
    icon: <CheckCircle className="w-10 h-10" />,
    title: "Get Help",
    description: "Get your home problems solved quickly by skilled local professionals",
    color: "bg-primary text-primary-foreground",
    iconBg: "bg-primary/10 text-primary",
  },
];

export function HowItWorks() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four simple steps to connect with local workers and solve your home problems
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-2 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold`}>
                    {index + 1}
                  </div>
                  <div className={`${step.iconBg} mb-4 flex justify-center`}>
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-border to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}