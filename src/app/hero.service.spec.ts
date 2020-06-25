import {inject, TestBed} from "@angular/core/testing";
import {HeroService} from "./hero.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MessageService} from "./message.service";

describe('hero service test', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    //Not really testing my MessageService so I will just make a spy for it
    mockMessageService = jasmine.createSpyObj(['add', 'clear']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MessageService,
          useValue: mockMessageService
        },
        HeroService
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);  //This is how you do injection in testing injected in HttpTestingController
    //This would a way to get any even our own I could do something like myService = TestBed.get(MyService);  if I had a service MyService
    heroService = TestBed.get(HeroService);

  });

  //Note a nested describe here because this is angular it has access to the outer describe variables
  //  So note I don't need the neested describe purpose mus be organization.
      describe('getHero', () => {
        it('injecting probably cleaner way then using inject', () => {
          heroService.getHero(14).subscribe( x => {
            console.log('Inside my subscribe after I flush my test data out')
            console.log(x);
          });

          //heroService.getHero(144).subscribe();  //caught by verify  ONly allows one call note I could have 144 and it would pass without verify

          //Now lets use our httpTestingController to do some test.
          //Need to setup my hero 14 I called from above
          const req = httpTestingController.expectOne('api/heroes/14');
          console.log("before my flush this will activate my subscribe above");
          req.flush({id: 14, name: 'small man', strength: 101});
          console.log("after my flush");
          httpTestingController.verify(); //make sure that only calls what it should  See above commented line getHerors 144

        })

        // it('another  way to do  with inject test',
        //   inject([HeroService,
        //       HttpTestingController],
        //     (service: HeroService, controller: HttpTestingController) => {
        //       service.getHero(4).subscribe();
        //     })
        // )

      })

  });



