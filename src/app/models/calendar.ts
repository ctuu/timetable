import nanoid from 'nanoid'

export function ISODate(date: Date): string {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '')
}

export class freq {
    interval: number = 1
    count: number = 1
    byday: string = 'MO'
    constructor(_inter: number, _count: number, _byday: string) {
        this.interval = _inter
        this.count = _count
        this.byday = _byday
    }

    toString(): string {
        return `RRULE:FREQ=WEEKLY;INTERVAL=${this.interval};COUNT=${this.count};BYDAY=${this.byday}`
    }
}

export class valarm {
    private duration: string
    private description: string
    constructor(_dura: string, _desc: string) {
        this.duration = _dura
        this.description = _desc
    }

    toString(): string {
        return `BEGIN:VALARM
                ACTION:DISPLAY
                DESCRIPTION:${this.description}
                TRIGGER:${this.duration}
                END:VALARM`
            .replace(/^\s+/gm, '')
    }
}

export class vevent {
    private dtstamp: Date = new Date()
    private dtstart: Date
    private dtend: Date

    private _summary: string | undefined
    private _location: string | undefined
    private _description: string | undefined

    private _alarm: valarm | undefined
    private _freq: freq | undefined
    set summary(__summ: string) {
        this._summary = __summ
    }

    set location(__loc: string) {
        this._location = __loc
    }

    set description(__desc: string) {
        this._description = __desc
    }

    set alarm(_dura: string) {
        this._alarm = new valarm(_dura, `${this._summary ? this._summary : ''} ${this._location ? this._location : ''}${this._summary || this._location ? ':' : ''} ${this._description ? this._description : ''}`)
    }

    set freq(__freq: freq) {
        this._freq = __freq
    }

    constructor(_dtstart: Date, _dtend: Date, __summ: string, __loc?: string, __desc?: string) {
        this.dtstart = _dtstart
        this.dtend = _dtend
        this._summary = __summ
        this._location = __loc
        this._description = __desc
    }

    toString(): string {
        return `BEGIN:VEVENT
                UID:${ISODate(this.dtstamp)}-${nanoid(8)}
                DTSTAMP:${ISODate(this.dtstamp)}
                DTSTART:${ISODate(this.dtstart)}
                DTEND:${ISODate(this.dtend)}
                ${ this._summary ? `SUMMARY:${this._summary}` : ''}
                ${ this._location ? `LOCATION:${this._location}` : ''}
                ${ this._description ? `DESCRIPTION:${this._description}` : ''}
                ${ this._alarm ? this._alarm : ''}
                ${ this._freq ? this._freq : ''}
                STATUS:CONFIRMED
                END:VEVENT`
            .replace(/^\s/gm, '')
    }
}

export class icalendar {
    readonly prodid: string = 'NULL'
    readonly version: string = '2.0'
    events: vevent[] = []

    toString(): string {
        return `BEGIN:VCALENDAR
                PRODID:${this.prodid}
                VERSION:${this.version}
                ${this.events.join('\n')}
                END:VCALENDAR`
            .replace(/^\s+/gm, '')
    }
}


// let e = new icalendar()
// let course = new vevent(
//     new Date('2019-9-3 21:07'),
//     new Date('2019-9-3 22:00'),
//     '编译原理',
//     '教学C103',
//     '这里是备注'
// )
// course.alarm = '-P3D'
// course.freq = new freq(1, 15, 'MO')
// // course.summary = '编译原理'
// // course.location = '教学C101'
// // course.description = '这里是备注'

// e.events.push(course)

// console.log(`${e}`)