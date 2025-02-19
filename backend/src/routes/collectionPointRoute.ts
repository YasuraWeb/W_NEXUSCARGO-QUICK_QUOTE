import { PrismaClient } from '@prisma/client';
import { CollectionPointRequest } from '../models/request/collection-point-request.model';
import { IReq, IRes } from './common';
import { mapCollectionPointRequest, mapCollectionPointResponse } from '@src/mappers/collection-point-mapper';

const prisma = new PrismaClient();

async function add(req: IReq, res: IRes) {
  const collectionPoint = mapCollectionPointRequest(req.body as CollectionPointRequest);
  try {
    const newCollectionPoint = await prisma.collectionPoints.create({
      data: {
        name: collectionPoint.name,
        Address: collectionPoint.Address,
        ContactPerson: collectionPoint.ContactPerson,
        Contact1: collectionPoint.Contact1,
        Contact2: collectionPoint.Contact2,
        SurCharge: collectionPoint.SurCharge,
        latitude: collectionPoint.latitude,
        longitude: collectionPoint.longitude,
      },
    });
    res.status(201).json(newCollectionPoint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create collection point' });
  }
}

async function getAll(req: IReq, res: IRes) {
  try {
    const collectionPoints = await prisma.collectionPoints.findMany();
    res.status(200).json(mapCollectionPointResponse(collectionPoints));
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch collection points' });
  }
}

async function update(req: IReq, res: IRes) {
  const { id } = req.params;
  const collectionPoint = mapCollectionPointRequest(req.body as CollectionPointRequest);
  try {
    const updatedCollectionPoint = await prisma.collectionPoints.update({
      where: { id: Number(id) },
      data:{
        name: collectionPoint.name,
        Address: collectionPoint.address,
        latitude: collectionPoint.latitude,
        Contact1: collectionPoint.Contact1,
        Contact2: collectionPoint.Contact2,
        SurCharge: collectionPoint.SurCharge,
      },
    });
    res.status(200).json(updatedCollectionPoint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update collection point' });
  }
}

async function remove(req: IReq, res: IRes) {
  const { id } = req.params;
  try {
    await prisma.collectionPoints.delete({
      where: { id: Number(id) },
    });

    await prisma.collectionPoints.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();

  } catch (error) {
    res.status(500).json({ error: 'Failed to delete collection point' });
  }
}

export default {
  getAll,
  add,
  update,
  remove,
} as const;