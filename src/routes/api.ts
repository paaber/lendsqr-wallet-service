import { Router } from 'express';

import Paths from '@constants/Paths';
import v1Router from './v1';

// **** Variables **** //

const apiRouter = Router();

// Add version routers here
apiRouter.use(Paths.Version1, v1Router);

// **** Export default **** //

export default apiRouter;
