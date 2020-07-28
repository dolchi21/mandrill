import * as fs from 'fs'

import { Mandrill, SearchOptions } from './mandrill'

function file(name: string, data: any) {
    fs.writeFileSync(name, JSON.stringify(data, null, 2))
}

describe('Mandrill', function () {
    this.timeout(1000 * 60)
    const client = Mandrill('gPiMfpGJ1BQ5nTRWrDMeVg')
    before(() => {
        try {
            fs.mkdirSync('tmp')
        } catch (err) { }
    })
    it('should pong', async () => {
        await client.ping()
    })
    it('should get info', async () => {
        const data = await client.info('4da83856f07247f0b0e161433cc46e53')
        file('tmp/info.json', data)
    })
    it('should load content', async () => {
        const data = await client.content('4da83856f07247f0b0e161433cc46e53')
        file('tmp/content.json', data)
    })
    it.only('should search', async () => {
        const options: SearchOptions = {
            query: 'u_uid:33747020'
        }
        const data = await client.search(options)
        file('tmp/search.json', {
            meta: options,
            data
        })
    })
})
