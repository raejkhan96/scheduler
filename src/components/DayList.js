import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
   
  const mapArray = props.days.map((day) => {
    console.log(day)
    return (
      <DayListItem 
    
        key={day.id}
        // name and spots are props required by Daylistitem
        selected = {day.name === props.day}
        name={day.name}
        spots={day.spots}
        setDay={props.setDay}
      />
    )
  })


   return ( 
    <ul>{mapArray}</ul>
   );
}