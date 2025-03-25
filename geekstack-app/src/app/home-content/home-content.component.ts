import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../shared/component/search-bar/search-bar.component';
import { GeekstackService } from '../core/service/geekstackdata.service';
import { CardUnionArena } from '../core/model/card-unionarena.model';
import { CardOnePiece } from '../core/model/card-onepiece.model';
import { CardDragonBallZFW } from '../core/model/card-dragonballzfw.model';
import { CookieRunCard } from '../core/model/card-cookierunbraverse.model';
import { TcgImageComponent } from "../shared/component/tcg-image/tcg-image.component";

@Component({
    selector: 'app-home-content',
    standalone: true,
    imports: [RouterLink, CommonModule, SearchBarComponent, TcgImageComponent],
    templateUrl: './home-content.component.html',
    styleUrl: './home-content.component.css'
})
export class HomeContentComponent {
  @ViewChild('tcgList') tcgList!: ElementRef<HTMLDivElement>;

  tcglist = [
    {
      img: '/images/homeUAbtn.jpg',
      alt: 'Union Arena',
      path: '/tcg/unionarena',
    },
    { img: '/images/homeOPbtn.jpg', alt: 'One piece', path: '/tcg/onepiece' },
    {
      img: '/images/homeDBZbtn.jpg',
      alt: 'Dragonballz Fusion World',
      path: '/tcg/dragonballzfw',
    },
    {
      img: '/images/homeCRBbtn.jpg',
      alt: 'Cookie Run Braverse',
      path: '/tcg/cookierunbraverse',
    },
    {
      img: '/images/homeDMbtn.jpg',
      alt: 'Duelmasters',
      path: '/tcg/duelmasters',
    },
    {
      img: '/images/homePKMNbtn.jpg',
      alt: 'Pokemon',
      path: '/tcg/dragonballz',
    },
  ];

  searchValue: string = '';
  exchangeRate: string = '';
  cardList: Array<
    CardUnionArena | CardOnePiece | CardDragonBallZFW | CookieRunCard
  > = [];

  private geekstackService = inject(GeekstackService);
  constructor() {}

  handleSearchValue(value: {name:string,icon:string,term:string}) {
    this.searchValue = value.term;
    this.geekstackService.searchCard(value.name,value.term).subscribe({
      next: (response) => {
        this.cardList = response || [];
        this.updateScrollableState();
      },
      error: (err) => {
        console.error('Failed to fetch cards:', err);
        this.cardList = err || [];
        this.updateScrollableState();
      },
    });
  }


  ngAfterViewInit() {
    this.updateScrollableState();
    this.geekstackService.getExchangeRate().subscribe({
      next: (response) => {
        this.exchangeRate = response;
      }
    })
  }

  private updateScrollableState(): void {
    if (this.searchValue) {
      return;
    }

    const tcgListEl = this.tcgList.nativeElement;

    if (tcgListEl.scrollWidth > tcgListEl.clientWidth) {
      tcgListEl.classList.add('scrollable');
    } else {
      tcgListEl.classList.remove('scrollable');
    }
  }
}
