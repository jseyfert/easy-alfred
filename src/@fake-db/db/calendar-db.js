import mock from './../mock';
import {FuseUtils} from '@fuse';

const calendarDB = {
    events: [
        {
            id    : 1,
            title : 'Current Trip',
            allDay: false,
            start : new Date(2018, 3, 7),
            end   : new Date(2018, 3, 10)
        },
        {
            id    : 13,
            title : 'Upcoming Trip',
            allDay: false,
            start : new Date(2018, 3, 20, 19, 30, 0),
            end   : new Date(2018, 3, 22, 2, 0, 0)
        }
    ]
};

mock.onGet('/api/calendar-app/events').reply((config) => {
    return [200, calendarDB.events];
});

mock.onPost('/api/calendar-app/add-event').reply((request) => {
    const data = JSON.parse(request.data);
    calendarDB.events = [
        ...calendarDB.events, {
            ...data.newEvent,
            id: FuseUtils.generateGUID()
        }
    ];
    return [200, calendarDB.events];
});

mock.onPost('/api/calendar-app/update-event').reply((request) => {
    const data = JSON.parse(request.data);

    calendarDB.events = calendarDB.events.map((event) => {
        if ( data.event.id === event.id )
        {
            return data.event
        }
        return event
    });

    return [200, calendarDB.events];
});

mock.onPost('/api/calendar-app/remove-event').reply((request) => {
    const data = JSON.parse(request.data);

    calendarDB.events = calendarDB.events.filter((event) => data.eventId !== event.id);

    return [200, calendarDB.events];
});
