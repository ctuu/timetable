import { Event, Freq } from './event';

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
    },
    {
        summary: "嵌入式系统",
        description: "",
        section: [
            {
                time: { start: "08:20", end: "10:00", day: 3, alarm: undefined },
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
    },
    {
        summary: "毛泽东思想与中国特色社会主义理论体系概论",
        description: "",
        section: [
            {
                time: { start: "8:20", end: "10:00", day: 3, alarm: undefined },
                location: "教学 C101",
                freq: { start: 1, end: 15, interval: 1 }
            },
            {
                time: { start: "14:00", end: "15:40", day: 3, alarm: undefined },
                location: "教学 C101",
                freq: { start: 1, end: 15, interval: 1 }
            },
            {
                time: { start: "8:20", end: "10:00", day: 5, alarm: undefined },
                location: "教学 B301",
                freq: { start: 1, end: 15, interval: 1 }
            },
            {
                time: { start: "14:00", end: "15:40", day: 2, alarm: undefined },
                location: "教学 B101",
                freq: { start: 13, end: undefined, interval: 1 }
            }
        ]
    },
    {
        summary: "计算机图形学",
        description: "",
        section: [
            {
                time: { start: "8:20", end: "10:00", day: 3, alarm: undefined },
                location: "教学 C101",
                freq: { start: 1, end: 15, interval: 1 }
            },
            {
                time: { start: "14:00", end: "15:40", day: 3, alarm: undefined },
                location: "教学 C101",
                freq: { start: 1, end: 15, interval: 1 }
            },
            {
                time: { start: "8:20", end: "10:00", day: 5, alarm: undefined },
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