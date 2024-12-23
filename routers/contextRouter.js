import { Router } from 'express';
import multer from 'multer';
import { createContext, deletePdf, getAllContexts, getContextById } from '../controllers/contextController.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const contextRouter = Router();

contextRouter.post(
    '/context',
    upload.array('selectedFiles'),
    createContext
);
contextRouter.get(
    '/context',
    getAllContexts
)
contextRouter.get(
    '/context/:contextId',
    getContextById
)
contextRouter.put(
    '/context/delete-pdf',
    deletePdf
)

export default contextRouter;
