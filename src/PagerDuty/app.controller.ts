
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppPagerDutyService } from './app.service';

@Controller('/pagerduty')
export class AppPagerDutyController {
  constructor(private readonly appPagerDutyService: AppPagerDutyService) { }

  @Get('/incidents')
  async getIncidents() {
    return await this.appPagerDutyService.getIncidents();
  }

  @Get('/incidents-fetch')
  async getIncidentsFetch() {
    return await this.appPagerDutyService.getIncidentsFetch();
  }

  @Get('/incidents-https')
  async getIncidentsHttps() {
    return await this.appPagerDutyService.getIncidentsHttps();
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

