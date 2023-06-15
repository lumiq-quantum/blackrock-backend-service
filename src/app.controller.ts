import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/incidents')
  async getIncidents() {
    return  await this.appService.getIncidents();
  }

  @Get('/incidents/:id')
  getIncidentById(@Param() params: any) {
    return this.appService.getIncidentById(params.id);
  }
  
  @Get('/update-incidents/:id')
  updateIncidentById(@Param() params: any) {
    return this.appService.updateIncidentById(params.id)
    // return this.appService.getIncidentById(params.id);
  }

  
}
