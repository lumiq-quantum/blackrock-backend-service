import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  private PAGER_DUTY_API_ENDPOINT = process.env.PAGER_DUTY_API_ENDPOINT
  private PAGER_DUTY_TOKEN = process.env.PAGER_DUTY_TOKEN
  private PAGER_DUTY_USER_EMAIL = process.env.PAGER_DUTY_USER_EMAIL

  constructor(private readonly httpService: HttpService) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getIncidents() {
    let response = await this.httpService.get(this.PAGER_DUTY_API_ENDPOINT, {
      headers: {
        "Authorization": this.PAGER_DUTY_TOKEN
      }
    }).toPromise()

    let incidents = response.data
    return incidents
  }

  async getIncidentById(id) {
    let response = await this.httpService.get(`${this.PAGER_DUTY_API_ENDPOINT}/${id}`, {
      headers: {
        "Authorization": this.PAGER_DUTY_TOKEN
      }
    }).toPromise()

    let incidents = response.data
    return incidents
  }

  async updateIncidentById(id) {
    let response = await this.httpService.put(`${this.PAGER_DUTY_API_ENDPOINT}/${id}`, {
        "incident": {
            "type": "incident",
            "title": "Updated By Pryzm - Empower"
        }
    }, {
      headers: {
        "Authorization": this.PAGER_DUTY_TOKEN,
        "from": this.PAGER_DUTY_USER_EMAIL
      }
    }).toPromise()

    let incidents = response.data
    return incidents
  }
  
}
