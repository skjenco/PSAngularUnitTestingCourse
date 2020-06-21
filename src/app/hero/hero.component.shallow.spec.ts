import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NO_ERRORS_SCHEMA, SchemaMetadata} from "@angular/core";
import {HeroComponent} from "./hero.component";
import {BrowserModule} from "@angular/platform-browser";
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

});
