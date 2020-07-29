export function get() {
    const { API_KEY } = process.env
    if (!API_KEY) throw new Error('APIKeyError')
    return {
        API_KEY
    }
}