import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller('sum')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add1')
  async add1(@Body('numbers') numbers: number[]): Promise<number> {
    try {
      const response = await axios.post('http://localhost:3001/math/sum', {
        numbers,
      });
      return response.data;
    } catch (error) {
      console.error('Error called the Microservie:', error);
    }
  }
}
