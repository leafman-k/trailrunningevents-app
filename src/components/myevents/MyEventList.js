import React, {PropTypes} from 'react';
import MyEventCard from './MyEventCard';

const MyEventList = ({myEvents, onCancel}) => {

  return (
    <div className="row">
      {myEvents.map(myevent =>
        <MyEventCard key={myevent.eventId} myEvent={myevent} onCancel={onCancel}/>
      )}
    </div>
  );
};
MyEventList.propTypes = {
  myEvents: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired
};
export default MyEventList;
