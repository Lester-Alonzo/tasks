import { Router } from "express"
import {
  AllData,
  CreateNewTask,
  CreatNewToDo,
  CreateNewDoc,
  TodoDataById,
  DeleteTask,
  DeleteToDo,
  updateDoc,
  updateTask,
  UpdateTodo,
  CreateDates,
  AllDatesPerTasks,
  InitCoins,
  CreateReward,
  DeleteReward,
  GetAllCoins,
  GetAllRewards,
  UpdateReward,
  CreatePin,
  UploadFile
} from "../controllerrs/v1.controllers"

import multer from "multer"
import { join } from "path"

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    // La función destination determina la carpeta de destino según la solicitud.
    // En este ejemplo, utilizamos un query parameter llamado "folder" para elegir la carpeta.
    const uploadPath = join(__dirname, `../../files`)
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, `${crypto.randomUUID()}.${file.mimetype === 'image/png' ? 'png' : "jpg"}`)
  }
})

const upload = multer({ storage })

const router = Router()

router.use((req, res, next) => {
  console.log("Time:", Date.now())
  next()
})

router.get("/", AllData)
router.get("/tdtk/:id", TodoDataById)
router.post("/cntd", CreatNewToDo)
router.post("/cntk/:tid", CreateNewTask)
router.post("/cndc/:tdc", CreateNewDoc)
router.delete("/dtk/:id", DeleteTask)
router.delete("/dtd/:id", DeleteToDo)
router.put("/uptd/:id", UpdateTodo)
router.put("/uptk/:id", updateTask)
router.put("/updc/:id", updateDoc)
router.post("/cndy/:id", CreateDates)
router.get("/alldy/", AllDatesPerTasks)
router.post("/upload", upload.array("file", 500), UploadFile)

router.get("/initcoin", InitCoins)
router.get("/allcoin", GetAllCoins)

router.post("/cnrw", CreateReward)
router.get("/allrw", GetAllRewards)
router.delete("/dtrw/:id", DeleteReward)
router.put("/uprw/:id", UpdateReward)
router.post("/uppin/:id", CreatePin)

export default router
