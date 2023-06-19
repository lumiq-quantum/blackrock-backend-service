
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppPagerDutyService } from './app.service';

@Controller('/pagerDuty')
export class AppPagerDutyController {
  constructor(private readonly appPagerDutyService: AppPagerDutyService) { }

  @Get()
  getHello(): string {
    return this.appPagerDutyService.getHello();
  }

  @Get('/incidents')
  async getIncidents() {
    return await this.appPagerDutyService.getIncidents();
  }

  @Get('/incidents/:id')
  getIncidentById(@Param() params: any) {
    return this.appPagerDutyService.getIncidentById(params.id);
  }

  @Get('/update-incidents/:id')
  updateIncidentById(@Param() params: any) {
    return this.appPagerDutyService.updateIncidentById(params.id)
    // return this.appService.getIncidentById(params.id);
  }


}

