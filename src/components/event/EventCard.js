import React, {PropTypes} from 'react';
import {Link} from 'react-router';
const EventCard = ({event, register}) => {

  return (
    <div className="col-xs-12, col-sm-6">
      <div className="panel panel-default">
        <div className="panel-heading">{event.name}</div>
        <div className="panel-body">
           <div className="row">
              <div className="col-xs-6">
                Date: {event.date}
              </div>
              <div className="col-xs-6">
                Location: {event.location}
              </div>
              <div className="col-xs-6">
                Division(s): {event.division.join(", ")}
              </div>
              <div className="col-xs-6">
                Distance: {event.distance.join(", ")}
              </div>
              <div className="col-xs-6">
                Fee: {event.fee}
              </div>
              <div className="col-xs-6">
                Available: {event.available}
              </div>
              <div className="col-xs-12"></div>
               <div className="col-xs-6">
                 <Link to={'/registration/' + event.id} className="btn btn-primary btn-sm">Register</Link>
               </div>
           </div>
        </div>
      </div>
    </div>
  );

};
EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  register: PropTypes.func
};
export default EventCard;
