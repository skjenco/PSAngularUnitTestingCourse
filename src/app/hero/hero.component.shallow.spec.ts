import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NO_ERRORS_SCHEMA, SchemaMetadata} from "@angular/core";
import {HeroComponent} from "./hero.component";
import {BrowserModule, By} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DashboardComponent} from "../dashboard/dashboard.component";


describe('herocomponent shallow test', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule( {
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
  });

  it('simple test', ()=> {
    fixture.componentInstance.hero = {id: 0, name: "test", strength: 0};
    expect(fixture.componentInstance.hero.name).toEqual('test');
  })

  it('test value in the anchor', ()=> {

    fixture.componentInstance.hero = {id: 0, name: "test", strength: 0};
    fixture.detectChanges();
    console.log(fixture.componentInstance.hero.name);
    console.log(fixture.nativeElement);
    console.log(fixture.nativeElement.querySelector('a').textContent);
    console.log(fixture.nativeElement.querySelector('.myclass').textContent);

    //Another way to get it
    //This gets way more info
    console.log(fixture.debugElement.query(By.css('#myid')));

    expect(fixture.nativeElement.querySelector('#myid').textContent).toContain('test');
  })


});
