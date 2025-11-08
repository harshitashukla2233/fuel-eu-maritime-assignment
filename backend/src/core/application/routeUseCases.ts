import { Route } from "../domain/Route";
import { RouteRepository } from "../ports/routeRepository";

// Use-case: List all routes
export class ListRoutes {
  constructor(private routeRepo: RouteRepository) {}

  async execute(): Promise<Route[]> {
    return await this.routeRepo.listRoutes();
  }
}

// Use-case: Set a baseline route
export class SetBaseline {
  constructor(private routeRepo: RouteRepository) {}

  async execute(routeId: string): Promise<void> {
    const route = await this.routeRepo.getRouteById(routeId);
    if (!route) throw new Error("Route not found");
    await this.routeRepo.setBaseline(routeId);
  }
}

// Use-case: Compute % difference between baseline and comparison
export function computePercentDiff(baseline: number, comparison: number) {
  return ((comparison / baseline) - 1) * 100;
}

// Use-case: Compute compliance balance
export function computeCB(target: number, actual: number, fuelConsumption: number) {
  const energy = fuelConsumption * 41000; // MJ
  return (target - actual) * energy;
}
