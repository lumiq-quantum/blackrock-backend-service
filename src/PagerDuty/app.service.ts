
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as https from 'https';
import * as fs from 'fs';
import fetch from 'node-fetch';
import {api} from '@pagerduty/pdjs';
import * as request from 'request';
import { firstValueFrom } from 'rxjs';
import * as dns from 'dns';

const axios = require("axios");
const { HttpProxyAgent, HttpsProxyAgent } = require('hpagent')


@Injectable()
export class AppPagerDutyService {
  
  private PAGER_DUTY_API_ENDPOINT = process.env.PAGER_DUTY_API_ENDPOINT + '/incidents'
  private PAGER_DUTY_TOKEN = process.env.PAGER_DUTY_TOKEN
  private PAGER_DUTY_USER_EMAIL = process.env.PAGER_DUTY_USER_EMAIL
  private NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED
  
  private PROXY_HOST = process.env.PROXY_HOST
  private PROXY_PORT = process.env.PROXY_PORT
  private PROXY_PROTOCOL = process.env.PROXY_PROTOCOL
  
  httpsAgent:any;
  pd;
  
  constructor(private readonly httpService: HttpService) {
    this.httpsAgent = new https.Agent({  
      rejectUnauthorized: false
    })

    console.log(this.NODE_TLS_REJECT_UNAUTHORIZED, "NODE_TLS_REJECT_UNAUTHORIZED")

    try {
      let token = this.PAGER_DUTY_TOKEN.split("=")[1]
      this.pd = api({token});
    } catch (error) {
      console.log("ERROR CREATING PD INSTANCE", error)
    }
    dns.setDefaultResultOrder('ipv4first');
  }

  async getIncidents() {
    try {
      dns.setDefaultResultOrder('ipv4first');
      console.log(this.PAGER_DUTY_API_ENDPOINT, "CHECKING THIS")
      const response = await firstValueFrom( 
        this.httpService.get(this.PAGER_DUTY_API_ENDPOINT, {
          headers: {
            "Authorization": this.PAGER_DUTY_TOKEN,
            "Accept": "application/vnd.pagerduty+json;version=2"
          },
          proxy: {
            host: this.PROXY_HOST,
            port: parseInt(this.PROXY_PORT),
            protocol: this.PROXY_PROTOCOL
          },
          httpsAgent: this.httpsAgent
        })
      )

      const incidents = response?.data
      return {
        "status": 200,
        "data": incidents
      }
    } catch (error) {
      // console.log(error)
      return {
        "status": 500,
        "data": error
      }
    }
  }

  async getIncidentsAxiosProxy() {
    try {
      
      let proxyURI = `${this.PROXY_PROTOCOL}://${this.PROXY_HOST}:${this.PROXY_PORT}`;

      console.log(proxyURI)
      const httpAgent = new HttpProxyAgent({
        proxy: proxyURI
      })
      const httpsAgent = new HttpsProxyAgent({
        proxy: proxyURI
      })

      const myaxios = axios.create({ httpAgent, httpsAgent });
      // let myaxios = axios.create({httpsAgent});
      

      const response = await myaxios.get(this.PAGER_DUTY_API_ENDPOINT, {
        headers: {
          "Authorization": this.PAGER_DUTY_TOKEN,
          "Accept": "application/vnd.pagerduty+json;version=2"
        }
      });

      const incidents = response?.data
      return {
        "status": 200,
        "data": incidents
      }
    } catch (error) {
      console.log(error)
      return {
        "status": 500,
        "data": error
      }
    }
  }

  async getIncidentsFetch() {
    try {
      dns.setDefaultResultOrder('ipv4first');
      const response = await fetch(this.PAGER_DUTY_API_ENDPOINT, {
        agent: this.httpsAgent,
        headers: {
          'Authorization': this.PAGER_DUTY_TOKEN,
          "Accept": "application/vnd.pagerduty+json;version=2"
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
    dns.setDefaultResultOrder('ipv4first');
    let options = {
      host: 'api.pagerduty.com',
      port: 443,
      path: '/incidents',
      method: 'GET',
      agent: this.httpsAgent,
      headers: {
        "Authorization": this.PAGER_DUTY_TOKEN,
        "Accept": "application/vnd.pagerduty+json;version=2"
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
      dns.setDefaultResultOrder('ipv4first');
      let data = await this.pd.get('/incidents')
      console.log(data)
      return data.data
    } catch (error) {
      console.log(error)
      return {
        "status": 500,
        "data": error
      }
    }

  }

  async getIncidentById(id) {
    try {
      dns.setDefaultResultOrder('ipv4first');
      const response = await this.httpService.get(`${this.PAGER_DUTY_API_ENDPOINT}/${id}`, {
        headers: {
          "Authorization": this.PAGER_DUTY_TOKEN,
          "Accept": "application/vnd.pagerduty+json;version=2"
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
      dns.setDefaultResultOrder('ipv4first');
      const response = await this.httpService.put(`${this.PAGER_DUTY_API_ENDPOINT}/${id}`, {
        "incident": {
          "type": "incident",
          "title": "Updated By Pryzm - Empower"
        }
      }, {
        headers: {
          "Authorization": this.PAGER_DUTY_TOKEN,
          "from": this.PAGER_DUTY_USER_EMAIL,
          "Accept": "application/vnd.pagerduty+json;version=2"
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

  async getIncidentRequest() {
    try {
      dns.setDefaultResultOrder('ipv4first');
      const options = {
        method: 'GET',
        url: 'https://api.pagerduty.com/incidents',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.pagerduty+json;version=2',
          Authorization: this.PAGER_DUTY_TOKEN
        },
        proxy: 'http://192.168.1.60:8080'
      };
      
      let data = await this.requestPackage(options)
      return data
    } catch (error) {
      return {
        "status": "500",
        "error": error
      }
    }
    
  }

  async requestPackage(options) {
    return new Promise((resolve,reject)=>{
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        resolve(body)
      });
    })
  }

}

