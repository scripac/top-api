import { Injectable } from '@nestjs/common'
import { format } from 'date-fns'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import * as sharp from 'sharp'
import { FileElementResponse } from '@app/files/dto/file-element.response'
import { MFile } from '@app/files/mfile.class'

@Injectable()
export class FilesService {

	async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd')
		const uploadFolder = `${path}/uploads/${dateFolder}`
		await ensureDir(uploadFolder)
		const res: FileElementResponse[] = []

		for(const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
			res.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname })
		}
		return res
	}

	convertToWebp(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer()
	}
}
