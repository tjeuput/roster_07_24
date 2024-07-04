import React, { Component} from 'react';
import * as dayjsLocale from 'dayjs/locale/de';
import * as antdLocale from 'antd/locale/de_DE';
import { invoke } from '@tauri-apps/api/tauri';
import { Scheduler, SchedulerData, ViewType, wrapperFun } from 'react-big-schedule';

import "react-big-schedule/dist/css/style.css";

const today = new Date();
const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const MemoizedScheduler = React.memo(({ viewModel, handlers }) => (
  <Scheduler
    schedulerData={viewModel}
    prevClick={handlers.prevClick}
    nextClick={handlers.nextClick}
    onSelectDate={handlers.onSelectDate}
    onViewChange={handlers.onViewChange}
    eventItemClick={handlers.eventClicked}
    viewEventClick={handlers.ops1}
    viewEventText="Ops 1"
    viewEvent2Text="Ops 2"
    viewEvent2Click={handlers.ops2}
    updateEventStart={handlers.updateEventStart}
    updateEventEnd={handlers.updateEventEnd}
    moveEvent={handlers.moveEvent}
    newEvent={handlers.newEvent}
    onScrollLeft={handlers.onScrollLeft}
    onScrollRight={handlers.onScrollRight}
    onScrollTop={handlers.onScrollTop}
    onScrollBottom={handlers.onScrollBottom}
    toggleExpandFunc={handlers.toggleExpandFunc}
  />
));

class Basic extends Component {
  constructor(props) {
    super(props);

    const schedulerData = new SchedulerData(formattedDate, ViewType.Year, false, false, {
      dayMaxEvents: 99,
      weekMaxEvents: 9669,
      monthMaxEvents: 9669,
      quarterMaxEvents: 6599,
      yearMaxEvents: 9956,
      customMaxEvents: 9965,
      eventItemPopoverTrigger: 'click',
      schedulerContentHeight: '600px',
      schedulerWidth: '85%',
      yearResourceTableWidth: 100,
      yearCellWidth: 50,
    });

    schedulerData.setSchedulerLocale(dayjsLocale);
    schedulerData.setCalendarPopoverLocale(antdLocale);

    this.state = {
      viewModel: schedulerData,
      resources: [],
      events: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await invoke("get_table_schedule");
      const data = JSON.parse(response);
      if (Array.isArray(data.resources) && Array.isArray(data.events)) {
        const { viewModel } = this.state;
        viewModel.setResources(data.resources);
        viewModel.setEvents(data.events);
        this.setState({ viewModel });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(this.state.events);
    this.setState({
      viewModel: schedulerData
    });
  }

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(this.state.events);
    this.setState({
      viewModel: schedulerData
    });
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(this.state.events);
    this.setState({
      viewModel: schedulerData
    });
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(this.state.events);
    this.setState({
      viewModel: schedulerData
    });
  }

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
  }

  ops1 = (schedulerData, event) => {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
  }

  ops2 = (schedulerData, event) => {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
  }

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if (confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)) {
      let newFreshId = 0;
      schedulerData.events.forEach(item => {
        if (item.id >= newFreshId) newFreshId = item.id + 1;
      });

      const newEvent = {
        id: newFreshId,
        title: 'New event you just created',
        start,
        end,
        resourceId: slotId,
        bgColor: 'purple',
      };
      schedulerData.addEvent(newEvent);
      this.setState({
        viewModel: schedulerData,
      });
    }
  }

  updateEventStart = (schedulerData, event, newStart) => {
    schedulerData.updateEventStart(event, newStart);
    this.setState({
      viewModel: schedulerData
    });
  }

  updateEventEnd = (schedulerData, event, newEnd) => {
    schedulerData.updateEventEnd(event, newEnd);
    this.setState({
      viewModel: schedulerData
    });
  }

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}}`)) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      this.setState({
        viewModel: schedulerData,
      });
    }
  }

  onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewType.Day) {
      schedulerData.next();
      schedulerData.setEvents(this.state.events);
      this.setState({
        viewModel: schedulerData,
      });

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  }

  onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewType.Day) {
      schedulerData.prev();
      schedulerData.setEvents(this.state.events);
      this.setState({
        viewModel: schedulerData,
      });

      schedulerContent.scrollLeft = 10;
    }
  }

  onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollTop');
  }

  onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollBottom');
  }

  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
      viewModel: schedulerData,
    });
  }

  render() {
    const { viewModel } = this.state;
    const handlers = {
      prevClick: this.prevClick,
      nextClick: this.nextClick,
      onSelectDate: this.onSelectDate,
      onViewChange: this.onViewChange,
      eventClicked: this.eventClicked,
      ops1: this.ops1,
      ops2: this.ops2,
      newEvent: this.newEvent,
      updateEventStart: this.updateEventStart,
      updateEventEnd: this.updateEventEnd,
      moveEvent: this.moveEvent,
      onScrollLeft: this.onScrollLeft,
      onScrollRight: this.onScrollRight,
      onScrollTop: this.onScrollTop,
      onScrollBottom: this.onScrollBottom,
      toggleExpandFunc: this.toggleExpandFunc,
    };

    return (
      <div>
        <div>
          <MemoizedScheduler viewModel={viewModel} handlers={handlers} />
        </div>
      </div>
    );
  }
}

export default wrapperFun(Basic);
