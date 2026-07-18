import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import Redis from 'ioredis';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  async isHealthy(
    key: string,
    host: string,
    port: number,
  ): Promise<HealthIndicatorResult> {
    let client: Redis | null = null;
    try {
      client = new Redis({
        host,
        port,
        connectTimeout: 3000,
        lazyConnect: true,
      });
      await client.connect();
      const pong = await client.ping();
      if (pong === 'PONG') {
        return this.getStatus(key, true);
      }
      throw new Error('Unexpected PING response');
    } catch (error) {
      throw new HealthCheckError(
        'Redis check failed',
        this.getStatus(key, false, { message: String(error) }),
      );
    } finally {
      if (client) {
        await client.quit().catch(() => {});
      }
    }
  }
}
