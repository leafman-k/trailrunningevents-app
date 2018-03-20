import React, {PropTypes} from 'react';
import EventCard from './EventCard';

const EventList = ({events}) => {

return (
    <div className="row">
      {events.map(event =>
        <EventCard key={event.id} event={event}/>
      )}
    </div>
  );
};
EventList.propTypes = {
  events: PropTypes.array.isRequired
};
export default EventList;
