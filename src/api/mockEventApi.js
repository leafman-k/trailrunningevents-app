import delay from './delay';

const events = [
  {
    id: 1,
    name: 'Bodom trails',
    www: 'http://example.com',
    date: '5.5.2018',
    location: 'Espoo',
    available: '100',
    division: ['male','female'],
    distance: ['21km', '9km'],
    fee: '5 €'
  },
  {
    id: 2,
    name: 'Karhunkierros trails',
    www: 'http://example.com',
    date: '15.5.2018',
    location: 'Kuusamo',
    available: '50',
    division: ['male','female'],
    distance: ['42km', '21km'],
    fee: '5 €'
  },
  {
    id: 3,
    name: 'Pallas trails',
    www: 'http://example.com',
    date: '15.6.2018',
    location: 'Kittilä',
    available: '50',
    division: ['male','female'],
    distance: ['62km', '30km'],
    fee: '5 €'
  },
  {
    id: 4,
    name: 'Sokosti trails',
    www: 'http://example.com',
    date: '5.5.2018',
    location: 'Inari',
    available: '100',
    division: ['male','female'],
    distance: ['21km', '9km'],
    fee: '5 €'
  },
  {
    id: 5,
    name: 'Muotka trails',
    www: 'http://example.com',
    date: '15.5.2018',
    location: 'Ivalo',
    available: '50',
    division: ['male','female'],
    distance: ['42km', '21km'],
    fee: '5 €'
  },
  {
    id: 6,
    name: 'Ylläs trails',
    www: 'http://example.com',
    date: '15.6.2018',
    location: 'Kittilä',
    available: '50',
    division: ['male','female'],
    distance: ['62km', '30km'],
    fee: '5 €'
  },
  {
    id: 7,
    name: 'Seitseminen trails',
    www: 'http://example.com',
    date: '5.5.2018',
    location: 'Nokia',
    available: '100',
    division: ['male','female'],
    distance: ['21km', '9km'],
    fee: '5 €'
  },
  {
    id: 8,
    name: 'Karhunkierros trails',
    www: 'http://example.com',
    date: '15.5.2018',
    location: 'Kuusamo',
    available: '50',
    division: ['male','female'],
    distance: ['42km', '21km'],
    fee: '5 €'
  },
  {
    id: 9,
    name: 'Pallas trails',
    www: 'http://example.com',
    date: '15.6.2018',
    location: 'Kittilä',
    available: '50',
    division: ['male','female'],
    distance: ['62km', '30km'],
    fee: '5 €'
  },
  {
    id: 10,
    name: 'Bodom trails',
    www: 'http://example.com',
    date: '5.5.2018',
    location: 'Espoo',
    available: '100',
    division: ['male','female'],
    distance: ['21km', '9km'],
    fee: '5 €'
  },
  {
    id: 11,
    name: 'Karhunkierros trails',
    www: 'http://example.com',
    date: '15.5.2018',
    location: 'Kuusamo',
    available: '50',
    division: ['male','female'],
    distance: ['42km', '21km'],
    fee: '5 €'
  },
  {
    id: 12,
    name: 'Pallas trails',
    www: 'http://example.com',
    date: '15.6.2018',
    location: 'Kittilä',
    available: '50',
    division: ['male','female'],
    distance: ['62km', '30km'],
    fee: '5 €'
  }

];
class EventApi {
  static getAllEvents() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], events));
      }, delay);
    });
  }
  static saveEvent(event) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO Simulate server-side validation
        if (event.id != 0) {
        const existingCourseIndex = events.findIndex(a => a.id == event.id);
        events.splice(existingCourseIndex, 1, event);
      } else {
        event.id = events.length + 1;
        events.push(event);
      }
        resolve(event);
      }, delay);
    });
  }
}
export default EventApi;
