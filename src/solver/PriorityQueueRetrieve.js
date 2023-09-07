class PriorityQueueRetrieve {
  constructor() {
    this.elements = [];
    this.temp = null;
  }

  enqueue(element) {
    this.elements.push(element);
    this.temp = element[3];
    this.elements.sort((a, b) => a[2] - b[2]);
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.elements[index][2] < this.elements[parentIndex][2]) {
        // Swap the elements if the child's priority is smaller than the parent's
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

  retrieve() {
    if (this.isEmpty()) return [];

    const res = [this.elements[this.elements.length - 1][0]];
    let tmp = this.elements[this.elements.length - 1][3];

    for (let i = this.elements.length - 1; i >= 0; i--) {
      if (this.elements[i][2] === tmp) {
        tmp = this.elements[i][3];
        res.push(this.elements[i][0]);
      }
    }

    res.reverse();
    return res;
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

export default PriorityQueueRetrieve;
