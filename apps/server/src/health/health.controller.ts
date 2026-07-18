import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthCheckResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
import { RedisHealthIndicator } from './redis-health.indicator.js';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private typeOrm: TypeOrmHealthIndicator,
    private redis: RedisHealthIndicator,
    private config: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    const dbName = this.config.get<string>('database.name', 'enactus_hub');
    const redisHost = this.config.get<string>('redis.host', 'localhost');
    const redisPort = this.config.get<number>('redis.port', 6379);

    return this.health.check([
      () => this.typeOrm.pingCheck('postgres', { connection: dbName }),
      () => this.redis.isHealthy('redis', redisHost, redisPort),
    ]);
  }
}
