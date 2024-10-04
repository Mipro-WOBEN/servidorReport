import { Module } from '@nestjs/common';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [ReportesModule], // Importamos el módulo de reportes
})
export class AppModule {}

