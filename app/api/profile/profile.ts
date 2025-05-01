import type { NextApiResponse } from 'next';
import { withAuth } from '@/lib/withAuth'; // خدمنا وسط /lib
import type { AuthenticatedRequest } from '@/lib/types';

const handler = (req: AuthenticatedRequest, res: NextApiResponse) => {
  res.status(200).json({ user: req.user });
};

export default withAuth(handler);
