import React, {PropTypes} from 'react';
import EventTableRow from './EventTableRow';

const EventTable = ({events, onDelete}) => {

return (
  <table className="table">
    <thead>
    <tr>
      <th>Name</th>
      <th>Location</th>
      <th>Date</th>
      <th>&nbsp;</th>
    </tr>
    </thead>
    <tbody>
       {events.map(event =>
      <EventTableRow key={event.id} event={event} onDelete={onDelete}/>
    )}
    </tbody>
    </table>

  );
};
EventTable.propTypes = {
  events: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default EventTable;
