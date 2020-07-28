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
    ts: number
    _id: string
    state: string
    subject: string
    email: string
    tags: string[]
    opens: number
    clicks: number
    sender: string
    metadata: Metadata
}

interface Metadata {
    uid: string,
    [key: string]: string
}

export interface SearchOptions {
    query?: string
    date_from?: string | Date
    date_to?: string | Date
    tags?: string[]
    senders?: string[]
    api_keys?: string[]
    [key: string]: any
}

export async function content(key: string, id: string) {
    const params = { key, id }
    const { data } = await axios.get<Content>('/messages/content', { params })
    return data
}
export async function info(key: string, id: string) {
    const params = { key, id }
    const { data } = await axios.get<Info>('/messages/info', { params })
    return data
}
export async function ping(key: string) {
    interface Ping { PING: string }
    const params = { key }
    const { data } = await axios.get<Ping>('/users/ping2', { params })
    const { PING } = data
    return PING
}
export async function search(key: string, options: SearchOptions) {
    const params = {
        key,
        ...options
    }
    const { data } = await axios.get<Info[]>('/messages/search', { params })
    return data
}

export const Mandrill = (key: string) => ({
    content: (id: string) => content(key, id),
    info: (id: string) => info(key, id),
    ping: () => ping(key),
    search: (options: SearchOptions) => search(key, options),
})
