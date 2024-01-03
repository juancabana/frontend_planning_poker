import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { of, throwError } from 'rxjs';


import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { HttpService } from '../../services/http-service/http-service.service';

import { UserModalComponent } from '../../components/templates/user-modal/user-modal.template';
import { AdminModalComponent } from '../../components/templates/admin-modal/admin-modal.template';
import { RoomComponent } from './room.page';

import { Room } from 'src/app/interfaces/room.interface';
import { User } from 'src/app/interfaces/user.interface';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let dialog: MatDialog;
  let socketService: WebSocketService;
  let service: HttpService
  let mockPlayers: User[];
  const mockRoom: Room = {averageScore: -1, owner: '1234', players: [], tittle: 'Sprint 32', _id: 'id123'}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            afterClosed: () => of('testId'),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialog);
    socketService = TestBed.inject(WebSocketService);
    mockPlayers = [
      {
        _id: '123',
        room_id: 'testId',
        username: 'juan',
        visualization: 'player',
        selected_card: -3,
        is_owner: true,
      },
      {
        _id: '1234',
        room_id: 'testId',
        username: 'pedro',
        visualization: 'player',
        selected_card: -3,
        is_owner: false,
      },
      {
        _id: '12345',
        room_id: 'testId',
        username: 'jose',
        visualization: 'player',
        selected_card: -3,
        is_owner: false,
      },
      {
        _id: '123456',
        room_id: 'testId',
        username: 'maria',
        visualization: 'spectator',
        selected_card: -3,
        is_owner: false,
      },
    ];
    service = TestBed.inject(HttpService)
    component.room = mockRoom
  });

  // ngOnInit
  it('ngOnInit: should set socket connection', () => {

    const spy1 = jest.spyOn(service, 'getRoom').mockReturnValue(mockRoom);
    const spy2 = jest.spyOn(socketService, 'setupSocketConnection');
    const spy3 = jest.spyOn(component, 'createUser');
    component.ngOnInit();
    expect(spy1).toHaveBeenCalled();
    expect(component.room).toEqual(mockRoom)
    expect(spy2).toHaveBeenCalledWith(mockRoom);
    expect(spy3).toHaveBeenCalled()
  });

  // openCreateUserDialog
  it('openCreateUserDialog: should open dialogRef', () => {
    const spy = jest.spyOn(dialog, 'open');
    component.openCreateUserDialog();
    expect(spy).toHaveBeenLastCalledWith(UserModalComponent, {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'user-modal',
      backdropClass: 'blur-backdrop',
      disableClose: true,
      data: { room_id: 'id123' },
    });
  });

  // createUser
  it('createUser: open create user Dialod', () => {
    const mockUser: User = {room_id: '123', username: 'Juan', visualization: 'player'}
    localStorage.setItem('user', JSON.stringify(mockUser))
    jest.spyOn(dialog, 'open').mockReturnValue({afterClosed: () => of([])} as MatDialogRef<UserModalComponent>)
    const spy1 = jest.spyOn(component, 'openCreateUserDialog')
    const spy2 = jest.spyOn(component, 'listenNewUser')
    const spy3 = jest.spyOn(component, 'getPlayersInCache')
    const spy4 = jest.spyOn(component, 'listenCardRevealed')
    const spy5 = jest.spyOn(component, 'listenRestartGame')
    component.createUser();
    expect(component.user).toEqual(mockUser);
    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(spy3).toHaveBeenCalled()
    expect(spy4).toHaveBeenCalled()
    expect(spy5).toHaveBeenCalled()
  });



  // allPlayersSelectedCard
  it('allPlayersSelectedCard: should return true', () => {
    mockPlayers[0].selected_card = 5;
    mockPlayers[1].selected_card = -1;
    mockPlayers[2].selected_card = 13;
    mockPlayers[3].selected_card = -2;
    component.players = mockPlayers;
    const res = component.allPlayersSelectedCard();
    expect(res).toBeTruthy();
  });

  it('allPlayersSelectedCard: should return false', () => {
    mockPlayers[1].selected_card = -2;
    mockPlayers[3].selected_card = 23;
    component.players = mockPlayers;
    const res = component.allPlayersSelectedCard();
    expect(res).toBeFalsy();
  });

  // activateCountingOrReveal
  it('activateCountingOrReveal: should set isRevealable to true because is owner and all players selected card', () => {
    jest.spyOn(component, 'allPlayersSelectedCard').mockReturnValue(true);
    component.players = mockPlayers;
    mockPlayers[0].is_owner = true;
    component.user = mockPlayers[0];
    component.activateCountingOrReveal();
    expect(component.isRevealable).toBeTruthy();
    expect(component.countingVotes).toBeFalsy();
  });

  it(`activateCountingOrReveal: should set isRevealable to false because although is owner, all players didn't selected card`, () => {
    jest.spyOn(component, 'allPlayersSelectedCard').mockReturnValue(false);
    component.players = mockPlayers;
    mockPlayers[0].is_owner = true;
    component.user = mockPlayers[0];
    component.activateCountingOrReveal();
    expect(component.isRevealable).toBeFalsy();
    expect(component.countingVotes).toBeFalsy();
  });

  it(`activateCountingOrReveal: should set isRevealable to false because although all players selected card, isn't owner`, () => {
    jest.spyOn(component, 'allPlayersSelectedCard').mockReturnValue(true);
    component.players = mockPlayers;
    mockPlayers[0].is_owner = false;
    component.user = mockPlayers[0];
    component.activateCountingOrReveal();
    expect(component.isRevealable).toBeFalsy();
    expect(component.countingVotes).toBeTruthy();
  });

  // listenNewUser
  it(`listenNewUser: should add this user because isn't exists`, () => {
    const mockUser: User = {
      _id: '1231',
      room_id: 'testId',
      username: 'juan',
      visualization: 'player',
      selected_card: -3,
      is_owner: true,
    }
    component.user = mockUser
    const spy1 = jest.spyOn(socketService, 'listenNewUser').mockReturnValue(of(mockPlayers))
    const spy2 = jest.spyOn(component, 'activateCountingOrReveal').mockImplementation()
    const spy3 = jest.spyOn(component, 'setFirstPosition').mockImplementation()
    const spy4 = jest.spyOn(component, 'exists').mockReturnValue(false)
    component.listenNewUser()
    expect(component.players).toEqual([{...mockUser}, ...mockPlayers])
    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(spy3).toHaveBeenCalled()
    expect(spy4).toHaveBeenCalled()
  })

  it(`listenNewUser: shouldn't add this user because already exists`, () => {
    const mockUser: User = {
      _id: '123',
      room_id: 'testId',
      username: 'juan',
      visualization: 'player',
      selected_card: -3,
      is_owner: true,
    }
    component.user = mockUser
    const spy1 = jest.spyOn(socketService, 'listenNewUser').mockReturnValue(of([...mockPlayers]))
    const spy2 =  jest.spyOn(component, 'activateCountingOrReveal').mockImplementation()
    const spy3 =  jest.spyOn(component, 'setFirstPosition').mockImplementation()
    const spy4 = jest.spyOn(component, 'exists').mockReturnValue(true)
    component.listenNewUser()
    expect(component.players).toEqual([...mockPlayers])
    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(spy3).toHaveBeenCalled()
    expect(spy4).toHaveBeenCalled()
  })

  // listenRestartGame
  it('listenRestartGame: should restart game config', () => {
    const mockUser: User = {
      _id: '123',
      room_id: 'testId',
      username: 'juan',
      visualization: 'player',
      selected_card: -3,
      is_owner: true,
    }
    component.user = mockUser
    const spy1 = jest.spyOn(socketService, 'listenRestartGame').mockReturnValue(of(mockPlayers))

    component.listenRestartGame()
    component.players.map(player => {
      if (player._id == component.user._id) expect(component.user.is_owner).toBe(player.is_owner)
    })

    expect(spy1).toHaveBeenCalled()
    expect(component.players).toEqual(mockPlayers)
    expect(component.isAvaliableToRestart).toBe(false)
    expect(component.isRevealable).toBe(false)
    expect(component.cardsSelected).toEqual([])
    expect(component.countingVotes).toBe(false)
  })

  // listenCardRevealed
  it('listenCardRevealed: should emit event and restart cardsSelected and counting Votes', () => {
    const mockCardsRevealed = [
      {
        value: -1,
        amount: 1
      },
      {
        value: 13,
        amount: 2
      },
      {
        value: 58,
        amount: 1
      },
    ]
    const spy = jest.spyOn(socketService, 'listenCardRevealed').mockReturnValue(of(mockCardsRevealed))
    component.listenCardRevealed()
    expect(spy).toHaveBeenCalled()
    expect(component.cardsSelected).toEqual(mockCardsRevealed)
    expect(component.countingVotes).toBe(false)
  })

  // getPlayersInCache
  it(`getPlayersInCache: you should set the users coming from the server and add the host user, because it doesn't exist`, () => {
    const mockUser: User = {
      _id: '1237',
      room_id: 'testId',
      username: 'falcao',
      visualization: 'player',
      selected_card: -3,
      is_owner: true,
    };
    jest.spyOn(component, 'setFirstPosition').mockImplementation()
    component.user = mockUser
    component.players.shift()
    const spy = jest.spyOn(service, 'getPlayers').mockReturnValue(of(mockPlayers))
    component.getPlayersInCache();
    expect(spy).toHaveBeenCalledWith('id123')
    expect(component.players).toEqual([mockUser, ...mockPlayers])
  });

  it('getPlayersInCache: should only set the users that come from the server, because the user already exists', () => {
    const mockUser: User = {
      _id: '123',
      room_id: 'testId',
      username: 'juan',
      visualization: 'player',
      selected_card: -3,
      is_owner: true,
    };
    component.user = mockUser
    const spy1 = jest.spyOn(service, 'getPlayers').mockReturnValue(of(mockPlayers))
    const spy2 = jest.spyOn(component, 'setFirstPosition').mockImplementation()
    component.getPlayersInCache();
    expect(spy1).toHaveBeenCalledWith('id123')
    expect(spy2).toHaveBeenCalled()
    expect(component.players).toEqual([...mockPlayers])
  });

  // setFirstPosition
  it('setFirstPosition: should set firstPosition to true', () => {
    component.user = mockPlayers[2];
    component.players = mockPlayers;
    component.setFirstPosition();
    expect(component.players[0]._id).toEqual('12345');
  });

  // exists
  it('exists: should return false because is not match with mockUser._id', () => {
    const mockUser: User = {
      _id: 'testId123',
      username: 'maria',
      visualization: 'spectator',
      selected_card: 3,
      is_owner: false,
      room_id: 'roomID',
    };
    component.players = mockPlayers;
    const existUser = component.exists(mockUser);
    expect(existUser).toBeFalsy();
  });

  it('exists: should return true because is match with mockUser._id', () => {
    const mockUser: User = {
      _id: '123456',
      room_id: 'testId',
      username: 'maria',
      visualization: 'spectator',
      selected_card: -3,
      is_owner: false,
    };
    component.players = mockPlayers;
    const existUser = component.exists(mockUser);
    expect(existUser).toBeTruthy();
  });

  // getUser
  it('getUser: should return user in localstorage', () => {
    const mockUser = {
      _id: 'testId1',
      username: 'pedro',
      visualization: 'player',
      selected_card: 5,
      is_owner: false,
      room_id: 'roomID',
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    const user = component.getUser();
    expect(user).toEqual(mockUser);
  });

  // onCardSelected
  it('onCardSelected: should set selected_card in user', () => {
    component.players = mockPlayers;
    const spy = jest.spyOn(component, 'activateCountingOrReveal').mockImplementation()
    component.onCardSelected({ idUser: '123456', cardSelected: 13 });
    expect(component.players[3].selected_card).toBe(13);
    expect(spy).toHaveBeenCalled();
  });

  // revealCards
  it('revealCards: should emit reveald cards', () => {
    mockPlayers[0].selected_card = 5
    mockPlayers[1].selected_card = -1
    mockPlayers[2].selected_card = 1
    mockPlayers[3].selected_card = 3

    const cardsExpected = [
      { amount: 1, value: '1' },
      { amount: 1, value: '3' },
      { amount: 1, value: '5' },
      { amount: 1, value: '-1' },
    ]
    component.players = mockPlayers;
    const spy = jest.spyOn(socketService, 'emit').mockReturnValue();
    component.revealCards();
    expect(spy).toHaveBeenCalledWith('reveal-cards', cardsExpected);
    expect(component.cardsSelected).toEqual(cardsExpected)
    component.isRevealable = false;
    component.isAvaliableToRestart = true;
  })

  // restart
  it('restart: should call socketService.emit and update properties when restart is called (is owner)', () => {
    const mockUser: User = {
      _id: '123',
      username: 'pedro',
      visualization: 'player',
      selected_card: 5,
      is_owner: false,
      room_id: 'roomID',
    };
    const config = {
      data: mockPlayers,
      disableClose: true,
      panelClass: 'admin-modal',
    };
    const mockIdUser = '123'
    const spy1 = jest.spyOn(dialog, 'open').mockReturnValue({afterClosed: () => of(mockIdUser)} as MatDialogRef<AdminModalComponent>)
    const spy2 = jest.spyOn(socketService, 'emit').mockImplementation()
    component.players = mockPlayers
    component.user = mockUser
    component.restart()
    expect(spy1).toHaveBeenCalledWith(AdminModalComponent, config)
    expect(spy2).toHaveBeenCalledWith('restart', mockIdUser)
    expect(component.isAvaliableToRestart).toBe(false)
    expect(component.isRevealable).toBe(false)
    expect(component.cardsSelected).toEqual([])
    expect(component.countingVotes).toBe(false)

    expect(component.user.is_owner).toBe(true)
  });

  it(`restart: should call socketService.emit and update properties when restart is called (isn't owner)`, () => {
    const mockUser: User = {
      _id: '123',
      username: 'pedro',
      visualization: 'player',
      selected_card: 5,
      is_owner: false,
      room_id: 'roomID',
    };
    const config = {
      data: mockPlayers,
      disableClose: true,
      panelClass: 'admin-modal',
    };
    const mockIdUser = '1235'
    const spy1 = jest.spyOn(dialog, 'open').mockReturnValue({afterClosed: () => of(mockIdUser)} as MatDialogRef<AdminModalComponent>)
    const spy2 = jest.spyOn(socketService, 'emit').mockImplementation()
    component.players = mockPlayers
    component.user = mockUser
    component.restart()
    expect(spy1).toHaveBeenCalledWith(AdminModalComponent, config)
    expect(spy2).toHaveBeenCalledWith('restart', mockIdUser)
    expect(component.isAvaliableToRestart).toBe(false)
    expect(component.isRevealable).toBe(false)
    expect(component.cardsSelected).toEqual([])
    expect(component.countingVotes).toBe(false)
    expect(component.user.is_owner).toBe(false)
  });
});
