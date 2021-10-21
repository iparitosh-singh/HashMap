class LLNode<K, T> {
    public next: LLNode<K, T> | null = null
    public prev: LLNode<K, T> | null = null
    public data: T
    public key: K
    constructor(key: K, data: T){
        this.data = data
        this.key = key
    }
}
interface Pair<K, T> {
    key: K,
    value:T
}
class LinkedList<K, T> {
    private head: LLNode<K, T> | null = null
    private findNode = (node: LLNode<K, T> | null, key: K): LLNode<K, T> | null => {
        if(!node)
            return null
        return node.key === key ? node : this.findNode(node.next, key)
    }
    public toArray(): Array<Pair<K, T>>{
        let arr: Array<Pair<K, T>>= []
        if(!this.head)
            return arr
        const addToArray = (node: LLNode<K, T>): Array<Pair<K, T>> => {
            const pair: Pair<K, T> = {
                key: node.key,
                value: node.data
            }
            arr.push(pair)
            return node.next ? addToArray(node.next) : arr
        }

        return addToArray(this.head)
    }
    public isEmpty(): boolean {
        return this.head === null
    }
    public insertAtEnd(key: K, data: T): LLNode<K, T>{
        const node = new LLNode(key, data)
        if(!this.head){
            this.head = node
            return node
        }
        const getLast = (node: LLNode<K, T>): LLNode<K, T> => {
            return node.next ? getLast(node.next) : node
        }
        const lastNode = getLast(this.head)
        node.prev = lastNode
        lastNode.next = node
        return node
    }
    public deleteNode(key: K): number{
        const node = this.findNode(this.head, key)
        if(!node){
            console.log("not found")
            return -1
        }
        if(!node.prev){
            this.head = node.next
            return 0
        }
        const prevNode= node.prev
        prevNode.next = node.next
        if(node.next){
            node.next.prev = prevNode
        }
        return 0
    }
    public updateNode(key: K, value: T): number {
        const node = this.findNode(this.head, key)
        if(!node)
            return -1
        node.data = value
        return 0

    }
    public searchNode(key: K): T | number{
        const node = this.findNode(this.head, key)
        if(!node)
            return -1
        return node.data
    }
}

export default LinkedList
