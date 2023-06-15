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
    try {
      let response = await this.httpService.get(this.PAGER_DUTY_API_ENDPOINT, {
        headers: {
          "Authorization": this.PAGER_DUTY_TOKEN
        }
      }).toPromise()
  
      let incidents = response?.data
      return {
        "status": 200,
        "data": incidents
      }
    } catch (error) {
      return {
        "status": 500,
        "data": error
      }
    }
  }

  async getIncidentById(id) {
    try {
      let response = await this.httpService.get(`${this.PAGER_DUTY_API_ENDPOINT}/${id}`, {
        headers: {
          "Authorization": this.PAGER_DUTY_TOKEN
        }
      }).toPromise()

      let incidents = response.data
      return incidents
    } catch (error) {
      return {
        "status": 500,
        "data": error
      }
    }
  }

  async updateIncidentById(id) {
    try{
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
    } catch (error) {
      return {
        "status": 500,
        "data": error
      }
    }
  }
  
}
