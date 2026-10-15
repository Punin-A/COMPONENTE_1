import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from '../config.js';

let writeQueue = Promise.resolve();

export async function ensureDataFile() {
  await mkdir(path.dirname(config.dataFile), { recursive: true });
  try {
    await readFile(config.dataFile, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await writeFile(config.dataFile, '[]\n', 'utf8');
  }
}

export async function readRecords() {
  await ensureDataFile();
  const contents = await readFile(config.dataFile, 'utf8');
  let records;
  try {
    records = JSON.parse(contents);
  } catch {
    throw Object.assign(new Error('El archivo de datos contiene JSON inválido.'), { status: 500 });
  }
  if (!Array.isArray(records)) {
    throw Object.assign(new Error('El archivo de datos debe contener una lista.'), { status: 500 });
  }
  return records;
}

export function appendRecord(record) {
  const operation = writeQueue.then(async () => {
    const records = await readRecords();
    records.push(record);
    const temporaryFile = `${config.dataFile}.${process.pid}.tmp`;
    await writeFile(temporaryFile, `${JSON.stringify(records, null, 2)}\n`, 'utf8');
    await rename(temporaryFile, config.dataFile);
    return record;
  });
  writeQueue = operation.catch(() => undefined);
  return operation;
}
