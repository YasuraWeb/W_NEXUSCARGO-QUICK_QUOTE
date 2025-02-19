import { PrismaClient } from '@prisma/client';
import { mapPackageDetailsRequest, mapPackageDetailsResponse } from '../mappers/package-details-mapper';
import { PackageDetailsRequest } from '../models/request/package-detail-request.model';
import { IReq, IRes } from './common';


const prisma = new PrismaClient();

async function add(req:IReq, res:IRes) {
  const packageDetails = mapPackageDetailsRequest(req.body as PackageDetailsRequest);
  try {
	  const packageDetail = await prisma.packageDetails.create({
      data: {
		  box_type: packageDetails.box_type,
		  max_weight: packageDetails.max_weight,
		  width: packageDetails.width,
		  length: packageDetails.length,
		  height: packageDetails.height,
		  Rate: packageDetails.Rate,
		  Price: packageDetails.Price,
      },
	  });
	  res.status(201).json(packageDetail);
  } catch (error) {
	  res.status(500).json({ error: 'Failed to create package detail' });
  }
} 
async function getAll(req:IReq, res:IRes) {
  //    const packageDetails = mapPackageDetailsRequest(req.body as PackageDetailsRequest);
  try {
		    const packageDetails = await prisma.packageDetails.findMany();
		    res.status(200).json(mapPackageDetailsResponse(packageDetails));
		  } catch (error) {
		    res.status(500).json({ error: 'Failed to fetch package details' });
		  }
}
async function update(req: IReq, res: IRes) {
  const { id } = req.params;
  const packageDetails = mapPackageDetailsRequest(req.body as PackageDetailsRequest);
  try {
    const packageDetail = await prisma.packageDetails.update({
      where: { id: Number(id) },
      data: {
        box_type: packageDetails.box_type,
        max_weight: packageDetails.max_weight,
        width: packageDetails.width,
        length: packageDetails.length,
        height: packageDetails.height,
        Rate: packageDetails.Rate,
        Price: packageDetails.Price,
      },
    });
    res.status(200).json(packageDetail);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update package detail' });
  }
}

async function remove(req: IReq, res: IRes) {
  const { id } = req.params;
  try {
    await prisma.packageDetails.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete package detail' });
  }
}


export default {
  getAll,
  add,
  update,
  remove
} as const