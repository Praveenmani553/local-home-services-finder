import { Worker } from "@/types/worker";

const WORKERS_KEY = "local_workers_data";

export const storageService = {
  getWorkers: (): Worker[] => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(WORKERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading workers from storage:", error);
      return [];
    }
  },

  saveWorker: (worker: Worker): void => {
    try {
      const workers = storageService.getWorkers();
      workers.push(worker);
      localStorage.setItem(WORKERS_KEY, JSON.stringify(workers));
    } catch (error) {
      console.error("Error saving worker to storage:", error);
      throw error;
    }
  },

  updateWorker: (id: string, updatedWorker: Worker): void => {
    try {
      const workers = storageService.getWorkers();
      const index = workers.findIndex((w) => w.id === id);
      if (index !== -1) {
        workers[index] = updatedWorker;
        localStorage.setItem(WORKERS_KEY, JSON.stringify(workers));
      }
    } catch (error) {
      console.error("Error updating worker in storage:", error);
      throw error;
    }
  },

  deleteWorker: (id: string): void => {
    try {
      const workers = storageService.getWorkers();
      const filtered = workers.filter((w) => w.id !== id);
      localStorage.setItem(WORKERS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting worker from storage:", error);
      throw error;
    }
  },
};
