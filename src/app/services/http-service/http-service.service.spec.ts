import { TestBed } from '@angular/core/testing';

import { HttpService } from './http-service.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/interfaces/user.interface';


describe('HttpServiceService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // proporciona HttpClient
      providers: [HttpService],
    });
    service = TestBed.inject(HttpService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

    // Create room
    test('services - http-service - have to get ', (done) => {
      service.createNewRoom('Sprint 90').subscribe(room => {
        expect(room.tittle).toBe('Sprint 90');
        localStorage.setItem('room_id-1', room._id);
        done()
      })
    });

    test('services - http-service - have to get ', (done) => {
      service.createNewRoom('Sprint 67').subscribe(room => {
        expect(room.tittle).toBe('Sprint 67');
        localStorage.setItem('room_id-2', room._id);
        done()
      })
    });

  // Find room by id
  test('services - http-service - have to get ', (done) => {
    const idRoom = localStorage.getItem('room_id-1')!;
    service.findRoomById(idRoom).subscribe((room) => {
      expect(room.tittle).toBe('Sprint 90');
      done();
    });
  });

  test('services - http-service - have to get ', (done) => {
    const idRoom = localStorage.getItem('room_id-2')!;
    service.findRoomById(idRoom).subscribe((room) => {
      expect(room.tittle).toBe('Sprint 67');
      done();
    });
  });

  // Create user
  test('services - http-service - createUser', (done) => {
    const idRoom = localStorage.getItem('room_id-1')!;
    const dummyUser: User = { username: 'Juanda', visualization: 'player', room_id: idRoom };

    service.createUser(dummyUser).subscribe(user => {
      expect(user.username).toEqual(dummyUser.username)
      done();
    });
  });

  test('services - http-service - createUser', (done) => {
    const idRoom = localStorage.getItem('room_id-1')!;
    const dummyUser: User = { username: 'Daniel', visualization: 'spectator', room_id: idRoom };

    service.createUser(dummyUser).subscribe(user => {
      expect(user.username).toEqual(dummyUser.username);
      done();
    });
  });

  // Get players
  test('services - http-service - getPlayers', (done) => {
    const idRoom = localStorage.getItem('room_id-1')!;

    service.getPlayers(idRoom).subscribe(players => {
      expect(players.length).toBe(2);
      expect(players[0].username).toEqual('Juanda');
      expect(players[1].username).toEqual('Daniel');

      done();
    });
  });

  // Get cards
  test('services - http-service - getCards', (done) => {
    service.getCards().subscribe(cards => {
      expect(cards.length).toBe(12);
      // expect(cards[0].viewValue).toEqual('0');
      // expect(cards[3].viewValue).toEqual('5');
      // expect(cards[5].viewValue).toEqual('13');
      // expect(cards[11].viewValue).toEqual('☕');

      done();
    });
  });


});
