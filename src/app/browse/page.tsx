"use client";

import { useState, useEffect, Suspense } from "react";
import { Worker, SERVICE_TYPES } from "@/types/worker";
import { storageService } from "@/lib/storage";
import { WorkerCard } from "@/components/worker-card";
import { WorkerDetailModal } from "@/components/worker-detail-modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { useSearchParams } from "next/navigation";

function BrowseContent() {
  const searchParams = useSearchParams();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchCity, setSearchCity] = useState(searchParams.get("city") || "");
  const [filterService, setFilterService] = useState(searchParams.get("service") || "");

  useEffect(() => {
    const loadedWorkers = storageService.getWorkers();
    setWorkers(loadedWorkers);
    setFilteredWorkers(loadedWorkers);
  }, []);

  useEffect(() => {
    let filtered = workers;

    if (searchCity) {
      filtered = filtered.filter((worker) =>
        worker.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    }

    if (filterService && filterService !== "all") {
      filtered = filtered.filter((worker) => worker.serviceType === filterService);
    }

    setFilteredWorkers(filtered);
  }, [searchCity, filterService, workers]);

  const handleViewDetails = (worker: Worker) => {
    setSelectedWorker(worker);
    setModalOpen(true);
  };

  const handleClearFilters = () => {
    setSearchCity("");
    setFilterService("");
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
            Find <span className="text-primary">Local Workers</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Search and connect with skilled workers in your area
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-sm border-2 border-primary/20 p-3 sm:p-4 md:p-6 mb-4 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="bg-secondary/10 p-1.5 sm:p-2 rounded-lg">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold">Search & Filter</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="search-city" className="text-primary font-semibold text-sm sm:text-base">Search by City</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                <Input
                  id="search-city"
                  type="text"
                  placeholder="Enter city name..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="pl-9 border-primary/30 focus:border-primary h-9 sm:h-10 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-service" className="text-secondary font-semibold text-sm sm:text-base">Filter by Service</Label>
              <Select value={filterService} onValueChange={setFilterService}>
                <SelectTrigger id="filter-service" className="border-secondary/30 focus:border-secondary h-9 sm:h-10 text-sm sm:text-base">
                  <SelectValue placeholder="All services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {SERVICE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground h-9 sm:h-10 text-sm sm:text-base"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm font-medium">
            Showing <span className="text-primary">{filteredWorkers.length}</span> of <span className="text-secondary">{workers.length}</span> workers
          </p>
        </div>

        {filteredWorkers.length === 0 ? (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="bg-primary/10 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">No workers found</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              {workers.length === 0
                ? "No workers have registered yet. Be the first to register!"
                : "Try adjusting your search or filter criteria"}
            </p>
            {workers.length === 0 && (
              <Link href="/register">
                <Button className="bg-accent hover:bg-accent/90 h-9 sm:h-10 text-sm sm:text-base">Register as Worker</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredWorkers.map((worker) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        <WorkerDetailModal
          worker={selectedWorker}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Suspense fallback={
        <div className="flex-1 bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading workers...</p>
          </div>
        </div>
      }>
        <BrowseContent />
      </Suspense>
      <Footer />
    </div>
  );
}