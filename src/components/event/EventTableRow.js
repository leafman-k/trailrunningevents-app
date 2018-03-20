import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const EventTableRow = ({event, onDelete}) => {
  return (
    <tr>
      <td><Link to={'/event/' + event.id}> {event.name}</Link></td>
      <td>{event.location}</td>
      <td>{event.date}</td>
      <td><button onClick={onDelete} data-id={event.eventId} className="btn btn-default glyphicon glyphicon-trash"></button></td>
    </tr>
  );
};

EventTableRow.propTypes = {
  event: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default EventTableRow;
