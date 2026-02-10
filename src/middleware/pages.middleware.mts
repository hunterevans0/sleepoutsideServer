import { sanitize } from '../js/utils.mts';

export const sanitizeQueryMiddleware = (req:any, res:any, next:any) => {
const cleanQuery = sanitize(req.query);
}