import { Route } from "../domain/Route";

export interface RouteRepository {
  listRoutes(): Promise<Route[]>;
  getRouteById(routeId: string): Promise<Route | null>;
  setBaseline(routeId: string): Promise<void>;
}
