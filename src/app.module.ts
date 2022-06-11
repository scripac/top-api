import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { getMongoConfig } from '@app/configs/mongo.config'
import { AuthModule } from '@app/auth/auth.module'
import { TopPageModule } from '@app/top-page/top-page.module'
import { ProductModule } from '@app/product/product.module'
import { ReviewModule } from '@app/review/review.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule
	]
})

export class AppModule {}
