
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as https from 'https';
import * as fs from 'fs';
import fetch from 'node-fetch';
import {api} from '@pagerduty/pdjs';



@Injectable()
export class AppPagerDutyService {
  
  private PAGER_DUTY_API_ENDPOINT = process.env.PAGER_DUTY_API_ENDPOINT + '/incidents'
  private PAGER_DUTY_TOKEN = process.env.PAGER_DUTY_TOKEN
  private PAGER_DUTY_USER_EMAIL = process.env.PAGER_DUTY_USER_EMAIL
  httpsAgent:any;
  pd;
  
  constructor(private readonly httpService: HttpService) {
    let caCert
    try {
      caCert = fs.readFileSync('/config/ca.cert')
      console.log(caCert)
    } catch (error) {
      console.log("NO CA CERT", error)
    }
    this.httpsAgent = new https.Agent({  
      rejectUnauthorized: false
      // ca: caCert
    })

    try {
      let token = this.PAGER_DUTY_TOKEN.split("=")[1]
      this.pd = api({token});
    } catch (error) {
      console.log("ERROR CREATING PD INSTANCE", error)
    }
  }

  async getIncidents() {
    try {
      const response = await this.httpService.get(this.PAGER_DUTY_API_ENDPOINT, {
        headers: {
          "Authorization": this.PAGER_DUTY_TOKEN
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

  async getIncidentsFetch() {
    try {

      const response = await fetch(this.PAGER_DUTY_API_ENDPOINT, {
        agent: this.httpsAgent,
        headers: {
          'Authorization': this.PAGER_DUTY_TOKEN
        }
      });
      const data = await response.json();
      return data
    } catch (error) {
      return {
        "status": 500,
        "data": error
      }
    }
  }

  async getIncidentsHttps() {
    let options = {
      host: 'api.pagerduty.com',
      port: 443,
      path: '/incidents',
      method: 'GET',
      agent: this.httpsAgent,
      headers: {
        'Authorization': this.PAGER_DUTY_TOKEN
      }
    }

    let re = await https.get(options, (res)=>{

      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
      // console.log(res);
    })
    // console.log(re)
    return {
      "hello": "world"
    }
  }

  async getIncidentsPD() {
    try {
      let data = await this.pd.get('/incidents')
      return data.data
    } catch (error) {
      console.log(error)      
    }

  }

  async getIncidentById(id) {
    try {
      const response = await this.httpService.get(`${this.PAGER_DUTY_API_ENDPOINT}/${id}`, {
        headers: {
          "Authorization": this.PAGER_DUTY_TOKEN
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
      const response = await this.httpService.put(`${this.PAGER_DUTY_API_ENDPOINT}/${id}`, {
        "incident": {
          "type": "incident",
          "title": "Updated By Pryzm - Empower"
        }
      }, {
        headers: {
          "Authorization": this.PAGER_DUTY_TOKEN,
          "from": this.PAGER_DUTY_USER_EMAIL
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

