import axios from 'axios'

interface Attachment {
    name: string
    type: string
    content: string
}
interface Content {
    html: string,
    attachments: Attachment[]
}

export async function content(key: string, id: string) {
    const ep = 'https://mandrillapp.com/api/1.0/messages/content.json'
    const params = { key, id }
    const { data } = await axios.get(ep, { params })
    return data as Content
}
export async function info(key: string, id: string) {
    const ep = 'https://mandrillapp.com/api/1.0/messages/info.json'
    const params = { key, id }
    const { data } = await axios.get(ep, { params })
    const { state } = data
    return {
        state
    }
}

export const Mandrill = (key: string) => ({
    content: (id: string) => content(key, id),
    info: (id: string) => info(key, id),
})
