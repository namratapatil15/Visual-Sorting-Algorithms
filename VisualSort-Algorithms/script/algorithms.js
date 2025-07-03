class Frame {
    constructor(e, h) {
        this.elements = [];
        this.highlights = [];
        this.information = "";

        if (e != undefined && e.length) {
            this.elements = e;
        }

        if (h != undefined && h.length) {
            this.highlights = h;
        }
    }

    addHighlights(highlights) {
        for (const e of highlights) {
            this.highlights.push(e);
        }
    }

    addElements(elements) {
        for (const e of elements) {
            this.elements.push(e);
        }
    }
}

class Animation {
    constructor() {
        this.frames = [];
    }

    addFrame(frame) {
        const temp = JSON.parse(JSON.stringify(frame)); // Only store a copy
        this.frames.push(temp);
    }

    getFrames() {
        return this.frames;
    }
}

class Algorithms {
    static bubble(e, order) {
        let elements = e;
        let solution = new Animation();
        let swapped = false;

        for (let i = 0; i < elements.length; ++i) {
            swapped = false;
            for (let j = 0; j < elements.length - 1; ++j) {
                solution.addFrame(new Frame([], [j, j + 1]));

                if (order == "desc" ? elements[j] < elements[j + 1] : elements[j] > elements[j + 1]) {
                    swapped = true;

                    const temp = elements[j];
                    elements[j] = elements[j + 1];
                    elements[j + 1] = temp;

                    solution.addFrame(new Frame([j, j + 1], [j, j + 1]));
                }
            }

            if (!swapped) {
                break;
            }
        }
        return solution;
    }

    static insertion(e, order) {
        let elements = e;
        let solution = new Animation();

        for (let i = 1; i < elements.length; ++i) {
            let key = elements[i];
            let j = i - 1;

            solution.addFrame(new Frame([], [j, j + 1]));

            while (j >= 0 && (order == "desc" ? elements[j] < key : elements[j] > key)) {
                solution.addFrame(new Frame([], [j, j + 1]));
                elements[j + 1] = elements[j];
                solution.addFrame(new Frame([j, j + 1], [j, j + 1]));
                j = j - 1;
            }
            elements[j + 1] = key;
        }

        return solution;
    }

    static selection(e, order) {
        let elements = e;
        let solution = new Animation();

        for (let i = 0; i < elements.length - 1; ++i) {
            let current = i;
            solution.addFrame(new Frame([], [i, current]));

            for (let j = i + 1; j < elements.length; ++j) {
                solution.addFrame(new Frame([], [i, j, current]));
                if (order == "desc" ? elements[j] > elements[current] : elements[j] < elements[current]) {
                    current = j;
                }
            }

            const temp = elements[current];
            elements[current] = elements[i];
            elements[i] = temp;
            solution.addFrame(new Frame([i, current], [i, current]));
        }

        return solution;
    }

    // Replacing shell sort with Quick Sort
    static quick(e, order) {
        let elements = e;
        let solution = new Animation();

        function quickSort(start, end) {
            if (start < end) {
                const pivotIndex = partition(start, end);
                quickSort(start, pivotIndex - 1);
                quickSort(pivotIndex + 1, end);
            }
        }

        function partition(low, high) {
            let pivot = elements[high];
            let i = low - 1;

            for (let j = low; j < high; ++j) {
                solution.addFrame(new Frame([], [j, high]));
                if (order === "desc" ? elements[j] > pivot : elements[j] < pivot) {
                    i++;
                    [elements[i], elements[j]] = [elements[j], elements[i]];
                    solution.addFrame(new Frame([i, j], [i, j]));
                }
            }

            [elements[i + 1], elements[high]] = [elements[high], elements[i + 1]];
            solution.addFrame(new Frame([i + 1, high], [i + 1, high]));
            return i + 1;
        }

        quickSort(0, elements.length - 1);
        return solution;
    }

    // Replacing comb sort with Merge Sort
    static merge(e, order) {
        let elements = e;
        let solution = new Animation();

        function mergeSort(start, end) {
            if (start >= end) return;
            const mid = Math.floor((start + end) / 2);
            mergeSort(start, mid);
            mergeSort(mid + 1, end);
            merge(start, mid, end);
        }

        function merge(start, mid, end) {
            let left = elements.slice(start, mid + 1);
            let right = elements.slice(mid + 1, end + 1);

            let i = 0, j = 0, k = start;

            while (i < left.length && j < right.length) {
                solution.addFrame(new Frame([], [k]));
                if (order === "desc" ? left[i] > right[j] : left[i] < right[j]) {
                    elements[k] = left[i];
                    i++;
                } else {
                    elements[k] = right[j];
                    j++;
                }
                solution.addFrame(new Frame([k], [k]));
                k++;
            }

            while (i < left.length) {
                elements[k] = left[i];
                solution.addFrame(new Frame([k], [k]));
                i++; k++;
            }

            while (j < right.length) {
                elements[k] = right[j];
                solution.addFrame(new Frame([k], [k]));
                j++; k++;
            }
        }

        mergeSort(0, elements.length - 1);
        return solution;
    }

    static heap(e, order) {
        let elements = e;
        const n = e.length;
        let solution = new Animation();

        for (let i = parseInt(n / 2) - 1; i >= 0; --i) {
            heapify(elements, n, i, solution, order);
        }

        for (let i = n - 1; i >= 0; --i) {
            const temp = elements[0];
            elements[0] = elements[i];
            elements[i] = temp;
            solution.addFrame(new Frame([0, i], [0, i]));

            heapify(elements, i, 0, solution, order);
        }

        function heapify(elements, n, i, solution, order) {
            let current = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (left < n && (order == "asc" ? elements[left] > elements[current] : elements[left] < elements[current])) {
                current = left;
            }

            if (right < n && (order == "asc" ? elements[right] > elements[current] : elements[right] < elements[current])) {
                current = right;
            }

            if (current != i) {
                solution.addFrame(new Frame([], [current, i]));
                const temp = elements[i];
                elements[i] = elements[current];
                elements[current] = temp;
                solution.addFrame(new Frame([current, i], [current, i]));
                heapify(elements, n, current, solution, order);
            }
        }

        return solution;
    }
}
