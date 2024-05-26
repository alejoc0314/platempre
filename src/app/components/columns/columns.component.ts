import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [CommonModule],
  providers: [DecimalPipe],
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.scss',
})
export class ColumnsComponent {
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

    let baseValue = parseInt(
      (document.querySelector('.base_' + row) as HTMLInputElement)?.value
    );
    let heightValue = parseInt(
      (document.querySelector('.altura_' + row) as HTMLInputElement)?.value
    );
    let depthValue = parseInt(
      (document.querySelector('.profundidad_' + row) as HTMLInputElement)?.value
    );
    let volumeValue = parseInt(
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
      let resultadoValue = baseValue * heightValue * depthValue - volumeValue;

      // Asignar el valor calculado al input de resultado correspondiente
      (document.querySelector('.resultado_' + row) as HTMLInputElement).value =
        resultadoValue.toString();

      this.calcTotal();
    } else {
      let cero = 0;

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

      console.log(resultadoInputs);

      const total = resultadoInputs
        .map((input) => parseFloat(input.value) || 0)
        .reduce((acc, value) => acc + value, 0);

      (document.querySelector('.result_total') as HTMLInputElement).value =
        total.toString();
    }, 100);
  }
}
