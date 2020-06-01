import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from '../../models/Game'
import { ActivatedRoute, Router } from '@angular/router'

import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  edit: boolean = false;

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  }

  constructor(private gamesService: GamesService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if(params.id){
      this.gamesService.oneGame(params.id).subscribe(
        res => {
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }

  saveNewGame(){
    delete this.game.id;
    delete this.game.created_at;

    this.gamesService.saveGame(this.game).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err => console.error(err)
    );
  }

  updateGame(){
    delete this.game.created_at;
    this.gamesService.updateGame(this.game.id, this.game).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err => console.error(err)
    );
  }

}
