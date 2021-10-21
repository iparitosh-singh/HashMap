import LinkedList from './LinkedList'
import {randomBytes} from 'crypto'
import {asUInt32Low}  from 'highwayhash'

class HashMap<K, V> {
    private bucket: Array<LinkedList<K, V>>
    private size: number
    private hashKey: Buffer

    private hashMethod(key: K): number{

        const stringKey = key.toString()
        const inputBuffer = Buffer.from(stringKey)
        const hash = asUInt32Low(this.hashKey, inputBuffer)
        return hash
    }
    // debug fucntion
    // public printEntireMap(): void{
    //     this.bucket.forEach(list => {
    //         const array = list.toArray()
    //         console.log(array)
    //     })
    // }
    private doubleBucketSize(): void {
        let newBucket = new Array<LinkedList<K, V>>(this.bucket.length * 2)
        this.bucket.forEach(list => {
            const array  = list.toArray()
            array.forEach(pair => {
                const index = this.hashMethod(pair.key) % newBucket.length
                newBucket[index].insertAtEnd(pair.key, pair.value)
            })
        })
    }

    constructor(size = 10){
        this.size = size
        this.bucket = new Array<LinkedList<K, V>>(size)
        this.hashKey = randomBytes(32)
        for(let i = 0; i < size; i++)
            this.bucket[i] = new LinkedList<K,V>()

    }

    public set = (key: K, value: V) =>{
        const index = this.hashMethod(key) % this.bucket.length
        if(this.bucket[index].searchNode(key) == -1){
            this.bucket[index].insertAtEnd(key, value)
            this.size += 1
        }
        else {
            this.bucket[index].updateNode(key, value)
        }

        if(this.size - this.bucket.length > this.bucket.length){
            this.doubleBucketSize()
        }
    }

    public get = (key: K): V | null => {
        const index = this.hashMethod(key) % this.bucket.length
        const value = this.bucket[index].searchNode(key)
        if (typeof value == 'number')
            return null
        else return value
    }

    public delete = (key: K) => {
        const index = this.hashMethod(key) % this.bucket.length
        this.bucket[index].deleteNode(key)
    }
}


export default HashMap
