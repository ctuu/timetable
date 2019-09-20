class Item {
    name: string
    value: string
}

export const dayCN: string[] = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
export const dayEN: string[] = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"]


export const DAYS: Item[] = (() => {
    let ar = []
    for (let i = 0; i < 7; ++i)
        ar.push({ name: dayCN[i], value: dayEN[i] })
    return ar
})()


export const HOURS: Item[] = (() => {
    let ar = []
    for (let i = 0; i < 24; ++i) {
        ar.push({ name: i.toString().padStart(2, "0"), value: i.toString().padStart(2, "0") })
    }
    return ar
})()

export const MINUTES: Item[] = (() => {
    let ar = []
    for (let i = 0; i < 60; ++i) {
        ar.push({ name: i.toString().padStart(2, "0"), value: i.toString().padStart(2, "0") })
    }
    return ar
})()