import { Component, OnInit } from '@angular/core';
import { Game } from '../../app.component';
import { GlobalServiceService } from 'src/app/services/global/global-service.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  gameList: Game[];
  itemsInCart = 0;
  inCartGameList: Game[];
  sumPrice = 0;

  constructor(private globalService: GlobalServiceService) { }

  ngOnInit() {
    this.inCartGameList = [] as Game[];
    this.globalService.gameListToToolbar$.subscribe(gameList => {
      this.setGameList(gameList)
    });

  }

  setGameList(list: string | Game[]) {
    this.itemsInCart = 0;
    this.sumPrice = 0;
    this.inCartGameList = [] as Game[];
    if (typeof (list) === 'string') {
      this.gameList = JSON.parse(list);
    }
    this.gameList.forEach(game => {
      if (game.isInCart) {
        this.itemsInCart += 1;
        this.sumPrice += game.price;
        this.inCartGameList.push(game);
      }
    });
  }

  removeGameFromCart(id: number, $event: any) {
    $event.stopPropagation();
    this.gameList.filter(x => x.id === id)[0].isInCart = false;
    this.setGameList(this.gameList);
    this.setGameId(id);
  }

  clearCart() {
    this.gameList.forEach(game => {
      if (game.isInCart) {
        game.isInCart = false;
        this.setGameId(game.id);
      }
    });
    this.setGameList(this.gameList);
  }

  setGameId(id: number) {
    this.globalService.passGameIdToFrontPage(id);
  }

}


