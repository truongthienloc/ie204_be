import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdatePostDto {
	@ApiProperty({ example: 'Post title' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(70)
	title: string;

	@ApiProperty({ example: 'Post header' })
	@IsNotEmpty()
	@IsString()
	header: string;

	@ApiProperty({ example: 'Post description' })
	@IsNotEmpty()
	@IsString()
	@MaxLength(160)
	description: string;

	@ApiProperty({
		example: ['keyword1', 'keyword2', 'keyword3'],
	})
	@IsNotEmpty()
	@IsString({ each: true })
	keywords: string[];

	@ApiProperty({ example: 'Post content' })
	@IsNotEmpty()
	@IsString()
	content: string;

	@ApiProperty({
		example: [
			{
				url: 'image url',
				publicId: 'image publicId',
			},
		],
	})
	blogImages: [
		{
			url: string;
			publicId: string;
		},
	];

	@ApiProperty({ example: 'Post thumbnail image' })
	@IsNotEmpty()
	@IsString()
	thumbnailImage: string;
}
