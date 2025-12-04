export interface Worker {
  id: string;
  name: string;
  city: string;
  serviceType: string;
  contactNumber: string;
  serviceFee: number;
  createdAt: string;
}

export const SERVICE_TYPES = [
  "Electrician",
  "Plumber",
  "Mechanic",
  "Carpenter",
  "Painter",
  "Cleaner",
  "Bike Repair",
  "AC Repair",
  "Appliance Repair",
  "Other"
] as const;
