import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from './services/global/global-service.service';

export interface Game {
  id: number;
  name: string;
  price: number;
  currency: string;
  discount: string;
  image: string;
  isBought: boolean;
  isInCart: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  gameList: Game[];

  constructor(private globalService: GlobalServiceService) { }

  ngOnInit() {
    this.gameList = [
      {
        id: 1,
        name: `oddworld: stranger's wrath`,
        price: 100,
        currency: '$',
        discount: '-50%',
        image: 'oddworlds.png',
        isBought: true,
        isInCart: false,
      },
      {
        id: 2,
        name: `assasin's creed: director's cut`,
        price: 100,
        currency: '$',
        discount: '-50%',
        image: 'creed.png',
        isBought: false,
        isInCart: true,
      },
      {
        id: 3,
        name: `neverwinter nights`,
        price: 100,
        currency: '$',
        discount: ' - 50 % ',
        image: 'neverwinter.png',
        isBought: false,
        isInCart: false,
      },
      {
        id: 4,
        name: `the settlers 2: gold edition`,
        price: 100,
        currency: '$',
        discount: '-50%',
        image: 'settlers.png',
        isBought: false,
        isInCart: false,
      },
      {
        id: 5,
        name: `chaos on deponia`,
        price: 100,
        currency: '$',
        discount: '-50%',
        image: 'deponia.png',
        isBought: false,
        isInCart: true,
      }
    ]

    this.setGameList();
    this.globalService.gameId$.subscribe(gameId => {
      if (gameId != null) {
        this.gameList.filter(x => x.id === parseInt(gameId))[0].isInCart = false;
      }

    });
  }

  setGameList() {
    this.globalService.setGameListToToolbar(this.gameList);
  }

  putToCart(id: number) {
    this.gameList.filter(x => x.id === id)[0].isInCart = true;
    this.setGameList();
  }
}
