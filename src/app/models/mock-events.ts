import { Event } from './event';

export const EVENTS: Event[] = [
    {
        summary: "计算机视觉",
        description: "",
        section: [
            {
                time: { start: "08:20", end: "10:00", day: 3, alarm: { hour: 0, min: 30 } },
                location: "教学 C101",
                freq: { start: 1, end: 15, interval: 1 }
            },
            {
                time: { start: "14:00", end: "15:40", day: 3, alarm: undefined },
                location: "教学 C101",
                freq: { start: 1, end: 15, interval: 1 }
            },
            {
                time: { start: "08:20", end: "10:00", day: 5, alarm: undefined },
                location: "教学 B301",
                freq: { start: 1, end: 15, interval: 1 }
            },
            {
                time: { start: "14:00", end: "15:40", day: 2, alarm: undefined },
                location: "教学 B101",
                freq: { start: 13, end: undefined, interval: 1 }
            }
        ]
    }
]