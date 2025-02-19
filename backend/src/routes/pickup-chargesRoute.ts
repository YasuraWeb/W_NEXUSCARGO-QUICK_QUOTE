import csv from 'csv-parser';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import stream from 'stream';

const prisma = new PrismaClient();

async function add(req: Request, res: Response) {
  const results: any[] = [];

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const bufferStream = new stream.PassThrough();
  bufferStream.end(req.file.buffer);

  bufferStream
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      // Process the results array here
      try {
        // Insert the results into the Prisma database in bulk
        await prisma.PickupCharges.createMany({
          data: results.map(record => ({
            suburb: record.suburb,
            postcode: record.postcode,
            state: record.state,
            type: record.type,
            statistic_area: record.statistic_area,
            Rate: record.Rate ?+record.Rate : 0,
            // Map the CSV fields to the Prisma model fields
            // Add other fields as necessary
          })),
        });
        res.status(200).json({ message: 'CSV data imported and inserted into database successfully', data: results });
      } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error inserting data into database' });
      }
    })
    .on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).send('Error reading file stream.');
    });
}

export default {
  add,
};
