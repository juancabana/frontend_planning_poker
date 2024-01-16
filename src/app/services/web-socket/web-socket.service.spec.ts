import { Room } from 'src/app/interfaces/room.interface';
import { WebSocketService } from './web-socket.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { Socket, io } from 'socket.io-client';

jest.mock('socket.io-client');

describe('WebSocketService', () => {
  let webSocketService: WebSocketService;
  let socket: Socket;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketService, { provide: Socket }],
    });
  });

  beforeEach(() => {
    webSocketService = TestBed.inject(WebSocketService);
    webSocketService.socket = { emit: jest.fn() } as any;
    socket = TestBed.inject(Socket);
  });

  // setupSocketConnection
  it('setupSocketConnection: should call io function', () => {
    const mockRoom: Room = { _id: '1234', tittle: 'Sprint 32', averageScore: -1, owner: 'idUser123', players: [] };
    const mockOptions = {
      query: {
        nameRoom: 'Sprint 32',
        user: localStorage.getItem('user')
      },
    };
    webSocketService.setupSocketConnection(mockRoom);
    expect(webSocketService.room).toEqual(mockRoom);
    expect(io).toHaveBeenCalledWith('http://localhost:3000/', mockOptions);
  });

  // onEvent
  it('onEvent: Should execute on function', () => {
    const spy1 = jest.spyOn(socket, 'on')
    const spy2 = jest.spyOn(webSocketService, 'onEvent').mockReturnValue(of([]))
    webSocketService.onEvent<User[]>('userCreated').subscribe((data) => {
      // console.log('Holiiiiiii')
      expect(spy1).toHaveBeenCalled()
      expect(data).toEqual([])
    })
  });

  // emit
  it('emit: should emmit event in socket', () => {
    const spy = jest.spyOn(webSocketService, 'emit');
    webSocketService.emit('testEvent', { data: 'mockData' });
    expect(spy).toHaveBeenCalledWith('testEvent', { data: 'mockData' });
  });

  // listenNewUser
  it('listenNewUser: Should listen event', () => {
    const spy = jest.spyOn(webSocketService, 'onEvent');
    webSocketService.listenNewUser().subscribe();
    expect(spy).toHaveBeenCalledWith('userCreated');
  });

  // listenCardRevealed
  it('listenCardRevealed: Should listen event', () => {
    const spy = jest.spyOn(webSocketService, 'onEvent');
    webSocketService.listenCardRevealed().subscribe();
    expect(spy).toHaveBeenCalledWith('reveal-cards');
  });

  // listenRestartGame
  it('listenRestartGame: Should listen event', () => {
    const spy = jest.spyOn(webSocketService, 'onEvent');
    webSocketService.listenRestartGame().subscribe();
    expect(spy).toHaveBeenCalledWith('restart');
  });
});
