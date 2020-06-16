import {MessageService} from "./message.service";

describe('Test my message service service', () => {

  let messageService;

  beforeEach(() => {
    messageService = new MessageService();
    let init = ['Hello', 'Again']
    messageService.messages = init;
  })

  it('Should be the same pop value as I pushed', () => {
    let newValue = 'myNewValue';
    messageService.add(newValue);
    expect(messageService.messages.pop()).toBe(newValue);
  })

  it('Should be 3 values if a push one more on to 2', () => {
    let newValue = 'myNewValue';
    messageService.add(newValue);
    expect(messageService.messages.length).toBe(3);
  })

  it('Should be zero if I clear', () => {


    //NOte maybe not do a beforeEach better idea to do construction in each test because construction can have a big part of each test.
    let newValue = 'myNewValue';
    messageService.add(newValue);
    messageService.clear();
    expect(messageService.messages.length).toBe(0);
  })



});


// import { Injectable } from '@angular/core';
//
// @Injectable()
// export class MessageService {
//   messages: string[] = [];
//
//   add(message: string) {
//     this.messages.push(message);
//   }
//
//   clear() {
//     this.messages = [];
//   }
// }
