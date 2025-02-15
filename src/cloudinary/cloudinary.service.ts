import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CloudinaryResponse } from './cloudinary-response';
import * as path from 'path';

@Injectable()
export class CloudinaryService {
	constructor() {}

	uploadAvatar(file: Express.Multer.File): Promise<CloudinaryResponse> {
		return new Promise<CloudinaryResponse>((resolve, reject) => {
			const ext = path.extname(file.originalname).toLowerCase();
			if (
				ext !== '.jpg' &&
				ext !== '.jpeg' &&
				ext !== '.png' &&
				ext !== '.gif' &&
				ext !== '.webp' &&
				ext !== '.svg'
			) {
				reject(new Error('Invalid file type'));
				return;
			}
			const upload = v2.uploader.upload_stream(
				{ folder: 'bepUIT-avatar' },
				(error, result) => {
					if (error) {
						reject(error);
					}
					resolve(result);
				},
			);
			streamifier.createReadStream(file.buffer).pipe(upload);
		});
	}

	deleteFile(public_id: string): Promise<CloudinaryResponse> {
		return new Promise<CloudinaryResponse>((resolve, reject) => {
			v2.uploader.destroy(public_id, (error, result) => {
				if (error) {
					reject(error);
				}
				resolve(result);
			});
		});
	}

	// upload multiple images
	uploadDishImages(
		files: Express.Multer.File[],
	): Promise<CloudinaryResponse[]> {
		return new Promise<CloudinaryResponse[]>((resolve, reject) => {
			const responses: CloudinaryResponse[] = [];
			files.forEach((file) => {
				const ext = path.extname(file.originalname).toLowerCase();
				if (
					ext !== '.jpg' &&
					ext !== '.jpeg' &&
					ext !== '.png' &&
					ext !== '.gif' &&
					ext !== '.webp' &&
					ext !== '.svg'
				) {
					reject(new Error('Invalid file type'));
					return;
				}

				const upload = v2.uploader.upload_stream(
					{ folder: 'bepUIT-dishImages' },
					(error, result) => {
						if (error) {
							reject(error);
						}
						responses.push(result);
						if (responses.length === files.length) {
							resolve(responses);
						}
					},
				);
				streamifier.createReadStream(file.buffer).pipe(upload);
			});
		});
	}

	uploadBlogImages(
		files: Express.Multer.File[],
	): Promise<CloudinaryResponse[]> {
		return new Promise<CloudinaryResponse[]>((resolve, reject) => {
			const responses: CloudinaryResponse[] = [];
			files.forEach((file) => {
				const upload = v2.uploader.upload_stream(
					{ folder: 'bepUIT-blogImages' },
					(error, result) => {
						if (error) {
							reject(error);
						}
						responses.push(result);
						if (responses.length === files.length) {
							resolve(responses);
						}
					},
				);
				streamifier.createReadStream(file.buffer).pipe(upload);
			});
		});
	}
}
