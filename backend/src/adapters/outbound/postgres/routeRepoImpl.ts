import { Route } from "../../core/domain/Route";
import { RouteRepository } from "../../core/ports/routeRepository";

// Mock in-memory data for now (you can replace with Prisma later)
let routes: Route[] = [
  { routeId: "R001", vesselType: "Container", fuelType: "HFO", year: 2024, ghgIntensity: 91.0, fuelConsumption: 5000, distance: 12000, totalEmissions: 4500, isBaseline: false },
  { routeId: "R002", vesselType: "BulkCarrier", fuelType: "LNG", year: 2024, ghgIntensity: 88.0, fuelConsumption: 4800, distance: 11500, totalEmissions: 4200, isBaseline: false },
  { routeId: "R003", vesselType: "Tanker", fuelType: "MGO", year: 2024, ghgIntensity: 93.5, fuelConsumption: 5100, distance: 12500, totalEmissions: 4700, isBaseline: false },
  { routeId: "R004", vesselType: "RoRo", fuelType: "HFO", year: 2025, ghgIntensity: 89.2, fuelConsumption: 4900, distance: 11800, totalEmissions: 4300, isBaseline: true }, // set one baseline
  { routeId: "R005", vesselType: "Container", fuelType: "LNG", year: 2025, ghgIntensity: 90.5, fuelConsumption: 4950, distance: 11900, totalEmissions: 4400, isBaseline: false },
];

export class RouteRepoImpl implements RouteRepository {
  async listRoutes(): Promise<Route[]> {
    return routes;
  }

  async getRouteById(routeId: string): Promise<Route | null> {
    const route = routes.find(r => r.routeId === routeId);
    return route ?? null;
  }

  async setBaseline(routeId: string): Promise<void> {
    // Unset any existing baseline
    routes.forEach(r => (r.isBaseline = false));
    const route = routes.find(r => r.routeId === routeId);
    if (!route) throw new Error("Route not found");
    route.isBaseline = true;
  }
}
