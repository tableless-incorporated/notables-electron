import { Pipe, PipeTransform } from '@angular/core';
import * as  marked  from 'marked';
import * as PlainTextRenderer from 'marked-plaintext';



@Pipe({
  name: 'md2txt'
})
export class Md2txtPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const renderer = new PlainTextRenderer();

    return marked(value, { renderer });
  }

}
