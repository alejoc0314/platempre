import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [CommonModule],
  providers: [DecimalPipe],
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent {
  public columnItemCounter: number = 1;
  public result_total: number = 0;
  public arrayResults: number[] = [];

  counterArray() {
    return new Array(this.columnItemCounter);
  }

  plusRows() {
    this.columnItemCounter += 1;
  }

  retireRows() {
    if (this.columnItemCounter > 1) {
      this.columnItemCounter -= 1;
    }
    this.calcTotal();
  }

  calcResult(event: Event) {
    this.calcTotal();

    const targetElement = event.target as HTMLElement;
    const relevantClass = targetElement.classList[0];
    const row = parseFloat(relevantClass.split('_')[1]);

    this.arrayResults[row] = 0;

    const baseValue = parseFloat(
      (document.querySelector('.base_' + row) as HTMLInputElement)?.value
    );
    const heightValue = parseFloat(
      (document.querySelector('.altura_' + row) as HTMLInputElement)?.value
    );
    const depthValue = parseFloat(
      (document.querySelector('.profundidad_' + row) as HTMLInputElement)?.value
    );
    const volumeValue = parseFloat(
      (document.querySelector('.area_' + row) as HTMLInputElement)?.value
    );

    // Verificar si todos los valores son numéricos y diferentes de vacío
    if (
      !isNaN(baseValue) &&
      !isNaN(heightValue) &&
      !isNaN(depthValue) &&
      !isNaN(volumeValue)
    ) {
      // Calcular el resultado sumando los valores
      const resultadoValue = baseValue * heightValue * depthValue - volumeValue;

      this.arrayResults[row] = resultadoValue;

      this.calcTotal();
    } else {
      const cero = 0;

      (document.querySelector('.resultado_' + row) as HTMLInputElement).value =
        cero.toString();
    }
  }

  calcTotal() {
    // Verifica si la longitud del array es mayor que columnItemCounter
    if (this.arrayResults.length > this.columnItemCounter) {
      // Si es mayor, elimina los elementos adicionales del array
      this.arrayResults.splice(this.columnItemCounter);
    }

    console.log(this.arrayResults);

    // Calcula el total sumando todos los elementos del array
    const total = this.arrayResults.reduce((acc, value) => acc + value, 0);

    // Asigna el total a result_total
    this.result_total = total;
  }
}
