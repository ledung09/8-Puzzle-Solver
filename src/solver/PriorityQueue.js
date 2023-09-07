class PriorityQueue {
  constructor() {
    this.elements = [];
    this.uniqueFirstElements = new Set();
  }

  // Add an element with a priority to the queue
  enqueue(element) {
    const [newFirstElement] = element;

    // Check if the first element is unique before enqueueing
    if (!this.uniqueFirstElements.has(newFirstElement)) {
      this.elements.push(element);
      this.uniqueFirstElements.add(newFirstElement);
      this.bubbleUp(this.elements.length - 1);
    }
  }

  // Helper function to maintain the min-heap property during insertion
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.elements[index][1] < this.elements[parentIndex][1]) {
        // Swap the elements if the child's priority is smaller than the parent's
        [this.elements[index], this.elements[parentIndex]] = [this.elements[parentIndex], this.elements[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  // Remove and return the element with the highest priority
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const highestPriorityElement = this.elements.shift();
    const [firstElement] = highestPriorityElement;
    this.uniqueFirstElements.delete(firstElement);

    return highestPriorityElement;
  }

  // Check if the priority queue is empty
  isEmpty() {
    return this.elements.length === 0;
  }

  // Get the number of elements in the priority queue
  size() {
    return this.elements.length;
  }

  // Return the element with the highest priority without removing it
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.elements[0];
  }

  // Helper function to remove an element with a specific first element
  removeByFirstElement(firstElement) {
    const index = this.elements.findIndex((element) => element[0] === firstElement);
    if (index !== -1) {
      this.elements.splice(index, 1);
      this.uniqueFirstElements.delete(firstElement);
    }
  }

}
export default PriorityQueue;