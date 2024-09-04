import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sum1(numbers: number[]): Promise<number> {
    try {
      const response = await axios.post('http://localhost:3001/math/sum', {
        numbers,
      });
      return response.data;
    } catch (error) {
      console.error('Error called the Microservie:', error);
    }
  }
  sum2(numbers: number[]): Observable<number> {
    const pattern = { cmd: 'sum' };
    return this.client.send<number>(pattern, numbers);
  }
}
