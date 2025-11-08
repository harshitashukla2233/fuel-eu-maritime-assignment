import express from "express";
import cors from "cors";
import routeRouter from "../../adapters/inbound/http/routes"; // ✅ CommonJS, no .js

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/routes", routeRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import complianceRouter from "../../adapters/inbound/http/compliance";
app.use("/compliance", complianceRouter);

