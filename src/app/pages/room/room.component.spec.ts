import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RoomComponent } from './room.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserModalComponent } from '../../components/templates/user-modal/user-modal.component';
import { Room } from 'src/app/interfaces/room.interface';
import { HttpService } from '../../services/http-service/http-service.service';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { User } from 'src/app/interfaces/user.interface';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let route: ActivatedRoute;
  let dialog: MatDialog;
  let service: HttpService;
  let httpMock: HttpTestingController;
  let socketService: WebSocketService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id_room: 'testId' }),
          },
        },
        {
          provide: MatDialogRef,
          useValue: {
            afterClosed: () => of('testId')
          }
        },
      ],
    });
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    route = TestBed.inject(ActivatedRoute);
    dialog = TestBed.inject(MatDialog);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpService);
    socketService = TestBed.inject(WebSocketService);
    router = TestBed.inject(Router);
  });

  // ngOnInit
  test('ngOnInit: should call route and create user', (done) => {
    const spy1 = jest.spyOn(component, 'validateRoom');
    const spy2 = jest.spyOn(component, 'createUser');

    component.ngOnInit();
    route.params.subscribe((params) => {
      expect(params['id_room']).toEqual('testId');
      expect(spy1).toHaveBeenCalled();
      done();
    });
    expect(spy2).toHaveBeenCalled();
  });

  // createUser
  test('createUser: should open dialogRef', () => {
    const spy = jest.spyOn(dialog, 'open');
    component.createUser();
    expect(spy).toHaveBeenLastCalledWith(UserModalComponent, {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'user-modal',
      backdropClass: 'blur-backdrop',
      disableClose: true,
      data: { room_id: component.idRoom },
    });
  });

  // validateRoom
  test('validateRoom: should call httpService and setupSocketConnection', () => {
    const mockRoom: Room = {
      _id: 'testId',
      tittle: 'testName',
      owner: 'testOwner',
      averageScore: -1,
      players: [],
    };
    component.idRoom = 'testId';
    const spy1 = jest
      .spyOn(service, 'findRoomById')
      .mockReturnValue(of(mockRoom));
    const spy2 = jest.spyOn(socketService, 'setupSocketConnection');

    component.validateRoom();
    const req = httpMock.expectOne('http://localhost:3000/api/room/testId');
    req.flush(mockRoom);

    expect(req.request.method).toBe('GET');
    expect(spy1).toHaveBeenCalled();
    expect(component.room).toEqual(mockRoom);
    expect(spy2).toHaveBeenCalledWith(mockRoom);
  });

  test('validateRoom: should only call httpService', () => {
    component.idRoom = 'testI';
    const spy1 = jest.spyOn(service, 'findRoomById');
    const spy2 = jest.spyOn(socketService, 'setupSocketConnection');
    const spy3 = jest.spyOn(router, 'navigateByUrl');

    component.validateRoom();
    const req = httpMock.expectOne('http://localhost:3000/api/room/testId');
    req.error(new ErrorEvent('error'));

    expect(req.request.method).toBe('GET');
    expect(spy1).toHaveBeenCalled();
    expect(component.room).toEqual(undefined);
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).toHaveBeenCalledWith('**');
  });

  // allPlayersSelectedCard
  test('allPlayersSelectedCard: should return true', () => {
    const mockPlayers: User[] = [
      {
        room_id: 'testId',
        username: 'juan',
        visualization: 'player',
        selected_card: 1,
        is_owner: true,
      },
      {
        room_id: 'testId',
        username: 'pedro',
        visualization: 'player',
        selected_card: 5,
        is_owner: false,
      },
      {
        room_id: 'testId',
        username: 'jose',
        visualization: 'player',
        selected_card: -1,
        is_owner: false,
      },
      {
        room_id: 'testId',
        username: 'maria',
        visualization: 'spectator',
        selected_card: 3,
        is_owner: false,
      },
    ];
    component.players = mockPlayers;
    const res = component.allPlayersSelectedCard();
    expect(res).toBeTruthy();
  });

  test('allPlayersSelectedCard: should return false', () => {
    const mockPlayers: User[] = [
      {
        room_id: 'testId',
        username: 'juan',
        visualization: 'player',
        selected_card: 1,
        is_owner: true,
      },
      {
        room_id: 'testId',
        username: 'pedro',
        visualization: 'player',
        selected_card: 5,
        is_owner: false,
      },
      {
        room_id: 'testId',
        username: 'jose',
        visualization: 'player',
        selected_card: -3,
        is_owner: false,
      },
      {
        room_id: 'testId',
        username: 'maria',
        visualization: 'spectator',
        selected_card: 3,
        is_owner: false,
      },
    ];
    component.players = mockPlayers;
    const res = component.allPlayersSelectedCard();
    expect(res).toBeFalsy();
  });

  // activateCountingOrReveal

  test('activateCountingOrReveal: should set isRevealable to true', () => {
    const mockPlayers: User[] = [
      {
        room_id: 'testId',
        username: 'juan',
        visualization: 'player',
        selected_card: 1,
        is_owner: true,
      },
      {
        room_id: 'testId',
        username: 'pedro',
        visualization: 'player',
        selected_card: 5,
        is_owner: false,
      },
      {
        room_id: 'testId',
        username: 'jose',
        visualization: 'player',
        selected_card: -1,
        is_owner: false,
      },
      {
        room_id: 'testId',
        username: 'maria',
        visualization: 'spectator',
        selected_card: 3,
        is_owner: false,
      },
    ];
    component.players = mockPlayers;
    component.user = mockPlayers[0];
    component.activateCountingOrReveal();
    expect(component.isRevealable).toBeTruthy();
    expect(component.countingVotes).toBeFalsy();
  });

  test('activateCountingOrReveal: should set countingVotes to true', () => {
    const mockPlayers: User[] = [
      {
        room_id: 'testId',
        username: 'juan',
        visualization: 'player',
        selected_card: 1,
        is_owner: false,
      },
      {
        room_id: 'testId',
        username: 'pedro',
        visualization: 'player',
        selected_card: 5,
        is_owner: true,
      },
      {
        room_id: 'testId',
        username: 'jose',
        visualization: 'player',
        selected_card: -1,
        is_owner: false,
      },
      {
        room_id: 'testId',
        username: 'maria',
        visualization: 'spectator',
        selected_card: 3,
        is_owner: false,
      },
    ];
    component.players = mockPlayers;
    component.user = mockPlayers[0];
    component.activateCountingOrReveal();
    expect(component.countingVotes).toBeTruthy();
    expect(component.isRevealable).toBeFalsy();
  });

  // setFirstPosition
  test('setFirstPosition: should set firstPosition to true', () => {
    const mockPlayers: User[] = [
      {
        _id: 'testId1',
        username: 'pedro',
        visualization: 'player',
        selected_card: 5,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId2',
        username: 'jose',
        visualization: 'player',
        selected_card: -1,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId3',
        username: 'juan',
        visualization: 'player',
        selected_card: 1,
        is_owner: true,
        room_id: 'roomID',
      },
      {
        _id: 'testId4',
        username: 'maria',
        visualization: 'spectator',
        selected_card: 3,
        is_owner: false,
        room_id: 'roomID',
      },
    ];
    component.user = mockPlayers[2];
    component.players = mockPlayers;

    component.setFirstPosition();

    expect(component.players).toEqual([
      {
        _id: 'testId3',
        username: 'juan',
        visualization: 'player',
        selected_card: 1,
        is_owner: true,
        room_id: 'roomID',
      },
      {
        _id: 'testId1',
        username: 'pedro',
        visualization: 'player',
        selected_card: 5,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId2',
        username: 'jose',
        visualization: 'player',
        selected_card: -1,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId4',
        username: 'maria',
        visualization: 'spectator',
        selected_card: 3,
        is_owner: false,
        room_id: 'roomID',
      },
    ]);
  });

  // exists
  test('exists: should return false because is not match with mockUser._id', () => {
    const mockPlayers: User[] = [
      {
        _id: 'testId1',
        username: 'pedro',
        visualization: 'player',
        selected_card: 5,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId2',
        username: 'jose',
        visualization: 'player',
        selected_card: -1,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId3',
        username: 'juan',
        visualization: 'player',
        selected_card: 1,
        is_owner: true,
        room_id: 'roomID',
      },
      {
        _id: 'testId4',
        username: 'maria',
        visualization: 'spectator',
        selected_card: 3,
        is_owner: false,
        room_id: 'roomID',
      },
    ];
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

  test('exists: should return true because is match with mockUser._id', () => {
    const mockPlayers: User[] = [
      {
        _id: 'testId1',
        username: 'pedro',
        visualization: 'player',
        selected_card: 5,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId2',
        username: 'jose',
        visualization: 'player',
        selected_card: -1,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId3',
        username: 'juan',
        visualization: 'player',
        selected_card: 1,
        is_owner: true,
        room_id: 'roomID',
      },
      {
        _id: 'testId123',
        username: 'maria',
        visualization: 'spectator',
        selected_card: 3,
        is_owner: false,
        room_id: 'roomID',
      },
    ];
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

    expect(existUser).toBeTruthy();
  });

  test('getUser: should return user in localstorage', () => {
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
  test('onCardSelected: should set selected_card in user', () => {
    const mockPlayers: User[] = [
      {
        _id: 'testId1',
        username: 'pedro',
        visualization: 'player',
        selected_card: 5,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId2',
        username: 'jose',
        visualization: 'player',
        selected_card: -1,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId3',
        username: 'juan',
        visualization: 'player',
        selected_card: 1,
        is_owner: true,
        room_id: 'roomID',
      },
      {
        _id: 'testId123',
        username: 'maria',
        visualization: 'spectator',
        selected_card: 3,
        is_owner: false,
        room_id: 'roomID',
      },
    ];
    component.players = mockPlayers;
    const spy = jest
      .spyOn(component, 'activateCountingOrReveal')
      .mockReturnValue();
    component.onCardSelected({ idUser: 'testId123', cardSelected: 13 });
    expect(component.players[3].selected_card).toBe(13);
    expect(spy).toHaveBeenCalled();
  });

  // restart
  // it('should call restart', (done) => {
  //   const dialogRefMock = {
  //     afterClosed: jest.fn().mockReturnValue(of('testId')),
  //     close: jest.fn()
  //   };
  //   const spy1 = jest.spyOn(component.dialog, 'open').mockReturnValue(dialogRefMock as any);
  //   const spy2 = jest.spyOn(socketService, 'emit');

  //   component.restart();
  //   dialogRefMock.close();

  //   expect(spy1).toHaveBeenCalled();


  //   dialogRefMock.afterClosed().subscribe((idUser: string) => {
  //     expect(spy2).toHaveBeenCalledWith('restart', idUser);
  //     expect(component.isAvaliableToRestart).toBe(false);
  //     expect(component.isRevealable).toBe(false);
  //     expect(component.cardsSelected).toEqual([]);
  //     expect(component.countingVotes).toBe(false);
  //     done();
  //   });
  // });

  // revealCards
  test('revealCards: should emit reveald cards', () => {
    const mockPlayers: User[] = [
      {
        _id: 'testId1',
        username: 'pedro',
        visualization: 'player',
        selected_card: 5,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId2',
        username: 'jose',
        visualization: 'player',
        selected_card: -1,
        is_owner: false,
        room_id: 'roomID',
      },
      {
        _id: 'testId3',
        username: 'juan',
        visualization: 'player',
        selected_card: 1,
        is_owner: true,
        room_id: 'roomID',
      },
      {
        _id: 'testId123',
        username: 'maria',
        visualization: 'spectator',
        selected_card: 3,
        is_owner: false,
        room_id: 'roomID',
      },
    ];
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

});
