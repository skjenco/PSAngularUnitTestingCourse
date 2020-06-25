//Start with a copy of heroes.component.integration.deep.spec.ts
//So normally I would just add my extra test to heroes.component.integration.deep.spec.ts
// Separate so I could see the difference on what is for dom interaction testing.
// So the set of interaction I want to test is when a user clicks delete

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

  it(`delete note you can use ticks like other javascript strings ${mockHeroService} when component delete is called`, () => {
    spyOn(fixture.componentInstance, 'delete');//The key to this test lets us determine if
    //                  //the delete was called and what is called with.
    mockHeroService.getHeroes.and.returnValue(of(DATA));
    fixture.detectChanges();
    const app_hero = fixture.debugElement.queryAll(By.directive(HeroComponent));// So I am querying for all tag app-hero which is Component HeroComponent

    let button = app_hero[0].query(By.css('button'));
    button.triggerEventHandler('click', {stopPropagation: () => {
          console.log('The click event now has been called')
      } })

    //Test that a click event is called
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(DATA[0]);


  })

  it(`Using a raise instead instead of calling click`, () => {
    spyOn(fixture.componentInstance, 'delete');//The key to this test lets us determine if
    //                  //the delete was called and what is called with.
    mockHeroService.getHeroes.and.returnValue(of(DATA));
    fixture.detectChanges();
    const app_hero = fixture.debugElement.queryAll(By.directive(HeroComponent));// So I am querying for all tag app-hero which is Component HeroComponent

    let myHeroComponent = <HeroComponent>app_hero[0].componentInstance;
    myHeroComponent.delete.emit(undefined);  //so now we can emit the event.

    //Test that a click event is called
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(DATA[0]);

  })

  it(`Using a raise instead instead of calling click On more time variation`, () => {
    spyOn(fixture.componentInstance, 'delete');//The key to this test lets us determine if
    //                  //the delete was called and what is called with.
    mockHeroService.getHeroes.and.returnValue(of(DATA));
    fixture.detectChanges();
    const app_hero = fixture.debugElement.queryAll(By.directive(HeroComponent));// So I am querying for all tag app-hero which is Component HeroComponent

    app_hero[0].triggerEventHandler('delete', null);//different then getting the button onthe compoent then trigger
                                    //the component also has a tri
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(DATA[0]);

  });

  //Test interaction with inputing data into the form
  it('input data into a form when click add button', () => {

    //Test that a click event is called

    mockHeroService.getHeroes.and.returnValue(of(DATA));
    fixture.detectChanges();
    let namevalue = "mr ice";
    mockHeroService.addHero.and.returnValue(of({id: 134, name: namevalue, strength: 10}));
    const input = fixture.debugElement.query(By.css('input'));
    // @ts-ignore  - the correct is nativeElement it shoud not be show as an error
    const actualDomInputElement = input.nativeElement;  //I want the dom element not the debug Element
    let addButton = fixture.debugElement.queryAll(By.css('button'))[0];  //Get the very first button which will be an add button
    actualDomInputElement.value = namevalue;  //like typing in namevalue into the input box
    addButton.triggerEventHandler('click',null); //Cause the action of clicking the button

    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('ul'));
    let textContent = debugElement.nativeElement.textContent;
    fixture.detectChanges();
    console.log(textContent);
    expect(textContent).toContain(namevalue);
  })




});
