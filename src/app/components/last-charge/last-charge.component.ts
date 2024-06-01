import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [CommonModule],
  providers: [DecimalPipe],
  templateUrl: './last-charge.component.html',
  styleUrl: './last-charge.component.scss',
})
export class LastChargeComponent {
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

    const resistenciaConcreto = parseFloat(
      (
        document.querySelector(
          '.resistenciaConcreto_' + row
        ) as HTMLInputElement
      )?.value
    );
    const areaConcreto = parseFloat(
      (document.querySelector('.areaConcreto_' + row) as HTMLInputElement)
        ?.value
    );
    const areaAcero = parseFloat(
      (document.querySelector('.areaAcero_' + row) as HTMLInputElement)?.value
    );
    const resistenciaAcero = parseFloat(
      (document.querySelector('.resistenciaAcero_' + row) as HTMLInputElement)
        ?.value
    );

    // Verificar si todos los valores son numéricos y diferentes de vacío
    if (
      !isNaN(resistenciaConcreto) &&
      !isNaN(areaConcreto) &&
      !isNaN(areaAcero) &&
      !isNaN(resistenciaAcero)
    ) {
      // Calcular el resultado sumando los valores

      // Pu= 0,75 x 0,85 ( 0,85 x D'Clario x (Ag-As) + Fy x As)

      const resultadoValue =
        (0.75 *
          0.85 *
          (0.85 * resistenciaConcreto * (areaConcreto - areaAcero) +
            resistenciaAcero * areaAcero)) /
        1000;

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
