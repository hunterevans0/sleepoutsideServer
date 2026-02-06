import { Router } from "express";
import productRoutes from "./product.routes.mts";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger/swagger.json' with { type: 'json' };

const router:Router = Router();

// The home page route
router.get("/", (req, res) => {
  res.json({ title: "API V1" });
});

// load products routes
router.use("/products", productRoutes);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default router;
