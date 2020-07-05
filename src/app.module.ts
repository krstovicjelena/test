import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { DatabaseConfiguration } from '../config/database.configuration';
import { User } from './entities/user.entity';
import { UserService } from './services/user/user.service';
import { FuelType } from './entities/fuelType.entity';
import { Make } from './entities/make.entity';
import { Model } from './entities/model.entity';
import { Tag } from './entities/tag.entity';
import { Transmission } from './entities/transmission.entity';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleType } from './entities/vehicleType.entity';
import { Advertisement } from './entities/advertisement.entity';
import {UserController} from './controllers/api/user.controller';
import {AdvertisementController} from './controllers/api/advertisement.controller';
import { AdvertisementService } from './services/advertisement/advertisement.service';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [
        User,
        FuelType,
        Make,
        Model,
        Tag,
        Transmission,
        User,
        Vehicle,
        VehicleType,
        Advertisement
  
      ]
    }),
    TypeOrmModule.forFeature([
      User,
      FuelType,
      Make,
      Model,
      Tag,
      Transmission,
      User,
      Vehicle,
      VehicleType,
      Advertisement

    ])
  ],
  controllers: [AppController, UserController,AdvertisementController,AuthController],
  providers: [AppService, UserService, AdvertisementService],
  exports: [
    UserService //moramo ovde da ga dodamo da bi bio dostupan AuthMiddleware dole
  ]
})
export class AppModule implements NestModule { //jedini nacin da koristimo mw je da implementriamo nestmodule interfejs
  configure(consumer:MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/*').forRoutes('api/*'); 
    //primeni ovaj mw na sve rute api/*, ali nemoj na auth/* jer nikad ne bismo dobili token

  }}
