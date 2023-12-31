import cookieParser from 'cookie-parser';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
// import hpp from "hpp";
import morgan from "morgan";
import rateLimit from "express-rate-limit";


// import { unless } from "./middleware/unless";

// Setup .env variables for app usage
dotenv.config();

// Import routes from the ./routes
import user from "./routes/user-route";

import connectToDB from "./configs/mongoDBConnect";
import productRouter from "./routes/productRoutes";

import { catchErrors, notFound } from "./middleware/errorNOTfound";
import routerBannersImage from "./routes/bannersImage-route";
import uploadRouter from "./routes/upLoad";
import { insertBanners } from './models/bannersModel';
import { connectToPostgres } from './configs/pgConnect';

// Setup constant variables
const PORT = process.env.PORT || 5000;
const RATE_TIME_LIMIT = Number(process.env.RATE_TIME_LIMIT) || 15;
const RATE_REQUEST_LIMIT = Number(process.env.RATE_REQUEST_LIMIT) || 100;

// Init express app
export const app = express();

app.use(express.static('public'))
// Body parser
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));


// Detailed server logging
app.use(morgan("dev"));

// Limit rate of requests
// Alternatively, you can pass through specific routes for different limits based on route
// app.use(
//   rateLimit({
//     windowMs: RATE_TIME_LIMIT * 60 * 1000,
//     max: RATE_REQUEST_LIMIT,
//   }),
// );
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');
  next();
});
// Enable CORS
app.use(cors());

// Security Headers
app.use(helmet());

// Secure against param pollutions
// app.use(hpp());

// app.use(unless(["/users/login"], verify));


app.use("/users", user);
app.use("/bannersImage", routerBannersImage);
app.use("/upload", uploadRouter);


app.use("/ext/bannersProduct", productRouter)



app.use(notFound);

app.use(catchErrors);


// Listen to specified port in .env or default 5000


connectToPostgres().then((res) => {
    connectToDB()
    app.listen(PORT, () => {
      console.log(`Server is listening on: ${PORT}`);
    });
  }
).catch((err) => console.error(err))

