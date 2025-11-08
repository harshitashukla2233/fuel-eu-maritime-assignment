import { Router, Request, Response } from "express";
const router = Router();

// Mock compliance balance (CB) per ship
let cbData: { shipId: string; year: number; cb: number; banked: number }[] = [
  { shipId: "S001", year: 2025, cb: 1000, banked: 0 },
  { shipId: "S002", year: 2025, cb: -500, banked: 0 },
];

// GET CB
router.get("/cb", (req: Request, res: Response) => {
  const year = Number(req.query.year);
  const data = cbData.filter(c => c.year === year);
  res.json(data);
});

// POST /banking/bank — bank positive CB
router.post("/bank", (req: Request, res: Response) => {
  const { shipId, year } = req.body;
  const ship = cbData.find(c => c.shipId === shipId && c.year === year);
  if (!ship) return res.status(404).json({ error: "Ship not found" });
  if (ship.cb <= 0) return res.status(400).json({ error: "No surplus to bank" });
  ship.banked += ship.cb;
  ship.cb = 0;
  res.json({ message: `Banked CB for ${shipId}`, ship });
});

// POST /banking/apply — apply banked surplus to deficit
router.post("/apply", (req: Request, res: Response) => {
  const { shipId, year, amount } = req.body;
  const ship = cbData.find(c => c.shipId === shipId && c.year === year);
  if (!ship) return res.status(404).json({ error: "Ship not found" });
  if (amount > ship.banked) return res.status(400).json({ error: "Amount exceeds banked CB" });
  ship.cb += amount;
  ship.banked -= amount;
  res.json({ message: `Applied ${amount} CB for ${shipId}`, ship });
});

export default router;
// POST /pools — create pool
router.post("/pools", (req: Request, res: Response) => {
  const { year, members }: { year: number; members: { shipId: string }[] } = req.body;
  const ships = members.map(m => cbData.find(c => c.shipId === m.shipId && c.year === year));
  if (ships.some(s => !s)) return res.status(404).json({ error: "One or more ships not found" });

  // Simple greedy allocation: surplus → deficits
  const totalCB = ships.reduce((sum, s) => sum + (s!.cb), 0);
  if (totalCB < 0) return res.status(400).json({ error: "Total CB < 0, cannot create pool" });

  // Adjust CBs: distribute surplus to deficits
  let surplus = ships.filter(s => s!.cb > 0).reduce((sum, s) => sum + s!.cb, 0);
  ships.filter(s => s!.cb < 0).forEach(s => {
    const deficit = -s!.cb;
    const applied = Math.min(deficit, surplus);
    s!.cb += applied;
    surplus -= applied;
  });

  res.json({ message: "Pool created", members: ships });
});
