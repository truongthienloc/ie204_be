import slugify from 'slugify';

export class configSlug {
	constructor() {}
	static convertToSlug(title: string): string {
		// replace from 'Đ' to 'D' and 'đ' to 'd'
		slugify.extend({ Đ: 'D', đ: 'd' });
		return slugify(title, { lower: true });
	}
}
