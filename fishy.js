let fishEl = document.querySelector("#fish")
        let fishLeft = document.body.clientWidth + 500
        function moveFish(){
        fishEl.style.left = fishLeft + "px"
        fishLeft -= 1
        if (fishLeft < -500) {
            fishLeft = document.body.clientWidth + 500
        }
        setTimeout(moveFish, 17)
        }
        moveFish()