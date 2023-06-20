import { Module } from '@nestjs/common';
import { AppPagerDutyController } from './PagerDuty/app.controller';
import { AppPagerDutyService } from './PagerDuty/app.service';
import { AppServiceNowController } from './ServiceNow/app.controller';
import { AppServiceNowService } from './ServiceNow/app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule
  ],
  controllers: [
    AppPagerDutyController, 
    AppServiceNowController,
    AppController
  ],
  providers: [
    AppPagerDutyService, 
    AppServiceNowService,
    AppService
  ],
})
export class AppModule { }
