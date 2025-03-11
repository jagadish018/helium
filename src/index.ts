import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

const reminders: string[] = [];

app.get("/generate", (context) => {
  return context.json({ randomNumber: Math.random()*100 });
});

app.get("/current-time", (c) => {
  const date = new Date();
  return c.json({ currentTime : date.toISOString() });
})

app.get("/h", (c) => {
  const nodeVersion = process.version;
  const platform = process.platform;
  return c.json({
    nodeVersion: nodeVersion,
    platform: platform,
  });

});  


app.get("/puppet", (c) => {

  const qp = c.req.query(); 
  return c.json(qp,200);
});

app.post("/reminders", async (c) => {
  const body = await c.req.json();
  const reminder = body.reminder;
  reminders.push(reminder);
  return c.json(reminders, 201);
});


const numbers: number[] = [];


app.post("/numbers", async (c) => {
  const randomNumber = await c.req.json();
  const number = randomNumber.number;
  numbers.push(number);
  return c.json({lastStorednumber: number}, 201);
});

app.get("/numbers", (c) => {
  
  return c.json({numbers},200);
});







serve(app);
console.log("Server is running on port http://localhost:3000/health");
