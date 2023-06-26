import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { exec } from 'child_process';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private PAGER_DUTY_API_ENDPOINT = process.env.PAGER_DUTY_API_ENDPOINT + '/incidents'
  private PAGER_DUTY_TOKEN = process.env.PAGER_DUTY_TOKEN
  private PAGER_DUTY_USER_EMAIL = process.env.PAGER_DUTY_USER_EMAIL

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/curl')
  async makeCurl() {
    return new Promise((resolve, reject) => {
      const curlCommand = `curl -H "Authorization: ${this.PAGER_DUTY_TOKEN}" ${this.PAGER_DUTY_API_ENDPOINT} -k`;
      console.log(curlCommand)

      exec(curlCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`cURL request error: ${error}`);
          // reject(error);
        }

        if (stderr) {
          console.error(`cURL request stderr: ${stderr}`);
          // reject(stderr);
        }

        // Process the cURL response
        const response = JSON.parse(stdout);
        resolve(response);
      });
    });
  }
  
}
