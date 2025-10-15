export function getPagination(q: any) {
const page = Math.max(parseInt(q.page) || 1, 1);
const limit = Math.min(Math.max(parseInt(q.limit) || 10, 1), 100);
const skip = (page - 1) * limit;
return { page, limit, skip };
}