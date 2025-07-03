// Swap HTML elements
$.fn.swap = function(elem) {
    elem = elem.jquery ? elem : $(elem);
    return this.each(function() {
        $(document.createTextNode(""))
            .insertBefore(this)
            .before(elem.before(this))
            .remove();
    });
};

let ANIMATION_FRAMES = [];
function animate(solution,sorted) {
    ANIMATION_FRAMES = [];
    // Add empty frame at the end
    solution.addFrame(new Frame());

    const frames = solution.getFrames();
    for (let i = 0; i < frames.length; ++i) {
        // console.log(bars[0].innerText);
        (function(frames, i, bars, ANIMATION_FRAMES, SPEED, TOTAL_ELEMENTS) {
            ANIMATION_FRAMES.push(
                setTimeout(function() {
                    
                    $(".bar").removeClass("compared");
                    const lastFrame = i == frames.length - 1;
                    const elem = frames[i].elements;
                    const highlight = frames[i].highlights;

                    // Highlight compared elements
                    if (highlight.length) {
                        for (h = 0; h < highlight.length; ++h) {
                            $(bars[highlight[h]]).addClass("compared");
                        }
                    }

                    // Swap compared elements
                    if (elem.length) {
                        $(bars[elem[1]]).swap(bars[elem[0]]);
                        for(let i = 0; i < bars.length; i++) {
                            // console.log(bars[i].innerText == sorted[i],bars[i].innerText,sorted[i]);
                            if(bars[i].innerText == sorted[i]){
                                bars[i].classList.remove("green");
                                bars[i].classList.add("sorted");
                            } else{
                                bars[i].classList.remove("sorted");
                                bars[i].classList.add("green    ");
                            }
                        }
                        // if(bars[0].innerText == sorted[0]){
                        //         bars[0].classList.remove("green");
                        //         bars[0].classList.add("sorted");
                        //         console.log(bars[0]);
                            
                        // }
                    }

                    // if(elem.length){
                    //     console.log(elem);
                    //     console.log(bars[elem[0]].innerText==sorted[elem[0]+1]);
                    //     console.log(bars[elem[0]].innerText,sorted[elem[0]+1]);
                    // }

                    // Disable stop button once animation ends
                    if (lastFrame) {
                        $("#stop")
                            .attr("disabled", true)
                            .removeClass("green");
                    }
                }, SPEED * TOTAL_ELEMENTS * i)
            );
        })(frames, i, bars, ANIMATION_FRAMES, SPEED, TOTAL_ELEMENTS);
    }
}

function stopAnimation() {
    for (let i = 0; i < ANIMATION_FRAMES.length; ++i) {
        clearTimeout(ANIMATION_FRAMES[i]);
    }

    $(".bar").removeClass("compared");
    disableInput(false);
}
