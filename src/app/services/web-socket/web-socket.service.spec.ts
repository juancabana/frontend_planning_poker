import { Room } from 'src/app/interfaces/room.interface';
import { WebSocketService } from './web-socket.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { CardRevealed } from 'src/app/interfaces/card-revealed.interface';

describe('WebSocketService', () => {
  let service: WebSocketService;

  const room: Room = {
    tittle: 'Sprint 89',
    owner: '657aebb1ca215l091i8027b5',
    averageScore: -3,
    players: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketService],
    });
    service = TestBed.inject(WebSocketService);
    service.socket = {emit: jest.fn()} as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test connection
  it('service - should connect to WebSocket successfully', () => {
    const spyConnect = jest.spyOn(service, 'setupSocketConnection');

    service.setupSocketConnection(room);

    expect(spyConnect).toHaveBeenCalled();
  });

  // Test emit events
  it('should emit events (cardSelected)', (done) => {
    service.setupSocketConnection(room);
    const spy = jest.spyOn(service.socket, 'emit');

    service.socket.emit('cardSelected', {
      index: 5,
      ID_user: '657aebb1ca215a091b8027b5',
    });

    expect(spy).toHaveBeenCalledWith('cardSelected', {
      index: 5,
      ID_user: '657aebb1ca215a091b8027b5',
    });
    done();
  });

  it('should emit events (cardSelected)', (done) => {
    service.setupSocketConnection(room);
    const spy = jest.spyOn(service.socket, 'emit');

    service.socket.emit('cardSelected', {
      index: 3,
      ID_user: '657aebb1ca215a091b8027b5',
    });

    expect(spy).toHaveBeenCalledWith('cardSelected', {
      index: 3,
      ID_user: '657aebb1ca215a091b8027b5',
    });
    done();
  });

  it('should emit events (restart)', (done) => {
    service.setupSocketConnection(room);
    const spy = jest.spyOn(service.socket, 'emit');

    service.socket.emit('restart', '657aebb1ca215a091b8027b5');

    expect(spy).toHaveBeenCalledWith('restart', '657aebb1ca215a091b8027b5');
    done();
  });

  it('should emit events (restart)', (done) => {
    service.setupSocketConnection(room);
    const spy = jest.spyOn(service.socket, 'emit');

    service.socket.emit('restart', '657aebb1ca215a091b8027b7');

    expect(spy).toHaveBeenCalledWith('restart', '657aebb1ca215a091b8027b7');
    done();
  });

  it('should emit events (reveal-cards)', (done) => {
    service.setupSocketConnection(room);
    const spy = jest.spyOn(service.socket, 'emit');

    service.socket.emit('reveal-cards', [
      {
        value: '3',
        amount: 2,
      },
      {
        value: '0',
        amount: 1,
      },
    ]);

    expect(spy).toHaveBeenCalledWith('reveal-cards', [
      {
        value: '3',
        amount: 2,
      },
      {
        value: '0',
        amount: 1,
      },
    ]);
    done();
  });

  it('should emit events (reveal-cards)', (done) => {
    service.setupSocketConnection(room);
    const spy = jest.spyOn(service.socket, 'emit');

    service.socket.emit('reveal-cards', [
      {
        value: '?',
        amount: 1,
      },
      {
        value: '13',
        amount: 2,
      },
    ]);

    expect(spy).toHaveBeenCalledWith('reveal-cards', [
      {
        value: '?',
        amount: 1,
      },
      {
        value: '13',
        amount: 2,
      },
    ]);
    done();
  });

  // Test listen
  it('should listen for new users', (done) => {
    const newUser = {
      username: 'Juanda',
      visualization: 'player',
      room_id: '657aebb1ca215a091b8027ae',
      is_owner: true,
      is_connected: true,
      selected_card: -3,
    };
    jest.spyOn(service, 'onEvent').mockReturnValue(of([newUser]));

    const observable = service.listenNewUser();
    const subscription = observable.subscribe((users) => {
      expect(users).toContain(newUser);
      done();
    });

    subscription.unsubscribe();
  });

  it('should listen for new users', (done) => {
    const newUser: User = {
      username: 'Danicin',
      visualization: 'spectator',
      room_id: '657aebb1ca215a091b8027ae',
      is_owner: false,
      is_connected: true,
      selected_card: -3,
    };
    jest.spyOn(service, 'onEvent').mockReturnValue(of([newUser]));

    const observable = service.listenNewUser();
    const subscription = observable.subscribe((users) => {
      expect(users).toContain(newUser);
      done();
    });

    subscription.unsubscribe();
  });

  it('should listen for card selected', (done) => {
    const newCard = {
      value: 5,
      viewValue: '5',
      selected: true,
      selected_by_user: true,
    };

    jest.spyOn(service, 'onEvent').mockReturnValue(of([newCard]));

    const observable = service.listenCardSelected();
    const subscription = observable.subscribe((cards) => {
      expect(cards).toContain(newCard);
      done();
    });

    subscription.unsubscribe();
  });

  it('should listen for card selected', (done) => {
    const newCard = {
      value: 0,
      viewValue: '0',
      selected: true,
      selected_by_user: true,
    };

    jest.spyOn(service, 'onEvent').mockReturnValue(of([newCard]));

    const observable = service.listenCardSelected();
    const subscription = observable.subscribe((cards) => {
      expect(cards).toContain(newCard);
      done();
    });

    subscription.unsubscribe();
  });

  // Test listenCardRevealed
  it('should listen for revealed cards', (done) => {
    const revealedCards: CardRevealed[] = [
      { value: 3, amount: 2 },
      { value: 0, amount: 1 },
    ];

    jest.spyOn(service, 'onEvent').mockReturnValue(of(revealedCards));

    const observable = service.listenCardRevealed();
    const subscription = observable.subscribe((cards) => {
      expect(cards).toEqual(revealedCards);
      done();
    });

    subscription.unsubscribe();
  });

  // Test listenRestartGame
  it('should listen for game restart', (done) => {
    const restartData: User[] = [
      {
        username: 'Player1',
        visualization: 'player',
        room_id: 'roomId',
        is_owner: true,
        is_connected: true,
        selected_card: -3,
      },
      {
        username: 'Player2',
        visualization: 'player',
        room_id: 'roomId',
        is_owner: false,
        is_connected: true,
        selected_card: -1,
      },
    ];

    jest.spyOn(service, 'onEvent').mockReturnValue(of(restartData));

    const observable = service.listenRestartGame();
    const subscription = observable.subscribe((users) => {
      expect(users).toEqual(restartData);
      done();
    });

    subscription.unsubscribe();
  });

  // Test onEvent
  it('should emit event data', (done) => {
    service.setupSocketConnection(room);
    const eventData = 'test data';
    const eventName = 'testEvent';

    jest.spyOn(service.socket, 'on').mockImplementation((event, callback) => {
      if (event === eventName) {
        callback(eventData);
      }
      return service.socket;
    });

    const observable = service.onEvent<string>(eventName);
    const subscription = observable.subscribe((data) => {
      expect(data).toBe(eventData);
      done();
    });

    subscription.unsubscribe();
  });

  // Emit
  it('should emit event with data', () => {
    const eventName = 'userCreated';
    const eventData: User = {username: 'Juanda', visualization: 'player', room_id: '657aebb1ca215a091b8027ae', is_owner: true, is_connected: true, selected_card: -3};
    service.setupSocketConnection(room);

    const emitSpy = jest.spyOn(service.socket, 'emit');

    service.emit(eventName, eventData);

    expect(emitSpy).toHaveBeenCalledWith(eventName, eventData);
  });


});
