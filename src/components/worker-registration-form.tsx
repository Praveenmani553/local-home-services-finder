"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Worker, SERVICE_TYPES } from "@/types/worker";
import { storageService } from "@/lib/storage";
import { useRouter } from "next/navigation";

export function WorkerRegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    serviceType: "",
    contactNumber: "",
    serviceFee: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const worker: Worker = {
        id: Date.now().toString(),
        name: formData.name,
        city: formData.city,
        serviceType: formData.serviceType,
        contactNumber: formData.contactNumber,
        serviceFee: parseFloat(formData.serviceFee),
        createdAt: new Date().toISOString(),
      };

      storageService.saveWorker(worker);
      
      setSuccessMessage("Registration successful! Redirecting to browse workers...");
      setFormData({
        name: "",
        city: "",
        serviceType: "",
        contactNumber: "",
        serviceFee: "",
      });

      setTimeout(() => {
        router.push("/browse");
      }, 1500);
    } catch (error) {
      console.error("Error registering worker:", error);
      alert("Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Worker Registration</CardTitle>
        <CardDescription>
          Register as a local worker to connect with people who need your services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-primary font-semibold">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-primary/30 focus:border-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-secondary font-semibold">City *</Label>
            <Input
              id="city"
              type="text"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="border-secondary/30 focus:border-secondary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType" className="text-accent font-semibold">Service Type *</Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
              required
            >
              <SelectTrigger id="serviceType" className="border-accent/30 focus:border-accent">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="text-primary font-semibold">Contact Number *</Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="Enter your contact number"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className="border-primary/30 focus:border-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceFee" className="text-secondary font-semibold">Service Fee (₹) *</Label>
            <Input
              id="serviceFee"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter your service fee"
              value={formData.serviceFee}
              onChange={(e) => setFormData({ ...formData, serviceFee: e.target.value })}
              className="border-secondary/30 focus:border-secondary"
              required
            />
          </div>

          {successMessage && (
            <div className="bg-accent/10 border-2 border-accent text-accent-foreground px-4 py-3 rounded-md font-medium">
              {successMessage}
            </div>
          )}

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register as Worker"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}