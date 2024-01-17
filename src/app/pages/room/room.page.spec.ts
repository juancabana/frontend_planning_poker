/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { RoomComponent } from './room.page';
import { HttpService } from '../../services/http-service/http-service.service';
import { Room } from '../../interfaces/room.interface';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { User } from 'src/app/interfaces/user.interface';
import { UserModalComponent } from '../../components/templates/user-modal/user-modal.template';
import { CardSelected } from 'src/app/interfaces/card-selected.interface';
import { AdminModalComponent } from '../../components/templates/admin-modal/admin-modal.template';

describe('RoomComponent', () => {
  let fixture: ComponentFixture<RoomComponent>;
  let component: RoomComponent;
  let service: HttpService;
  let socketService: WebSocketService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { afterClosed: () => of('testId') },
        }
      ],
    });
  });

  beforeEach(() => {
    jest.spyOn(RoomComponent.prototype, 'ngOnInit').mockImplementationOnce(() => {});
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HttpService);
    socketService = TestBed.inject(WebSocketService);
    dialog = TestBed.inject(MatDialog);
  });

  // ngOnInit
  it('ngOnInit: should call setupSocketConnection, and createUser methods', () => {
    const mockRoom: Room = {_id: '1234', tittle: 'Sprint 32', averageScore: -3, owner: '123', players: [] };
    const spy1 = jest.spyOn(service, 'getRoom').mockReturnValue(mockRoom);
    const spy2 = jest.spyOn(socketService, 'setupSocketConnection').mockImplementation();
    const spy3 = jest.spyOn(component, 'createUser').mockImplementation();
    component.ngOnInit();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(component.room).toEqual(mockRoom);
    expect(spy2).toHaveBeenCalledWith(mockRoom);
    expect(spy3).toHaveBeenCalledTimes(1);
  });

  // createUser
  it('createUser: open create user Dialod', () => {
    const mockUser: User = {
      room_id: '123',
      username: 'Juan',
      visualization: 'player',
    };
    const spy1 = jest.spyOn(component, 'openCreateUserDialog').mockImplementation(() => {
        return {
          afterClosed: () => of(null),
        } as MatDialogRef<UserModalComponent>;
      });
    const spy2 = jest.spyOn(component, 'getUser').mockReturnValue(mockUser);
    const spy3 = jest.spyOn(component, 'listenNewUser').mockImplementation();
    const spy4 = jest.spyOn(component, 'listenCardSelected').mockImplementation();
    const spy5 = jest.spyOn(component, 'getPlayersInCache').mockImplementation();
    const spy6 = jest.spyOn(component, 'listenCardsRevealed').mockImplementation();
    const spy7 = jest.spyOn(component, 'listenRestartGame').mockImplementation();
    component.createUser();
    expect(component.userHost).toEqual(mockUser);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(component.userHost).toEqual(mockUser);
    expect(spy3).toHaveBeenCalledTimes(1);
    expect(spy4).toHaveBeenCalledTimes(1);
    expect(spy5).toHaveBeenCalledTimes(1);
    expect(spy6).toHaveBeenCalledTimes(1);
    expect(spy7).toHaveBeenCalledTimes(1);
  });

  // // openCreateUserDialog
  it('openCreateUserDialog: should open dialogRef', () => {
    const mockRoom: Room = { _id: 'id123', tittle: 'Sprint 32', averageScore: -3, owner: '123', players: [] };
    component.room = mockRoom;
    const options = {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'user-modal',
      backdropClass: 'blur-backdrop',
      disableClose: true,
      data: { room_id: 'id123' },
    };
    const spy = jest.spyOn(dialog, 'open').mockImplementation();
    component.openCreateUserDialog();
    expect(spy).toHaveBeenLastCalledWith(UserModalComponent, options);
  });

    // getUser
  it('getUser: should return user in localstorage', () => {
    const mockUser = { _id: 'testId1', username: 'pedro', visualization: 'player', selected_card: 5, is_owner: false, room_id: 'roomID' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    const user = component.getUser();
    expect(user).toEqual(mockUser);
  });

  // // listenNewUser
  it(`listenNewUser: should set new players list`, () => {
    const mockPlayers: User[] = [
      {_id: '1231', room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {room_id: '123', username: 'Santiago', visualization: 'player'},
    ];
    const spy1 = jest.spyOn(socketService, 'listenNewUser').mockReturnValue(of(mockPlayers))
    const spy3 = jest.spyOn(component, 'setFirstPosition').mockImplementation()
    const spy4 = jest.spyOn(component, 'activateCountingOrReveal').mockImplementation()
    component.listenNewUser()
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(component.players).toEqual([...mockPlayers])
    expect(spy3).toHaveBeenCalledTimes(1)
    expect(spy4).toHaveBeenCalledTimes(1)
  });

  // // listenCardSelected
  it(`listenCardSelected: should set new players list`, () => {
    const mockPlayers: User[] = [
      {_id: '1231', room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {room_id: '123', username: 'Santiago', visualization: 'player'},
    ];
    const spy1 = jest.spyOn(socketService, 'listenCardSelected').mockReturnValue(of(mockPlayers))
    const spy3 = jest.spyOn(component, 'setFirstPosition').mockImplementation()
    const spy4 = jest.spyOn(component, 'activateCountingOrReveal').mockImplementation()
    component.listenCardSelected()
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(component.players).toEqual([...mockPlayers])
    expect(spy3).toHaveBeenCalledTimes(1)
    expect(spy4).toHaveBeenCalledTimes(1)
  });

  // listenCardsRevealed
  it('listenCardsRevealed: should emit event and restart cardsSelected and counting Votes', () => {
    const mockCardsRevealed = [
      { value: -1, amount: 1 },
      { value: 13, amount: 2 },
      { value: 58, amount: 1 },
    ];
    const spy = jest.spyOn(socketService, 'listenCardsRevealed').mockReturnValue(of(mockCardsRevealed));
    component.listenCardsRevealed();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.cardsSelected).toEqual(mockCardsRevealed);
    expect(component.countingVotes).toBe(false);
  });

  // listenRestartGame
  it('listenRestartGame: should reset the game settings and set the owner property as the data fetched', () => {
    const mockUser: User = {
      _id: '1231',
      room_id: 'testId',
      username: 'juan',
      visualization: 'player',
    };
    const mockPlayers: User[] = [
      {_id: '1231', is_owner: true, room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {room_id: '123', username: 'Santiago', visualization: 'player'},
    ];
    const spy1 = jest.spyOn(socketService, 'listenRestartGame').mockReturnValue(of(mockPlayers))
    component.userHost = mockUser
    component.listenRestartGame()
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(component.players).toEqual(mockPlayers)
    expect(component.userHost.is_owner).toBe(true)
    expect(component.isAvaliableToRestart).toBe(false)
    expect(component.isRevealable).toBe(false)
    expect(component.revealCardsOrRestartText).toBe('')
    expect(component.cardsSelected).toEqual([])
    expect(component.countingVotes).toBe(false)
  });

  // getPlayersInCache
  it(`getPlayersInCache: should set the users coming from the server and add the host user, because it doesn't exist`, () => {
    const mockUser: User = {
      _id: '1231',
      room_id: 'testId',
      username: 'falcao',
      visualization: 'player',
      is_owner: true,
    };
    const mockPlayers: User[] = [
      {_id: '123', is_owner: true, room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {room_id: '123', username: 'Santiago', visualization: 'player'},
    ];
    const mockRoom: Room = {_id:'id123', tittle: 'Sprint 32', averageScore: -3, owner: '123', players: [] };
    component.userHost = mockUser;
    component.room = mockRoom
    const spy1 = jest.spyOn(service, 'getPlayers').mockReturnValue(of(mockPlayers));
    const spy2 = jest.spyOn(component, 'setFirstPosition').mockImplementation();
    component.getPlayersInCache();
    expect(spy1).toHaveBeenCalledWith('id123');
    expect(component.players).toEqual([mockUser, ...mockPlayers])
    expect(spy2).toHaveBeenCalledTimes(1)
  });

  it(`getPlayersInCache: should only set the users coming from the server because user already exist`, () => {
    const mockUser: User = {
      _id: '1231',
      room_id: 'testId',
      username: 'falcao',
      visualization: 'player',
      is_owner: true,
    };
    const mockPlayers: User[] = [
      {_id: '1231', is_owner: true, room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {room_id: '123', username: 'Santiago', visualization: 'player'},
    ];
    const mockRoom: Room = {_id:'id123', tittle: 'Sprint 32', averageScore: -3, owner: '123', players: [] };
    component.userHost = mockUser;
    component.room = mockRoom
    const spy1 = jest.spyOn(service, 'getPlayers').mockReturnValue(of(mockPlayers));
    const spy2 = jest.spyOn(component, 'setFirstPosition').mockImplementation();
    component.getPlayersInCache();
    expect(spy1).toHaveBeenCalledWith('id123');
    expect(component.players).toEqual(mockPlayers)
    expect(spy2).toHaveBeenCalledTimes(1)
  });

  // exists
  it('exists: should return true because user exists', () => {
    const mockUser: User = {_id: '12345', room_id: '123', username: 'Santiago', visualization: 'player'};
    const mockPlayers: User[] = [
      {_id: '123', is_owner: true, room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {_id: '12345', room_id: '123', username: 'Santiago', visualization: 'player'},
    ];
    const existUser = component.exists(mockUser, mockPlayers);
    expect(existUser).toBe(true)
  });

  it(`exists: should return false because user isn't exists`, () => {
    const mockUser: User = {_id: '12345', room_id: '123', username: 'Santiago', visualization: 'player'};
    const mockPlayers: User[] = [
      {_id: '123', is_owner: true, room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {_id: '1234', room_id: '123', username: 'Santiago', visualization: 'player'},
    ];
    const existUser = component.exists(mockUser, mockPlayers);
    expect(existUser).toBe(false)
  });

  // setFirstPosition
  it('setFirstPosition: should set firstPosition', () => {
    const mockUser: User = {_id: '12345', room_id: '123', username: 'Santiago', visualization: 'player'};
    const mockPlayers: User[] = [
      {_id: '123', is_owner: true, room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {_id: '12345', room_id: '123', username: 'Santiago', visualization: 'player'},
    ];
    component.userHost = mockUser
    component.players = mockPlayers
    component.setFirstPosition()
    expect(component.players[0]._id).toEqual('12345');
  });

  // onCardSelected
  it('onCardSelected: should set selected_card in user', () => {
    const mockData: CardSelected = {idUser: '12345', cardSelected: {id: 2, value: 3, viewValue: '3'}}
    const mockPlayers: User[] = [
      {_id: '12345', is_owner: true, room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {_id: '1234', room_id: '123', username: 'Santiago', visualization: 'player'},
    ];
    component.players = mockPlayers
    const spy = jest.spyOn(component, 'activateCountingOrReveal')
    component.onCardSelected(mockData)
    expect(component.players[0].selected_card).toEqual(mockData.cardSelected)
    expect(spy).toHaveBeenCalledTimes(1)
  });

  // activateCountingOrReveal
  it(`activateCountingOrReveal: shouldn't do any change because allPlayersSelectedCard return false`, () => {
    jest.spyOn(component, 'allPlayersSelectedCard').mockReturnValue(false);
    component.activateCountingOrReveal();
    expect(component.isRevealable).toBe(false)
    expect(component.revealCardsOrRestartText).toBe('')
    expect(component.countingVotes).toBe(false)
  });

  it('activateCountingOrReveal: should set isRevealable to true because user is owner and all players selected card', () => {
    const mockUser: User = {room_id: '123',is_owner: true, username: 'juan', visualization: 'player'}
    component.userHost = mockUser
    jest.spyOn(component, 'allPlayersSelectedCard').mockReturnValue(true);
    component.activateCountingOrReveal();
    expect(component.isRevealable).toBe(true)
    expect(component.revealCardsOrRestartText).toBe('Revelar cartas')
    expect(component.countingVotes).toBe(false)
  });

  it(`activateCountingOrReveal: should set isRevealable to true because user isn't owner and all players selected card`, () => {
    const mockUser: User = {room_id: '123',is_owner: false, username: 'juan', visualization: 'player'}
    component.userHost = mockUser
    jest.spyOn(component, 'allPlayersSelectedCard').mockReturnValue(true);
    component.activateCountingOrReveal();
    expect(component.isRevealable).toBe(false)
    expect(component.revealCardsOrRestartText).toBe('')
    expect(component.countingVotes).toBe(true)
  });

  // allPlayersSelectedCard
  it('allPlayersSelectedCard: should return true because all players selected card', () => {
    const mockPlayers: User[] = [
      {room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {room_id: '123', username: 'Santiago', visualization: 'player', selected_card: { id: 5, value: 13, viewValue: '13'}},
    ];
    component.players = mockPlayers;
    const res = component.allPlayersSelectedCard();
    expect(res).toBe(true)
  });

  it(`allPlayersSelectedCard: should return false because not all players selected card`, () => {
    const mockPlayers: User[] = [
      {room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {room_id: '123', username: 'Santiago', visualization: 'player'},
    ];
    component.players = mockPlayers;
    const res = component.allPlayersSelectedCard();
    expect(res).toBe(false)
  });

  // revealCards
  it('revealCards: should emit reveald cards', () => {
    const mockPlayers: User[] = [
      {_id: '123', room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      { room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {_id: '12345', room_id: '123', username: 'Santiago', visualization: 'player', selected_card: { id: 7 , value: 34, viewValue: '34'}},
      {_id: '1252', room_id: '123', username: 'Fabian', visualization: 'player', selected_card: { id: 10 , value: -1, viewValue: '?'}}
    ];
    const cardsExpected = [
      { value: 0, amount: 1 },
      { value: 34, amount: 1 },
      { value: -1, amount: 1 },
    ];
    component.players = mockPlayers;
    const spy = jest.spyOn(socketService, 'emit').mockReturnValue();
    component.revealCards();
    expect(spy).toHaveBeenCalledWith('reveal-cards', cardsExpected);
    expect(component.cardsSelected).toEqual(cardsExpected)
    expect(component.isRevealable).toBe(false)
    expect(component.isAvaliableToRestart).toBe(true)
    expect(component.revealCardsOrRestartText).toBe('Nueva votación')
  });

  // restart
  it('restart: should reset config and set this user as owner', () => {
    const mockIdUser = '1234'
    const mockPlayers: User[] = [
      {_id: '12345', room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}},
      {_id: '1245', room_id: '123', username: 'Daniel', visualization: 'spectator' },
      {_id: '1234', room_id: '123', username: 'Santiago', visualization: 'player'},
    ];
    const mockUser: User = {_id: '12345', room_id: '123', username: 'juan', visualization: 'player', selected_card: { id: 0, value: 0, viewValue: '0'}}
    const config = {
      data: mockPlayers,
      disableClose: true,
      panelClass: 'admin-modal',
    };
    const spy1 = jest.spyOn(dialog, 'open').mockImplementation(() => {
      return {
        afterClosed: () => of(mockIdUser)
      } as MatDialogRef<AdminModalComponent>
    })
    component.players = mockPlayers
    component.userHost = mockUser
    const spy2 = jest.spyOn(socketService, 'emit').mockImplementation()
    component.restart()
    expect(spy1).toHaveBeenCalledWith(AdminModalComponent, config)
    expect(spy2).toHaveBeenCalledWith('restart', mockIdUser)
    expect(component.isAvaliableToRestart).toBe(false)
    expect(component.isRevealable).toBe(false)
    expect(component.revealCardsOrRestartText).toBe('')
    expect(component.cardsSelected).toEqual([])
    expect(component.countingVotes).toBe(false)
    expect(component.userHost.selected_card).toBeFalsy()
    expect(component.userHost.is_owner).toBe(false)
    component.players.forEach((player) => {
      expect(player.selected_card).toBeFalsy()
      if (player._id == '1234') expect(player.is_owner).toBe(true)
    })
  })

  // revealCardsOrRestart
  it('revealCardsOrRestart: should call restart method', () => {
    const spy1 = jest.spyOn(component, 'restart').mockImplementation()
    const spy2 = jest.spyOn(component, 'revealCards').mockImplementation()
    component.isAvaliableToRestart = true
    component.revealCardsOrRestart()
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).not.toHaveBeenCalled()
  })

  it('revealCardsOrRestart: should call revealCards method', () => {
    const spy1 = jest.spyOn(component, 'restart').mockImplementation()
    const spy2 = jest.spyOn(component, 'revealCards').mockImplementation()
    component.isAvaliableToRestart = false
    component.revealCardsOrRestart()
    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).toHaveBeenCalledTimes(1)
  })

});
