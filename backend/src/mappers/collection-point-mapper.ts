import { CollectionPoint } from '@src/models/collection-point.model';
import { CollectionPointRequest } from '../models/request/collection-point-request.model';
import { CollectionPointResponse } from '../models/response/collection-point-response';

export function mapCollectionPointRequest(req: CollectionPointRequest): CollectionPointRequest {
  return {
    name: req.name,
    Address: req.Address,
    latitude: req.latitude,
    longitude: req.longitude,
    Contact1: req.Contact1,
    Contact2: req.Contact2,
    SurCharge: +req.SurCharge,
    ContactPerson: req.ContactPerson,
  };
}

export function mapCollectionPointResponse(req: CollectionPoint[]): CollectionPointResponse[] {
  return req.map(r => ({
    id: r.id,
    name: r.name,
    address: r.Address,
    latitude: r.latitude,
    longitude: r.longitude,
    Contact1: r.Contact1,
    Contact2: r.Contact2,
    SurCharge: r.SurCharge,
    ContactPerson: r.ContactPerson,
  }));
}