import {HeroesComponent} from "./heroes.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroService} from "../hero.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MessageService} from "../message.service";
import {HeroComponent} from "../hero/hero.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

// id: number;
// name: string;
// strength: number;

const  DATA = [{id: 0, name: 'one man cat', strength: 8},{id: 2, name: 'two person dog', strength: 7}];
describe('deep heroes component', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;


  beforeEach( () => {

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero','deleteHero']);

    TestBed.configureTestingModule( {
      declarations: [HeroesComponent,
                     HeroComponent],  //this is why it is a deep test because we are really testing interaction with the heroComponent
      imports: [HttpClientTestingModule],
      providers: [ {provide: HeroService, useValue: mockHeroService}, MessageService ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);



  });


  it('should render each hero as a hero component', ()=> {
    mockHeroService.getHeroes.and.returnValue(of(DATA));
    fixture.detectChanges();

    //Interesting note the directive is a parent of components and attributes.
    //because of this fact we can look through the schema (query) for the component name So HeroComponent
    let renderedHeroElements = fixture.debugElement.queryAll(By.directive(HeroComponent));   //So I will get two of them since that how many I created in my mockservice
    expect(renderedHeroElements.length).toBe(2);
    //Get the first one of my elements
    console.log('sfsdf');
    console.log(renderedHeroElements[0].componentInstance.hero.name);
    for(let i = 0; i < DATA.length; i++) {
      expect(renderedHeroElements[i].componentInstance.hero.id).toBe(DATA[i].id);
      expect(renderedHeroElements[i].componentInstance.hero.name).toBe(DATA[i].name);
      expect(renderedHeroElements[i].componentInstance.hero.strength).toBe(DATA[i].strength);
      //Beter
      expect(renderedHeroElements[i].componentInstance.hero).toEqual(DATA[i]);
    }


    expect('true').toBe('true');
  })


});
