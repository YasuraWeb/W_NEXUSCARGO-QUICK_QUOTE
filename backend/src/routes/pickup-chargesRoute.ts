import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

import csv from 'csv-parser';
import fs from 'fs';
// import csvToJson from 'csvtojson';
// import * as ExcelJS from 'exceljs';
// import * as fs from 'fs';
import * as path from 'path';
import { IReq, IRes } from './common';


// interface MulterRequest extends Request {
//   file: multer.File;
// }

const prisma = new PrismaClient();
const tempFolderPath = path.join(__dirname, '../', 'temp');

interface PickupCharge {
    suburb: string;
    postcode: string;
    state: string;
    type: string;
    statistic_area: string;
    Rate: number;
}
async function add(req, res) {
    if (!req.file) {
        return res.status(400).send('No file uploaded.')
      }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const stream = fs
    .readvSync(req.file)
    .pipe(csv())
    .on('data', (data) => {
      results.push(data)
    })
    .on('end', () => {
      storedData = results
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error deleting file:', err)
          return res.status(500).send('Error cleaning up uploaded file.')
        }
        res.send(`File uploaded and processed. ${results.length} records stored.`)
      })
    })
    .on('error', (err) => {
      console.error('Error processing file:', err)
      fs.unlink(req.file.path, () => {
        res.status(500).send('Error processing file.')
      })
    })

  // Handle any additional stream errors
  stream.on('error', (err) => {
    console.error('Stream error:', err)
    fs.unlink(req.file.path, () => {
      res.status(500).send('Error reading file stream.')
    })
  })
    res.status(201).json({ message: 'file uploaded successfully'}); 
  //   csvToJson()
  //     .fromFile(req.file)
  //     .then((jsonObj) => {
  //       return resolve(jsonObj);
  //     });
  // req = req as MulterRequest;
  // if (!req.file) {
  //     return res.status(400).json({ error: 'No file uploaded' });
  //   }
    
  //   const results: PickupCharge[] = [];
  //   fs.createReadStream(req.path)
  //     .pipe(csv())
  //     .on('data', (data) => results.push(data))
  //     .on('end', async () => {
  //       try {
  //         for (const charge of results) {
  //           await prisma.pickupCharges.upsert({
  //             where: { suburb: charge.suburb },
  //             update: {
  //               postcode: charge.postcode,
  //               state: charge.state,
  //               type: charge.type,
  //               statistic_area: charge.statistic_area,
  //               Rate: charge.Rate,
  //             },
  //             create: {
  //               suburb: charge.suburb,
  //               postcode: charge.postcode,
  //               state: charge.state,
  //               type: charge.type,
  //               statistic_area: charge.statistic_area,
  //               Rate: charge.Rate,
  //             },
  //           });
  //         }
  //         res.status(200).json({ message: 'CSV data imported successfully' });
  //       } catch (error) {
  //         res.status(500).json({ error: 'Failed to import CSV data' });
  //       } finally {
  //         fs.unlinkSync(req.path); // Remove the uploaded file
  //       }
  //     });
}
export default {
  add,
} as const;