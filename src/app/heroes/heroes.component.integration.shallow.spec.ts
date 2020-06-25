import {HeroesComponent} from "./heroes.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component, Input} from "@angular/core";
import {HeroService} from "../hero.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MessageService} from "../message.service";
import {of} from "rxjs";
import {Hero} from "../hero";
import {By} from "@angular/platform-browser";

// id: number;
// name: string;
// strength: number;

const  DATA = [{id: 0, name: 'one', strength: 8},{id: 0, name: 'one', strength: 7}];
describe('heroes component', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;

  @Component({
    selector: 'app-hero',  //I need this name because that is what I am faking.
    template: '<div></div>'  //charne to a template not tempateUrl Just any div is fine I am not testing my html that is in my child component
    //styleUrls:  ['./hero.component.css']  --Don't need a template with my Fake
  })
  class FakeHeroComponent {  //Take out the export with this fake.  Can keep the same name use Fake to make it more noticiable
    @Input() hero: Hero;
    //@Output() delete = new EventEmitter(); don't need the outputs
    //
    // Dont need this method again not testing the child
    // onDeleteClick($event): void {
    //   $event.stopPropagation();
    //   this.delete.next();
    // }
  }




  beforeEach( () => {

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero','deleteHero']);

  //   mockHeroService = {
  //       getHeroes: () => { return of(true)},
  //     searchHeroes: of(true),
  //     addHero: of(true),
  //     deleteHero: of(true),
  //     updateHero: of(true)
  // };


      TestBed.configureTestingModule( {
      declarations: [HeroesComponent, FakeHeroComponent],
      imports: [HttpClientTestingModule],
      providers: [ {provide: HeroService, useValue: mockHeroService}, MessageService ],
      //schemas: [NO_ERRORS_SCHEMA]  --Nice problem with this is we dont test our template like misselling of a tag like buton instead of button
                                      // So now to fix this issue I will make what I need in the html to work
                                      //In this case I need to make a fake app-hero component
  }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('simple test', ()=> {


    mockHeroService.getHeroes.and.returnValue(of(DATA));
    fixture.detectChanges();
    console.log(fixture.componentInstance.heroes);
    expect(fixture.componentInstance.heroes.length).toBe(2);

  });

  it('test number of hero displayed', () => {
    mockHeroService.getHeroes.and.returnValue(of(DATA));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(2);
  });


  it('test value in the anchor', ()=> {
  })


});
