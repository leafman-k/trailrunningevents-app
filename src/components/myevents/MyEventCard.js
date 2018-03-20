import React, {PropTypes} from 'react';

const MyEventCard = ({myEvent, onCancel}) => {
  console.log("MyEvent card:" + Object.values(myEvent));
  return (
    <div className="col-xs-12, col-sm-6">
      <div className="panel panel-default">
        <div className="panel-heading">{myEvent.eventName}</div>
        <div className="panel-body">
           <div className="row">
              <div className="col-xs-6">
                Date: {myEvent.eventDate}
              </div>
              <div className="col-xs-6">
                Location: {myEvent.location}
              </div>
              <div className="col-xs-6">
                Division: {myEvent.division}
              </div>
              <div className="col-xs-6">
                Distance: {myEvent.distance}
              </div>
              <div className="col-xs-6">
                Fee: {myEvent.fee}
              </div>
              <div className="col-xs-12"></div>
               <div className="col-xs-6">
                 <button onClick={onCancel} data-id={myEvent.eventId} className="btn btn-default btn-sm">Cancel</button>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};
MyEventCard.propTypes = {
  myEvent: PropTypes.object.isRequired,
  onCancel: PropTypes.func
};
export default MyEventCard;
