
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as https from 'https';

@Injectable()
export class AppServiceNowService {

    private SERVICE_NOW_API_ENDPOINT = process.env.SERVICE_NOW_API_ENDPOINT + '/api/now/table/incident'
    private SERVICE_NOW_USERNAME = process.env.SERVICE_NOW_USERNAME
    private SERVICE_NOW_PASSWORD = process.env.SERVICE_NOW_PASSWORD
    httpsAgent:any;

    constructor(private readonly httpService: HttpService) {
        this.httpsAgent = new https.Agent({  
            rejectUnauthorized: false
        })
    }

    async getIncidents() {
        try {
            const response = await this.httpService.get(this.SERVICE_NOW_API_ENDPOINT, {
                auth: {
                    username: this.SERVICE_NOW_USERNAME,
                    password: this.SERVICE_NOW_PASSWORD
                },
                httpsAgent: this.httpsAgent
            }).toPromise()

            const incidents = response?.data
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
            const response = await this.httpService.get(`${this.SERVICE_NOW_API_ENDPOINT}/${id}?sysparm_display_value=true`, {
                auth: {
                    username: this.SERVICE_NOW_USERNAME,
                    password: this.SERVICE_NOW_PASSWORD
                },
                httpsAgent: this.httpsAgent
            }).toPromise()

            const incidents = response.data
            return incidents
        } catch (error) {
            return {
                "status": 500,
                "data": error
            }
        }
    }

    async updateIncidentById(id) {
        try {
            const response = await this.httpService.put(`${this.SERVICE_NOW_API_ENDPOINT}/${id}?sysparm_display_value=true`, {
                "comments": "Updated By Pryzm - Empower"
            }, {
                auth: {
                    username: this.SERVICE_NOW_USERNAME,
                    password: this.SERVICE_NOW_PASSWORD
                },
                httpsAgent: this.httpsAgent
            }).toPromise()

            const incidents = response.data
            return incidents
        } catch (error) {
            return {
                "status": 500,
                "data": error
            }
        }
    }

}
