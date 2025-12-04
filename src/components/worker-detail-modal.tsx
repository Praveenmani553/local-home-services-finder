"use client";

import { Worker } from "@/types/worker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, IndianRupee, MessageCircle, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface WorkerDetailModalProps {
  worker: Worker | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkerDetailModal({ worker, open, onOpenChange }: WorkerDetailModalProps) {
  if (!worker) return null;

  const handleCall = () => {
    window.location.href = `tel:${worker.contactNumber}`;
  };

  const handleMessage = () => {
    window.location.href = `sms:${worker.contactNumber}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-primary pr-8">{worker.name}</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">Complete worker information and contact details</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            <Badge className="text-sm sm:text-base px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary text-secondary-foreground">
              {worker.serviceType}
            </Badge>
          </div>

          <Separator className="bg-primary/20" />

          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">City</p>
                <p className="font-medium text-sm sm:text-base truncate">{worker.city}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-accent/10 p-1.5 sm:p-2 rounded-full shrink-0">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">Contact Number</p>
                <p className="font-medium text-sm sm:text-base truncate">{worker.contactNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-secondary/10 p-1.5 sm:p-2 rounded-full shrink-0">
                <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">Service Fee</p>
                <p className="font-medium text-base sm:text-lg text-secondary">₹{worker.serviceFee}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">Registered On</p>
                <p className="font-medium text-sm sm:text-base">{formatDate(worker.createdAt)}</p>
              </div>
            </div>
          </div>

          <Separator className="bg-primary/20" />

          <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
            <Button onClick={handleCall} className="w-full h-10 sm:h-11 text-sm sm:text-base" size="lg">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Call Now
            </Button>
            <Button onClick={handleMessage} variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground h-10 sm:h-11 text-sm sm:text-base" size="lg">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}