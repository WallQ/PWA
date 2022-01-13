export const sort = [
	{ type: 'Newest', value: { field: 'createdDate', order: -1 } },
	{ type: 'Best Rating', value: { field: 'rating', order: -1 } },
	{ type: 'Name: A to Z', value: { field: 'name', order: 1 } },
	{ type: 'Name: Z to A', value: { field: 'name', order: -1 } },
	{ type: 'Price: Low to High', value: { field: 'averagePrice', order: 1 } },
	{ type: 'Price: High to Low', value: { field: 'averagePrice', order: -1 } },
];
