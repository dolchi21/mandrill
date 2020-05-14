import { Mandrill } from './mandrill'

async function main() {
    const client = Mandrill('asd')
    await client.ping()
}

main().then(() => {

}).catch(err => {
    console.error(err.message)
    process.exit(1)
})