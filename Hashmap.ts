import LinkedList from './LinkedList'

class HashMap<K, V> {
    private bucket: Array<LinkedList<K, V>>
    private size: number

    private hashMethod(key: K): number{
        console.log(key)
        return 0
    }

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

    constructor(size = 100){
        this.size = size
        this.bucket = new Array<LinkedList<K, V>>(size)
    }

    set = (key: K, value: V) =>{
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

    get = (key: K) => {
        const index = this.hashMethod(key) % this.bucket.length
        const value = this.bucket[index].searchNode(key)
        if (value == -1)
            return null
        else value
    }

    delete = (key: K) => {
        const index = this.hashMethod(key) % this.bucket.length
        this.bucket[index].deleteNode(key)
    }
}
