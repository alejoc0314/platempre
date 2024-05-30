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

  // Método para generar un array con el número de repeticiones
  counterArray() {
    return new Array(this.columnItemCounter);
  }

  plusRows() {
    this.columnItemCounter += 1;
  }

  retireRows() {
    if (this.columnItemCounter > 1) {
      this.columnItemCounter -= 1;
      this.calcTotal();
    }
  }

  calcResult(event: Event) {
    const targetElement = event.target as HTMLElement;
    const relevantClass = targetElement.classList[0];
    const row = relevantClass.split('_')[1];

    const resistenciaConcreto = parseInt(
      (
        document.querySelector(
          '.resistenciaConcreto_' + row
        ) as HTMLInputElement
      )?.value
    );
    const areaConcreto = parseInt(
      (document.querySelector('.areaConcreto_' + row) as HTMLInputElement)
        ?.value
    );
    const areaAcero = parseInt(
      (document.querySelector('.areaAcero_' + row) as HTMLInputElement)?.value
    );
    const resistenciaAcero = parseInt(
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

      const resultadoValue = (0.75 * 0.85 * (0.85 * resistenciaConcreto *(areaConcreto-areaAcero) + resistenciaAcero * areaAcero)) / 1000;

      // Asignar el valor calculado al input de resultado correspondiente
      (document.querySelector('.resultado_' + row) as HTMLInputElement).value =
        resultadoValue.toString();

      this.calcTotal();
    } else {
      const cero = 0;

      (document.querySelector('.resultado_' + row) as HTMLInputElement).value =
        cero.toString();
    }
  }

  calcTotal() {
    setTimeout(() => {
      const allInputs = document.querySelectorAll<HTMLInputElement>('input');

      const resultadoInputs = Array.from(allInputs).filter((input) =>
        Array.from(input.classList).some((className) =>
          className.startsWith('resultado_')
        )
      );
      const total = resultadoInputs
        .map((input) => parseFloat(input.value) || 0)
        .reduce((acc, value) => acc + value, 0);

      (document.querySelector('.result_total') as HTMLInputElement).value =
        total.toString();
    }, 100);
  }
}
