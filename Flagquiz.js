let score = 0
let scoretxt = document.querySelector('#score')
let high = 0
let hightxt = document.querySelector('#highscore')
let life = 3
let lives = document.querySelector('#lives')
let soltxt = document.querySelector('#solution')

fetch('https://restcountries.com/v3.1/all')
.then(response => response.json())
.then(data => {
    let count = (data[rando()])
    image.src = count.flags.png
    let solution = count.name.common.toLowerCase()
    soltxt.textContent = solution
    let alt = count.name.common.toLowerCase().split(' ')
    console.log(alt)
    console.log(solution)

    function refresh(){
    count = (data[rando()])
    image.src = count.flags.png
    solution = count.name.common.toLowerCase()
    soltxt.textContent = solution
    console.log(solution)
    }

    function reset(){
        score = 0
        life = 3
        scoretxt.textContent = 'Score: ' + score
        lives.textContent= 'Life Counter : ✅ ✅ ✅'
        guess.value = ''
        soltxt.style.opacity = "0"
        refresh()
    }

    subm.addEventListener('click', () => {
        let x = guess.value.toLowerCase()
        if (x == solution || x == alt[0] || x== alt[alt.length-1]){
            score++
            scoretxt.textContent = 'Score: ' + score
            guess.value = ''
            x = ''
            refresh()
        }else {
            liferundown()
        }})
        function liferundown(){
            life -= 1
            switch (life) {
            case 2:
                lives.textContent = 'Life Counter : ✅ ✅ ❌';
                break;
            case 1:
                lives.textContent = 'Life Counter : ✅ ❌ ❌';
                break;
            case 0:
                lives.textContent = 'Life Counter : ❌ ❌ ❌';
                soltxt.style.opacity = "1"
                setTimeout(() => {
                    high = score
                    hightxt.textContent = 'Highscore: ' + high
                    reset()
                }, 2000);
                break;
            
            console.log(life)
        }
    }
    skip.addEventListener('click', () => {
        soltxt.style.opacity = "1"
        setTimeout(() => {
            refresh()
            liferundown()
            soltxt.style.opacity = "0"
        }, 2000);
    })
})

let image = document.querySelector('img')
let subm = document.querySelector('button')
let skip = document.querySelector('#skip')
let guess = document.querySelector('input')

function rando(){
    let x = Math.ceil(Math.random()*249)
    return x
}

