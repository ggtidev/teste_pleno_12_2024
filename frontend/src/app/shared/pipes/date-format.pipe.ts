import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: string, format: string = 'dd/MM/yyyy'): string {
    // Converte a string de data para evitar o problema de fuso horário
    const dateParts = value.split('-'); // Supondo formato ISO (yyyy-MM-dd)
    const date = new Date(
      Number(dateParts[0]), // Ano
      Number(dateParts[1]) - 1, // Mês (ajuste necessário pois os meses no JS são baseados em zero)
      Number(dateParts[2]) // Dia
    );

    return new Intl.DateTimeFormat('pt-BR').format(date);
  }
}
