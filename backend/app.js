import express from 'express';
import path from 'path'; // Added for path resolution
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import errorHandleMiddleware  from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
const app=express();

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)

// --- SERVE FRONTEND STATIC PRODUCTION FILES ---
const __dirname = path.resolve();

// Serve the assets folder from your frontend build directory
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Redirect any non-API get requests to React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});
// ----------------------------------------------

app.use(errorHandleMiddleware)
dotenv.config({path:'backend/config/config.env'})
export default app;
