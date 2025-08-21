// src/routes/categoryRoutes.js
import { Router } from "express";
import CategoryControllers from "../controllers/categoryControllers.js";
import multer from "multer";
import path from "path";

export default function categoryRoutes(prisma) {
  const controllers = CategoryControllers(prisma);
  const router = Router();

  const upload = multer({
    storage: multer.diskStorage({
      destination: "./uploads/",
      filename: (_, file, cb) =>
        cb(null, `${Date.now()}${path.extname(file.originalname)}`),
    }),
    fileFilter: (_, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const allowed = [".png", ".jpg", ".jpeg", ".webp"];
      if (!allowed.includes(ext)) {
        return cb(
          new Error(`Só são permitidas imagens (${allowed.join(", ")})`)
        );
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // opcional: limite 5MB
  });

  router.get("/", controllers.getAll);
  router.get("/:id", controllers.getById);
  router.post("/", upload.single("image"), controllers.create);
  router.patch("/:id", upload.single("image"), controllers.update);
  router.delete("/:id", controllers.remove);

  return router;
}
