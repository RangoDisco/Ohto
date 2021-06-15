import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateDesc',
})
export class TruncateDesc implements PipeTransform {
  transform(desc: string): string {
    return desc.slice(0, 300) + '...';
  }
}
