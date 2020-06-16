import {HeroesComponent} from "./heroes.component";
import {Observable, of} from "rxjs";

describe('Test my heroes compent', () => {

  let heroesComponent;
  let heroService;
  let hero2 = {id: 2, name: 'hero2', strength: 3};
  let data = [{id: 1, name: 'hero1', strength: 15}, hero2];

  // export class Hero {
  //   id: number;
  //   name: string;
  //   strength: number;
  // }

  beforeEach(() => {
    heroService = jasmine.createSpyObj(['getHeroes','deleteHero']);
    heroesComponent = new HeroesComponent(heroService);
  });

  it('should get list of heros', () => {
    heroService.getHeroes.and.returnValue(of(data));
    heroesComponent.getHeroes();
    expect(heroesComponent.heroes).toBe(data);
  })

  it('should get list of heros', () => {
    heroService.deleteHero.and.returnValue(of(true));
    heroesComponent.heroes = data;
    heroesComponent.delete(data[1]);
    expect(heroesComponent.heroes.length).toBe(1);
  });

});


//MOcking example the hard way not using spy
// describe('Test my heroes compent', () => {
//
//   let heroesComponent;
//   let heroService;
//   let hero2 = {id: 2, name: 'hero2', strength: 3};
//   let data = [{id: 1, name: 'hero1', strength: 15}, hero2];
//
//   // export class Hero {
//   //   id: number;
//   //   name: string;
//   //   strength: number;
//   // }
//
//   beforeEach(() => {
//     heroService = {
//       getHeroes: () => {
//         return of(data);
//       },
//       deleteHero: (hero) => {
//         debugger;
//         let filter = data.filter(h => h !== hero); //Probably would not ever mock this way.  So I am testing components delete I dont necessarily have to care about  service and its delete  I could/should just force the right value on a unit test.
//         //again this whole test is bad and should be an integration test.
//         return of(filter);
//       }
//     } ;
//     heroesComponent = new HeroesComponent(heroService);
//   });
//
//   it('should get list of heros', () => {
//     heroesComponent.getHeroes();
//     expect(heroesComponent.heroes).toBe(data);
//   })
//
//   it('should get list of heros', () => {
//     debugger;
//     heroesComponent.getHeroes();
//     heroesComponent.delete(hero2);
//     expect(heroesComponent.heroes.length).toBe(1);
//   });
//
// });



// getHeroes (): Observable<Hero[]> {
//   return this.http.get<Hero[]>(this.heroesUrl)
//     .pipe(
//       tap(heroes => this.log(`fetched heroes`)),
//       catchError(this.handleError('getHeroes', []))
//     );
// }


// import {OnInit} from "@angular/core";
// import {Hero} from "../hero";
// import {HeroService} from "../hero.service";
//
// export class HeroesComponent implements OnInit {
//   heroes: Hero[];
//
//   constructor(private heroService: HeroService) { }
//
//   ngOnInit() {
//     this.getHeroes();
//   }
//
//   getHeroes(): void {
//     this.heroService.getHeroes()
//       .subscribe(heroes => this.heroes = heroes);
//   }
//
//   add(name: string): void {
//     name = name.trim();
//     var strength = 11
//     if (!name) { return; }
//     this.heroService.addHero({ name, strength } as Hero)
//       .subscribe(hero => {
//         this.heroes.push(hero);
//       });
//   }
//
//   delete(hero: Hero): void {
//     this.heroes = this.heroes.filter(h => h !== hero);
//     this.heroService.deleteHero(hero).subscribe();
//   }
//
// }
