import { Module } from '@nestjs/common';
import { AppPagerDutyController } from './PagerDuty/app.controller';
import { AppPagerDutyService } from './PagerDuty/app.service';
import { AppServiceNowController } from './ServiceNow/app.controller';
import { AppServiceNowService } from './ServiceNow/app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule
  ],
  controllers: [AppPagerDutyController, AppServiceNowController],
  providers: [AppPagerDutyService, AppServiceNowService],
})
export class AppModule { }
