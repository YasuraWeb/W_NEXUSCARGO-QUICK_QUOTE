import { Router } from 'express';
import path from 'path';

import Paths from './common/Paths';
import UserRoutes from './UserRoutes';
import PackageDetailsRoute from './packageDetailsRoute';
import CollectionPointsRoute from './collectionPointRoute';
import PickupCharges  from './pickup-chargesRoute';

/******************************************************************************
                                Variables
******************************************************************************/

const apiRouter = Router();

import multer from 'multer';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

// ** Add UserRouter ** //

// Init router
const userRouter = Router();
const packageDetails = Router();
const collectionPoints = Router();
const pickupCharges = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);


//Package Details
packageDetails.get(Paths.PackageDetails.Get,PackageDetailsRoute.getAll);
packageDetails.post(Paths.PackageDetails.Add,PackageDetailsRoute.add);
packageDetails.put(Paths.PackageDetails.Update,PackageDetailsRoute.update);
packageDetails.delete(Paths.PackageDetails.Delete,PackageDetailsRoute.remove);

//Collection Points
collectionPoints.get(Paths.CollectionPoints.Get,CollectionPointsRoute.getAll);
collectionPoints.post(Paths.CollectionPoints.Add,CollectionPointsRoute.add);
collectionPoints.put(Paths.CollectionPoints.Update,CollectionPointsRoute.update);
collectionPoints.delete(Paths.CollectionPoints.Delete,CollectionPointsRoute.remove);

pickupCharges.post(Paths.PickupCharge.Import, 
  upload.single('myupload'),PickupCharges.add);

// Add Router
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.PackageDetails.Base,packageDetails);
apiRouter.use(Paths.CollectionPoints.Base,collectionPoints);
apiRouter.use(Paths.PickupCharge.Base,pickupCharges);



// ...existing code...

apiRouter.use('/api/pickup-charges', PickupCharges.add);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
