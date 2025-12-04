"use client";

import { Worker } from "@/types/worker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Wrench, IndianRupee } from "lucide-react";

interface WorkerCardProps {
  worker: Worker;
  onViewDetails: (worker: Worker) => void;
}

export function WorkerCard({ worker, onViewDetails }: WorkerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary">
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg sm:text-xl text-primary line-clamp-1">{worker.name}</CardTitle>
          <Badge className="bg-secondary text-secondary-foreground text-xs whitespace-nowrap shrink-0">{worker.serviceType}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <div className="bg-primary/10 p-1 sm:p-1.5 rounded shrink-0">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          </div>
          <span className="truncate">{worker.city}</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <div className="bg-accent/10 p-1 sm:p-1.5 rounded shrink-0">
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
          </div>
          <span className="truncate">{worker.contactNumber}</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
          <div className="bg-secondary/10 p-1 sm:p-1.5 rounded shrink-0">
            <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
          </div>
          <span className="text-secondary">₹{worker.serviceFee}</span>
        </div>

        <Button 
          onClick={() => onViewDetails(worker)} 
          className="w-full mt-3 sm:mt-4 h-9 sm:h-10 text-sm sm:text-base"
          variant="default"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}