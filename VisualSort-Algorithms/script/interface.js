CURRENT_SET = new Set();

const inputArray = document.getElementById('inputArray');
const elements = document.getElementById('elements');

(function init() {
    updateSpeed();
    updateElements();
    showDetails();
})();

// Add bind events on UI elements
$("#speed").on("input", function() {
    updateSpeed();
});

$("#elements").on("input", function() {
    updateElements();
});

$("#algorithms").on("change", function() {
    showDetails();
});

$("#sort").on("click", function() {
    runAlgo();
});

$("#stop").on("click", function() {
    stopAnimation();
});

$("#reset").on("click", function() {
    reset();
});

$("#restart").on("click", function() {
    restart();
});

function updateSpeed() {
    SPEED = document.getElementById("speed").value;
    document.getElementById("speed-count").innerHTML = 101 - SPEED;
}

function updateElements(CustomArray) {
    console.log(CustomArray);
    clearContainer();
    TOTAL_ELEMENTS = document.getElementById("elements").value;
    document.getElementById("element-count").innerHTML = TOTAL_ELEMENTS;
    CURRENT_SET =  generateRandomSet();
    insertBars(CURRENT_SET);
}

function createCustomArray(){
    let set = new Set();
    var split = inputArray.value.split(",");
    for(let i = 0; i < split.length; i++){
        set.add(split[i]);
    }
    return set;
}

function generateRandomSet() {
    console.log(!inputArray.value);
    let set1 = new Set();

    while (set1.size < TOTAL_ELEMENTS) {
        set1.add(Math.round(Math.random() * 99) + 1);
    }
    let set2 = new Set();
    var split = inputArray.value.split(",");
    for(let i = 0; i < split.length; i++){
        set2.add(split[i]);
    }

    return  inputArray.value ? set2 : set1;
}

function clearContainer() {
    container.innerHTML = "";
}

function insertBars(set) {
    const width = CONTAINER_WIDTH / TOTAL_ELEMENTS;
    // Generate bars
    const arr = Array.from(set);
    for (let i = 0; i < arr.length; ++i) {
        let bar = document.createElement("div");
        bar.setAttribute("class", "bar");
        bar.setAttribute("style", "width: " + width + "px; height: " + arr[i] + "%;");
        bar.innerHTML = arr[i];
        container.appendChild(bar);
    }
}

function showDetails() {
    const algo = $("select#algorithms")
        .children("option:selected")
        .val();
    $(".algo-container").addClass("hidden");
    $("#" + algo + "-info").removeClass("hidden");
}

function disableInput(what = true) {
    $(".sort").attr("disabled", what);
    $(".slider-input").attr("disabled", what);
    $("select#algorithms").attr("disabled", what);
    $("select#order").attr("disabled", what);

    // Swap colors
    $("#stop")
        .attr("disabled", true)
        .removeClass("green");

    if (what) {
        $(".sort").removeClass("green");
        $("#stop")
            .attr("disabled", false)
            .addClass("green");

        return;
    }

    $(".sort").addClass("green");
}

function reset() {
    stopAnimation();
    updateSpeed();
    updateElements();
}

function restart() {
    stopAnimation();
    clearContainer();
    insertBars(CURRENT_SET);
    disableInput(false);
}

function runAlgo() {
    if (SPEED <= 0) {
        console.log("Abnormal delay.");
        return;
    }

    const algo = $("select#algorithms")
        .children("option:selected")
        .val();

    const order = $("select#order")
        .children("option:selected")
        .val();

    let elements = JSON.parse(JSON.stringify(getElements()));
    const solution = solve(algo, order, elements);

    if (solution) {
        disableInput();
        animate(solution,elements);
    }

    function getElements() {
        let els = Array();

        for (let i = 0; i < bars.length; ++i) {
            els.push(parseInt(bars[i].innerHTML));
        }

        return els;
    }

    function solve(algo, order, input) {
        switch (algo) {
            case "bubble": {
                return Algorithms.bubble(input, order);
            }
            case "comb": {
                return Algorithms.comb(input, order);
            }
            case "heap": {
                return Algorithms.heap(input, order);
            }
            case "insertion": {
                return Algorithms.insertion(input, order);
            }
            case "selection": {
                return Algorithms.selection(input, order);
            }
            case "shell": {
                return Algorithms.shell(input, order);
            }
            default: {
                return false;
            }
        }
    }
}
