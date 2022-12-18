import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { Module } from '@nestjs/common';
import { PrismaService } from './infra/database/prisma/prisma.service';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
