"use client";

import { WorkerRegistrationForm } from "@/components/worker-registration-form";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <WorkerRegistrationForm />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}