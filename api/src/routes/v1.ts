import {Router} from 'express'
import {AllData, CreateNewTask, CreatNewToDo, CreateNewDoc, TodoDataById, DeleteTask, DeleteToDo, updateDoc, updateTask, UpdateTodo} from '../controllerrs/v1.controllers'

const router = Router()

router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

router.get('/', AllData)
router.get('/tdtk/:id', TodoDataById)
router.post('/cntd', CreatNewToDo)
router.post('/cntk/:tid', CreateNewTask)
router.post('/cndc/:tdc', CreateNewDoc)
router.delete('/dtk/:id', DeleteTask)
router.delete('/dtd/:id', DeleteToDo)
router.put('/uptd/:id', UpdateTodo)
router.put('/uptk/:id', updateTask)
router.put('/updc/:id', updateDoc)

export default router