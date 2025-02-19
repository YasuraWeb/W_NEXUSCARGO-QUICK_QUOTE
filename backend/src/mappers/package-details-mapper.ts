
import { PackageDetailsRequest } from '../models/request/package-detail-request.model';
import { PackageDetails } from '../models/package-detail.model'



export function mapPackageDetailsRequest(req: PackageDetailsRequest): PackageDetails {
  return {
    box_type: req.box_type,
    max_weight: req.max_weight,
    length: req.length,
    width: req.width,
    height: req.height,
    Rate: req.Rate,
    Price: req.Price,
  };
}

export function mapPackageDetailsResponse(req: PackageDetails[]): PackageDetails[] {
  return req.map(r => ({
    box_type: r.box_type,
    max_weight: r.max_weight,
    length: r.length,
    width: r.width,
    height: r.height,
    Rate: r.Rate,
    Price: r.Price,
  }));
}
  
  