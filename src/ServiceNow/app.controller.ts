
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppServiceNowService } from './app.service';

@Controller('/servicenow')
export class AppServiceNowController {
    constructor(private readonly appServiceNowService: AppServiceNowService) { }

    @Get('/incidents')
    async getIncidents() {
        return await this.appServiceNowService.getIncidents();
    }

    @Get('/incidents/:id')
    getIncidentById(@Param() params: any) {
        return this.appServiceNowService.getIncidentById(params.id);
    }

    @Get('/update-incidents/:id')
    updateIncidentById(@Param() params: any) {
        return this.appServiceNowService.updateIncidentById(params.id)
        // return this.appService.getIncidentById(params.id);
    }

}