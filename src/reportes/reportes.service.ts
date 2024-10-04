import { Injectable } from '@nestjs/common';
import { GenerarReporteDto } from './dto/generar-reporte.dto';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class ReportesService {
  async generarPdf(generarReporteDto: GenerarReporteDto): Promise<Buffer> {
    const documentDefinition : any = {
      content: [
        { text: 'REPORTE DE CONTROL DE ACTUALIZACIONES - RESUMEN', style: 'header' },
        { text: 'CARTERA DE PROCEDIMIENTOS DE SALUD (CPT)', style: 'subheader' },
        {
          columns: [
            { text: `Fecha: ${generarReporteDto.fecha}`, alignment: 'left' },
            { text: `Hora: ${generarReporteDto.hora}`, alignment: 'right' },
            { text: `Página: ${generarReporteDto.pagina}`, alignment: 'right' },
          ],
        },
        { text: 'REGISTROS CREADOS', style: 'sectionHeader', margin: [0, 20, 0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Grupo', 'Sección', 'Sub Sección', 'Nivel', 'Cant. Registros'],
              ...generarReporteDto.registros.map(registro => [
                registro.grupo,
                registro.seccion,
                registro.subSeccion,
                registro.nivel,
                registro.cantRegistros,
              ]),
            ],
          },
        },
      ],
      footer: {
        columns: [
          { text: `Usuario: ${generarReporteDto.usuario}`, alignment: 'left' },
          { text: 'RptCtrlCarProcR', alignment: 'right' },
        ],
        margin: [40, 0],
      },
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 20, 0, 20] },
        subheader: { fontSize: 14, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },
        sectionHeader: { fontSize: 14, bold: true },
        text: { fontSize: 12 },
      },
    };

    return new Promise((resolve, reject) => {
      pdfMake.createPdf(documentDefinition).getBuffer((buffer: Buffer | PromiseLike<Buffer>) => {
        resolve(buffer);
      });
    });
  }
}
