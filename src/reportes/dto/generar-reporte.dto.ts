import { IsString, IsArray, IsNumber } from 'class-validator';

export class GenerarReporteDto {
  @IsString()
  fecha: string;

  @IsString()
  hora: string;

  @IsString()
  pagina: string;

  @IsString()
  usuario: string;

  @IsArray()
  registros: Array<{
    grupo: string;
    seccion: string;
    subSeccion: string;
    nivel: string;
    cantRegistros: number;
  }>;
}
