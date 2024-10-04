import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportesService } from './reportes.service';
import { GenerarReporteDto } from './dto/generar-reporte.dto';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post('generar-pdf')
  async generarReportePdf(@Body() generarReporteDto: GenerarReporteDto, @Res() res: Response) {
    const pdfBuffer = await this.reportesService.generarPdf(generarReporteDto);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=reporte.pdf',
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  }
}

