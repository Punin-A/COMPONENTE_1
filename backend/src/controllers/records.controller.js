import crypto from 'node:crypto';
import { appendRecord, readRecords } from '../repositories/records.repository.js';
import { normalizeRecord, validateRecord } from '../utils/recordValidation.js';

export async function getAllRecords(_request, response, next) {
  try {
    const records = await readRecords();
    response.status(200).json(records);
  } catch (error) {
    next(error);
  }
}

export async function createRecord(request, response, next) {
  try {
    const errors = validateRecord(request.body);
    if (Object.keys(errors).length > 0) {
      return response.status(400).json({ mensaje: 'Los datos enviados no son válidos.', errores: errors });
    }

    const record = {
      id: crypto.randomUUID(),
      ...normalizeRecord(request.body),
      creadoEn: new Date().toISOString(),
    };
    await appendRecord(record);
    return response.status(201).json(record);
  } catch (error) {
    return next(error);
  }
}
