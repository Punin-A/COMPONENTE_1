import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { after, before, test } from 'node:test';

const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'book-reviews-'));
process.env.DATA_FILE = path.join(temporaryDirectory, 'registros.json');

const { createApp } = await import('../src/app.js');
let server;
let apiUrl;

before(async () => {
  server = createApp().listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  apiUrl = `http://127.0.0.1:${server.address().port}/registros`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  await rm(temporaryDirectory, { recursive: true, force: true });
});

test('GET inicia y devuelve una lista vacía', async () => {
  const response = await fetch(apiUrl);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), []);
});

test('POST rechaza datos inválidos con código 400', async () => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ libro: '' }),
  });
  assert.equal(response.status, 400);
  const body = await response.json();
  assert.ok(body.errores.libro);
  assert.ok(body.errores.email);
});

test('POST crea un registro y GET lo consulta', async () => {
  const review = {
    libro: 'El principito',
    nombre: 'Ana Lectora',
    email: 'ANA@EJEMPLO.COM',
    descripcion: 'Una historia breve y llena de significado.',
    fecha: '2026-01-15',
    categoria: 'Clásico',
  };
  const postResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  assert.equal(postResponse.status, 201);
  const created = await postResponse.json();
  assert.ok(created.id);
  assert.equal(created.email, 'ana@ejemplo.com');

  const getResponse = await fetch(apiUrl);
  const records = await getResponse.json();
  assert.equal(records.length, 1);
  assert.equal(records[0].id, created.id);
});

test('el registro persiste en el archivo JSON', async () => {
  const diskRecords = JSON.parse(await readFile(process.env.DATA_FILE, 'utf8'));
  assert.equal(diskRecords.length, 1);

  const recreatedAppServer = createApp().listen(0);
  await new Promise((resolve) => recreatedAppServer.once('listening', resolve));
  const response = await fetch(`http://127.0.0.1:${recreatedAppServer.address().port}/registros`);
  assert.equal((await response.json()).length, 1);
  await new Promise((resolve) => recreatedAppServer.close(resolve));
});
