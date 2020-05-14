import axios from 'axios'
axios.defaults.baseURL = 'https://mandrillapp.com/api/1.0'

interface Attachment {
    content: string
    name: string
    type: string
}
interface Content {
    _id: string
    attachments: Attachment[]
    html: string
    subject: string
    tags: string[]
    ts: number
}
interface Info {
    clicks: number
    opens: number
    state: string
}

function ep(path: string) {
    return path
    const url = 'https://mandrillapp.com/api/1.0'
    return url + path
}

export async function content(key: string, id: string) {
    const url = ep('/messages/content')
    const params = { key, id }
    const { data } = await axios.get<Content>(url, { params })
    return data
}
export async function info(key: string, id: string) {
    const url = ep('/messages/info')
    const params = { key, id }
    const { data } = await axios.get<Info>(url, { params })
    return data
}
export async function ping(key: string) {
    interface Ping { PING: string }
    const url = ep('/users/ping2')
    const params = { key }
    const { data } = await axios.get<Ping>(url, { params })
    const { PING } = data
    return PING
}

export const Mandrill = (key: string) => ({
    content: (id: string) => content(key, id),
    info: (id: string) => info(key, id),
    ping: () => ping(key),
})
