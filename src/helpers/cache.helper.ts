import Memcached from 'memcached'

export class CacheHelper {
    private client = new Memcached('localhost:11211') // default memcached

    public async getCache(key: string) {
        return new Promise<void>((resolve, reject) => {
            this.client.get(key, (err, data) => {
                if (err) {
                    return reject(err)
                }
                resolve(data)
            })
        })
    }

    public async setCache(key: string, value: any, lifetime: number = 60) {
        return new Promise<void>((resolve, reject) => {
            this.client.set(key, value, lifetime, (err) => {
                if (err) {
                    return reject(err)
                }
                resolve()
            })
        })
    }

    public async deleteCache(key: string) {
        return new Promise<void>((resolve,reject) => {
            this.client.del(key, (err) => {
                if(err){
                    return reject(err)
                }
                resolve()
            })
        })
    }
}