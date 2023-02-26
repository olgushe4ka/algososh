interface IList<T> {
  addToHead: (value: T) => void;
  addToTail: (value: T) => void;
  delFromHead: () => void;
  delFromTail: () => void;
  addByIndex: (item: T, value: number) => void;
  delByIndex: (value: number) => void;
  // getHead: () => { value: T | null; index: number };
  // getTail: () => { value: T | null; index: number };
  clear: () => void;
}

export default class LinkedList<T> implements IList<T> {
  container: (T | null)[] = [];
  head: number = 0;
  tail: number = 0;
  length: number = 0;

  constructor() {
    this.container = Array();
  }

  addToHead(item: T) {
    this.container[this.head] = item;
    this.head ++;
    this.length++;
  }
  addToTail(item: T) {
    this.container[this.head] = item;
    this.tail --;
    this.length++;
  }

  delFromHead() {
    this.container[this.head] = null;
    this.head++;
    this.length--;
  }
  delFromTail() {
    this.container[this.tail] = null;
    this.tail--;
    this.length--;
  }

  addByIndex(item: T, value: number) {
    this.container[value] = item;
    this.length++;
  }

  delByIndex(value: number) {
    this.container[value] = null;
    this.length--;
  }

  // enqueue(item: T) {
  //   this.container[this.tail] = item;
  //   this.tail++;
  //   this.length++;
  // }

  // dequeue() {
  //   this.container[this.head] = null;
  //   this.head++;
  //   this.length--;
  // }

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  // getHead = (): { value: T | null; index: number } => {
  //   return { value: this.container[this.head], index: this.head };
  // };

  // getTail = (): { value: T | null; index: number } => {
  //   return { value: this.container[this.tail - 1], index: this.tail - 1 };
  // };
}
