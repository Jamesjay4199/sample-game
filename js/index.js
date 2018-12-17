let app = new Vue({
    el: "#app",
    data: {
        displayInstruction: false,
        displayIntro: false,
        isTimerRunning: false,
        startSecond: 4,
        animals: [],
        gameStarted: false,
    },
    watch: {
    },
    mounted () {
        // this.introduction()
        this.animals = [
            {
                name: "turtle",
                image: "turtle.png",
                isFound: false
            },
            {
                name: "seal",
                image: "seal.png",
                isFound: false
            },
            {
                name: "rhinoceros",
                image: "rhinoceros.png",
                isFound: false
            },
            {
                name: "otter",
                image: "otter.png",
                isFound: false
            },
            {
                name: "koala",
                image: "koala.png",
                isFound: false
            },
            {
                name: "iguana",
                image: "iguana.png",
                isFound: false
            },
            {
                name: "horse",
                image: "horse.png",
                isFound: false
            },
            {
                name: "hippo",
                image: "hippo.png",
                isFound: false
            },
            {
                name: "elephant",
                image: "elephant.png",
                isFound: false
            },
            {
                name: "crocodile",
                image: "crocodile.png",
                isFound: false
            }
        ];

        this.animals = this.shuffle(this.animals);
        // while (true) {
        //     this.mapCursor();
        // }
    },
    methods: {
        startGame () {
            this.gameStarted = true;
            this.introduction();
        },
        introduction () {
            document.querySelector('#introAudio').play();
            document.querySelector('#introAudio').addEventListener('ended', () => {
                this.displayIntro = false;
                this.instruction ();
                
            });
            this.displayIntro = true;
        },
        instruction () {
            this.displayInstruction = true;
            document.querySelector('#instructionAudio').play();
            document.querySelector('#instructionAudio').addEventListener('ended', () => {
                this.displayInstruction = false;
                this.startTimer();
                document.querySelector('#app').addEventListener('mousemove', (event) => {
                    let cursor = document.querySelector('#myCursor');
                    cursor.style.display = "block";
                    cursor.style.top = `${event.clientY - 65}px` ;
                    cursor.style.left = `${event.clientX - 115}px`;
                });
            });
            this.dissipateImages();
        },
        startTimer () {
            this.isTimerRunning = true;
            milliSecond = 99;
            let interval = setInterval(() => {
                milliSecond--;
                
                if (milliSecond === 0) {
                    this.startSecond--;
                }
                
            }, 10);
            if (this.startSecond === 0) {
                clearInterval(interval);
                milliSecond = 0;
            }
        },
        shuffle (array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        changeCursor (image) {
            document.querySelector('#myCursor').style.backgroundImage = `url(img/bino@${image})`;
        },
        returnCursor () {
            document.querySelector('#myCursor').style.backgroundImage = `url(img/cursorbinocular.png)`;
        },
        dissipateImages () {
            let row = document.createElement('div');
            row.classList = "row"
            row.style.paddingTop="20%"
            this.animals.forEach(animal => {
                let elem = document.createElement('div');
                let space = document.createElement('div');
                space.classList= "col-3";
                space.style.height = "50px;"
                elem.classList = "col-2 ";
                elem.style.height = "70px";
                elem.style.marginLeft = "50px"
                elem.style.marginTop = "50px";
                elem.style.zIndex = 2;
                elem.style.backgroundImage = animal.image;
                elem.addEventListener('mouseenter', () => {
                    this.changeCursor(animal.image);
                });
                elem.addEventListener('mouseleave', () => {
                    this.returnCursor();
                });
                elem.addEventListener('click',  () => {
                    this.selectAnimal(animal, event);
                })
                row.appendChild(elem);
                row.appendChild(space);
            });
            document.querySelector('#appContainer').appendChild(row);
        },
        selectAnimal (animal, evt) {
            evt.target.style.backgroundImage = animal.image;
            console.log("James")
            // animal.isFound = true;
        }

    }
})