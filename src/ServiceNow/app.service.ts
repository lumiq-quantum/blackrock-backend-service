
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppServiceNowService {

    private SERVICE_NOW_API_ENDPOINT = process.env.SERVICE_NOW_API_ENDPOINT + '/api/now/table/incident'
    private SERVICE_NOW_TOKEN = process.env.SERVICE_NOW_TOKEN
    private SERVICE_NOW_USER_EMAIL = process.env.SERVICE_NOW_USER_EMAIL

    constructor(private readonly httpService: HttpService) {
    }

    async getIncidents() {
        try {
            const response = await this.httpService.get(this.SERVICE_NOW_API_ENDPOINT, {
                auth: {
                    username: process.env.SERVICE_NOW_USERNAME,
                    password: process.env.SERVICE_NOW_PASSWORD

                }
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
                    username: process.env.SERVICE_NOW_USERNAME,
                    password: process.env.SERVICE_NOW_PASSWORD

                }
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
                    username: process.env.SERVICE_NOW_USERNAME,
                    password: process.env.SERVICE_NOW_PASSWORD
                }
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
