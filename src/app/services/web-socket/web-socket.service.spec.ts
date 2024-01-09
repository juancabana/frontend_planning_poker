import { Room } from 'src/app/interfaces/room.interface';
import { WebSocketService } from './web-socket.service';
import { TestBed } from '@angular/core/testing';
import { Subscriber, of } from 'rxjs';
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
    webSocketService = TestBed.inject(WebSocketService);
    webSocketService.socket = { emit: jest.fn() } as any;
    socket = TestBed.inject(Socket);
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
      },
    };
    webSocketService.setupSocketConnection(mockRoom);
    expect(webSocketService.room).toEqual(mockRoom);
    expect(io).toHaveBeenCalledWith('http://localhost:3000/', mockOptions);
  });

  // onEvent
  it('onEvent: Should execute on function', () => {
    jest.spyOn(webSocketService, 'onEvent').mockReturnValue(of([]));
    const spy1 = jest
      .spyOn(socket, 'on')
      .mockImplementation((event, callback) => {
        callback([]);
        return socket;
      });
    webSocketService.onEvent<User[]>('testEventUser').subscribe({
      next: (data: User[]) => {
        expect(data).toBeDefined();
        // expect(spy1).toHaveBeenCalled();
        // expect(spy).toHaveBeenCalledWith('testEventUser');
        expect(spy1).toHaveBeenCalledWith(
          'testEventUser',
          expect.any(Function)
        );
        // done()
      },
    });
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

  // listenCardSelected
  it('listenCardSelected: Should listen event', () => {
    const spy = jest.spyOn(webSocketService, 'onEvent');
    webSocketService.listenCardSelected().subscribe();
    expect(spy).toHaveBeenCalledWith('cardSelected');
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
