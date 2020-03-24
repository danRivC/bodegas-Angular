import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeBusquedaFecha'
})
export class PipeBusquedaFechaPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    if( arg.length <3){
      return value
    }
    const resultSearch =[];
    for(const search of value){
      if(search.fecha.indexOf(arg)>-1){
        resultSearch.push(search);
      }
    }
  }

}
