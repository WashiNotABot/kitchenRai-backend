import Express, { Response, Request } from "express";
import config from "./config/config";
import cors from "cors";
import Table from "./src/table";
import Menu from "./src/menu";
import Kitchen from "./src/kitchen";
const app = Express();

app.use(cors());
app.use(Express.json());
const ServerPORT = config.server.SERVERPORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/tables", async (req: Request, res: Response) => {
  console.log("GET /tables");
  const tempTable = new Table();
  res.json(await tempTable.getAll());
  tempTable.closeConnection();
});

app.get("/tables/:id", async (req: Request, res: Response) => {
  console.log("GET /tables/:id");
  const tempTable = new Table();
  res.json(await tempTable.getDetails(parseInt(req.params.id)));
  tempTable.setID(parseInt(req.params.id));
  tempTable.closeConnection();
});

app.get("/tables/:id/checkin", async (req: Request, res: Response) => {
  console.log("GET /tables/:id/checkin");
  const tempTable = new Table();
  res.json(await tempTable.checkIn(parseInt(req.params.id)));
  tempTable.checkIn(parseInt(req.params.id));
  tempTable.closeConnection();
});

app.get("/tables/:id/checkout", async (req: Request, res: Response) => {
  console.log("GET /tables/:id/checkout");
  const tempTable = new Table();
  res.json(await tempTable.checkOut(parseInt(req.params.id)));
  tempTable.checkOut(parseInt(req.params.id));
  tempTable.closeConnection();
});

app.get("/menu", async (req: Request, res: Response) => {
  console.log("GET /menu");
  const tempMenu = new Menu();
  res.json(await tempMenu.getAll());
  tempMenu.closeConnection();
});

app.get("/menu/:id", async (req: Request, res: Response) => {
  console.log("GET /menu/:id");
  const tempMenu = new Menu();
  res.json(await tempMenu.getDetails(parseInt(req.params.id)));
  tempMenu.closeConnection();
});

app.get("/orders", async (req: Request, res: Response) => {
  console.log("GET /orders");
  const tempKitchen = new Kitchen();
  res.json(await tempKitchen.getAllOrders());
  tempKitchen.closeConnection();
});

app.get(
  "/orders/addItem/:id/menu/:itemID/table/:tableID",
  async (req: Request, res: Response) => {
    console.log("GET /orders/addItem/:id/:itemID");
    const tempKitchen = new Kitchen();
    res.json(
      await tempKitchen.handleAddItem(
        parseInt(req.params.id),
        parseInt(req.params.itemID),
        parseInt(req.params.tableID)
      )
    );
    tempKitchen.closeConnection();
  }
);

app.get("/orders/:id", async (req: Request, res: Response) => {
  console.log("GET /orders/:id");
  const tempKitchen = new Kitchen();
  res.json(await tempKitchen.getDetails(parseInt(req.params.id)));
  tempKitchen.closeConnection();
});

app.get("/orders/:id/serve", async (req: Request, res: Response) => {
  console.log("GET /orders/:id/serve");
  const tempKitchen = new Kitchen();
  res.json(await tempKitchen.serve(parseInt(req.params.id)));
  tempKitchen.closeConnection();
});

app.get("/orders/:id/cancel", async (req: Request, res: Response) => {
  console.log("GET /orders/:id/cancel");
  const tempKitchen = new Kitchen();
  res.json(await tempKitchen.cancel(parseInt(req.params.id)));
  tempKitchen.closeConnection();
});

app.get("/receipt", async (req: Request, res: Response) => {
  console.log("GET /receipt");
  const tempKitchen = new Kitchen();
  res.json(await tempKitchen.getAllReceipt());
  tempKitchen.closeConnection();
});

app.get("/receipt/:id/", async (req: Request, res: Response) => {
  console.log("GET /receipt/:id/");
  const tempKitchen = new Kitchen();
  res.json(await tempKitchen.getReceipt(parseInt(req.params.id)));
  tempKitchen.closeConnection();
});

app.get("/receipt/:id/pay", async (req: Request, res: Response) => {
  console.log("GET /receipt/:id/pay");
  const tempKitchen = new Kitchen();
  res.json(await tempKitchen.payReceipt(parseInt(req.params.id)));
  tempKitchen.closeConnection();
});

app.get("/receipt/:id/cancel", async (req: Request, res: Response) => {
  console.log("GET /receipt/:id/pay");
  const tempKitchen = new Kitchen();
  res.json(await tempKitchen.cancelReceipt(parseInt(req.params.id)));
  tempKitchen.closeConnection();
});

app.get("/receipt/:id/Total", async (req: Request, res: Response) => {
  console.log("GET /receipt/:id/total");
  const tempKitchen = new Kitchen();
  res.json(await tempKitchen.getTotal(parseInt(req.params.id)));
  tempKitchen.closeConnection();
});

app.listen(ServerPORT, () => {
  console.log(`Server is running on port ${ServerPORT}`);
});
