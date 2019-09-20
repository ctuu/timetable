const symbol = (() => {
    let ar = []
    for (let i = 14; i < 32; ++i)
        ar.push(String.fromCharCode(i))
    return ar
})()

export class Alarm {
    hour: number
    min: number

    constructor(_h: number, _m: number) {
        this.hour = _h
        this.min = _m
    }

    static encode(o: Alarm): string {
        return `${o.hour.toString().padStart(2, '0')}${o.min.toString().padStart(2, '0')}`
    }
    static decode(o: string): Alarm {
        return new Alarm(parseInt(o.slice(0, 2)), parseInt(o.slice(2, 4)))
    }
}

export class Freq {
    start: number
    end: number | undefined
    interval: number | undefined

    constructor(_s: number, _e?: number, _i?: number) {
        this.start = _s
        this.end = _e
        this.interval = _i
    }

    static compare(a: Freq, b: Freq): number {
        if (a.end == undefined)
            return -1
        if (b.end == undefined)
            return 1
        if (a.start != b.start)
            return a.start < b.start ? -1 : 1
        if (a.end != b.end)
            return a.end < b.end ? -1 : 1
        if (a.interval != b.interval)
            return a.interval < b.interval ? -1 : 1
        return 0
    }

    static E = symbol[0]
    static encode(o: Freq): string {
        return [o.start, o.end, o.interval].join(Freq.E)
    }
    static decode(o: string): Freq {
        let ar = o.split(Freq.E)
        return new Freq(parseInt(ar[0]), ar[1] ? parseInt(ar[1]) : undefined, ar[2] ? parseInt(ar[2]) : undefined)
    }
}
export class Time {
    start: string
    end: string
    day: number
    alarm: Alarm | undefined

    constructor(_s: string, _e: string, _d: number, _a?: Alarm) {
        this.start = _s
        this.end = _e
        this.day = _d
        this.alarm = _a
    }

    static compare(a: Time, b: Time): number {
        if (a.day != b.day)
            return a.day < b.day ? -1 : 1
        if (a.start != b.start)
            return a.start < b.start ? -1 : 1
        if (a.end != b.end)
            return a.end < b.end ? -1 : 1
        return 0
    }

    static encode(o: Time): string {
        return `${o.start}${o.end}${o.day}${o.alarm ? Alarm.encode(o.alarm) : ''}`
    }
    static decode(o: string): Time {
        return new Time(
            o.slice(0, 5), o.slice(5, 10), parseInt(o[10]), (o.length > 11 ? Alarm.decode(o.slice(11)) : undefined)
        )
    }
}

export class Section {
    time: Time
    location: string
    freq: Freq

    constructor(_t: Time, _l: string, _f: Freq) {
        this.time = _t
        this.location = _l
        this.freq = _f
    }

    static compare(a: Section, b: Section): number {
        let _ = Freq.compare(a.freq, b.freq)
        if (_ == 0)
            _ = Time.compare(a.time, b.time)
        return _
    }

    static E = symbol[1]
    static F = symbol[2]
    static encode(o: Section): string {
        return [Time.encode(o.time), o.location, Freq.encode(o.freq)].join(Section.E)
    }
    static decode(o: string): Section {
        let ar = o.split(Section.E)
        return new Section(Time.decode(ar[0]), ar[1], Freq.decode(ar[2]))
    }

    static encodes(o: Section[]): string {
        return o.map(Section.encode).join(Section.F)
    }
    static decodes(o: string): Section[] {
        return o.split(Section.F).map(Section.decode)
    }
}

export class Event {
    summary: string
    description: string
    section: Section[]

    constructor(_su: string, _d: string, _se: Section[]) {
        this.summary = _su
        this.description = _d
        this.section = _se
    }

    static E = symbol[3]
    static F = symbol[4]
    static encode(o: Event): string {
        return [o.summary, o.description, Section.encodes(o.section)].join(Event.E)
    }
    static decode(o: string): Event {
        let ar = o.split(Event.E)
        return new Event(ar[0], ar[1], Section.decodes(ar[2]))
    }
    static encodes(o: Event[]): string {
        return o.map(Event.encode).join(Event.F)
    }
    static decodes(o: string): Event[] {
        return o.split(Event.F).map(Event.decode)
    }
}
