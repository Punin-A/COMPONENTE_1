import { Router } from 'express';
import { createRecord, getAllRecords } from '../controllers/records.controller.js';

const router = Router();

router.get('/', getAllRecords);
router.post('/', createRecord);

export default router;
