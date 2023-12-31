import { Room } from 'src/app/interfaces/room.interface';
import { WebSocketService } from './web-socket.service';
import { TestBed } from '@angular/core/testing';
import { isObservable, of } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { CardRevealed } from 'src/app/interfaces/card-revealed.interface';
import { Socket, io } from 'socket.io-client';

jest.mock('socket.io-client');

describe('WebSocketService', () => {
  let webSocketService: WebSocketService;
  let socket: Socket


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketService,
        { provide: Socket}],
    });
    webSocketService = TestBed.inject(WebSocketService);
    webSocketService.socket = {emit: jest.fn()} as any;
    socket = TestBed.inject(Socket)
  });



  // setupSocketConnection
  it('setupSocketConnection: should call io function', () => {
    const mockRoom: Room = {
      _id: '1234',
      tittle: 'Sprint 32',
      averageScore: -1,
      owner: 'idUser123',
      players: [],
    };
    const mockOptions = {
      query: {
        nameRoom: 'Sprint 32',
        user: localStorage.getItem('user'),
      }
    };
    webSocketService.setupSocketConnection(mockRoom)
    expect(webSocketService.room).toEqual(mockRoom);
    expect(io).toHaveBeenCalledWith('http://localhost:3000/', mockOptions)
  });

  // onEvent
  it('onEvent: ', () => {
    const spy = jest.spyOn(webSocketService, 'onEvent').mockReturnValue(of('mockData'))
    webSocketService.onEvent<User[]>('testEventUser').subscribe({next: (data) => expect(data).toBe('mockData')})
    expect(spy).toHaveBeenCalled()

  });

  // emit
  it('emit: ', () => {
    const spy = jest.spyOn(webSocketService, 'emit')
    webSocketService.emit('testEvent', {data: 'mockData'})
    expect(spy).toHaveBeenCalledWith('testEvent', {data: 'mockData'})
  })

  // listenNewUser
  it('listenNewUser: ', () => {
    const spy = jest.spyOn(webSocketService, 'onEvent')
    webSocketService.listenNewUser().subscribe()
    expect(spy).toHaveBeenCalledWith('userCreated')
  });

  // listenCardSelected
  it('listenCardSelected: ', () => {
    const spy = jest.spyOn(webSocketService, 'onEvent')
    webSocketService.listenCardSelected().subscribe()
    expect(spy).toHaveBeenCalledWith('cardSelected')
  });

  // listenCardRevealed
  it('listenCardRevealed: ', () => {
    const spy = jest.spyOn(webSocketService, 'onEvent')
    webSocketService.listenCardRevealed().subscribe()
    expect(spy).toHaveBeenCalledWith('reveal-cards')
  });

  // listenRestartGame
  it('listenRestartGame: ', () => {
    const spy = jest.spyOn(webSocketService, 'onEvent')
    webSocketService.listenRestartGame().subscribe()
    expect(spy).toHaveBeenCalledWith('restart')
  });

});
