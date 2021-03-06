import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";


export default function DayListItem(props) {
  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full":  !props.spots
  });
  
  const formatSpots = function() {
    if (props.spots === 0) {
      return 'no spots remaining';
    } else if (props.spots === 1) {
      return '1 spot remaining';
    } else{
      return `${props.spots} spots remaining`;
    }
  };
  console.log(props.name)
  return (
    // for cypress testing, add prop: data-testid="day" on line 25
    <li className={dayClass} onClick={() => props.setDay(props.name)} >
      <h2>{props.name}</h2>
      <h4>{formatSpots()}</h4>
    </li>
  );
}