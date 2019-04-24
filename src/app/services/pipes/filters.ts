import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../../app.component';

@Pipe({
    name: 'gameInCartFilter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: Game[]): any {
        return items.filter(item => item.isInCart);
    }
}