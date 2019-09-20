import { Event, Freq, Alarm } from './event';
import { dayEN } from './mock-day';
import * as Calendar from './calendar';

function timeAdapter(oriDate: Date, time: string, day: number, week: number): Date {
    let date = new Date(oriDate)
    let hm = time.split(":")
    date.setHours(parseInt(hm[0]))
    date.setMinutes(parseInt(hm[1]))
    date.setDate(date.getDate() + 7 * (week - 1) + (day == 0 ? 6 : day - 1))
    return date
}

function freqAdapter(day: number, freq: Freq): Calendar.freq {
    return new Calendar.freq(freq.interval, freq.end - freq.start + 1, dayEN[day])
}

function eventAdapter(oriDate: Date, event: Event): Calendar.vevent[] {
    let vevents: Calendar.vevent[] = []
    for (const sect of event.section) {
        let e = new Calendar.vevent(
            timeAdapter(oriDate, sect.time.start, sect.time.day, sect.freq.start),
            timeAdapter(oriDate, sect.time.end, sect.time.day, sect.freq.start),
            event.summary,
            sect.location,
            event.description
        )
        if (sect.freq.end)
            e.freq = freqAdapter(sect.time.day, sect.freq)
        if (sect.time.alarm)
            e.alarm = `-PT${sect.time.alarm.hour}H${sect.time.alarm.min}M`
        vevents.push(e)
    }
    return vevents
}

export function calendarAdapter(date: Date, events: Event[]): Calendar.icalendar {
    if (date.getDay() == 0)
        date.setDate(date.getDate() - 6)
    else if (date.getDay() != 1) {
        date.setDate(date.getDate() - (date.getDay() - 1))
    }
    let cal = new Calendar.icalendar()
    for (const e of events) {
        cal.events = cal.events.concat(eventAdapter(date, e))
    }
    return cal
}