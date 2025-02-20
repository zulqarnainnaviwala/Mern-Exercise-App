import express from "express";
import workoutRoutes from "./routes/workout-routes.js";
import userRoutes from "./routes/user-routes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});
// Define the root path '/'
app.get('/', (req, res) => {
  res.send('Welcome to the Server !!');
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`db is connect & server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//listening requests
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`server is running on ${PORT}`);
// });
