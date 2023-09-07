class PriorityQueue {
  constructor() {
    this.elements = [];
    this.uniqueFirstElements = new Set();
  }

  enqueue(element) {
    const [newFirstElement] = element;

    if (!this.uniqueFirstElements.has(newFirstElement)) {
      this.elements.push(element);
      this.uniqueFirstElements.add(newFirstElement);
      this.bubbleUp(this.elements.length - 1);
    }
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.elements[index][1] < this.elements[parentIndex][1]) {
        [this.elements[index], this.elements[parentIndex]] = [
          this.elements[parentIndex],
          this.elements[index],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const highestPriorityElement = this.elements.shift();
    const [firstElement] = highestPriorityElement;
    this.uniqueFirstElements.delete(firstElement);

    return highestPriorityElement;
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  size() {
    return this.elements.length;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.elements[0];
  }

  removeByFirstElement(firstElement) {
    const index = this.elements.findIndex(
      (element) => element[0] === firstElement
    );
    if (index !== -1) {
      this.elements.splice(index, 1);
      this.uniqueFirstElements.delete(firstElement);
    }
  }
}

export default PriorityQueue;
