let app = new Vue({
    el: "#app",
    data: {
        displayInstruction: false,
        displayIntro: true,
        isTimerRunning: false,
        startSecond: 4,
        animals: [],
    },
    watch: {
        displayIntro () {
            $('#introModal').modal('toggle');
        },
        displayInstruction () {
            $('#introductionModal').modal('toggle');
        }
    },
    mounted () {
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
                name: "kaola",
                image: "kaola.png",
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

        this.animals = shuffle(this.animals);

    },
    methods: {
        introAudioEnded () {
            this.displayIntro = false;
            this.displayInstruction = true;
            document.querySelector('#instructionAudio').play();
        },
        instructionAudioEnded () {
            this.displayInstruction = false;
            this.startTimer();
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
            document.body.style.cursor = `url(cursor-${image})  5 5, pointer`;
        },
        dissipateImages () {
            let row = document.createElement('div');
            row.classList = "row"
            this.animals.forEach(animal => {
                let elem = document.createElement('div');
                elem.classList = "col-4 m-3";
                // elem.style.backgroundImage = animal.image;
                elem.addEventListener('mouseover', function () {
                    this.changeCursor(animal.image);
                });
                elem.addEventListener('click', function () {
                    this.selectAnimal(animal, $event);
                })
                row.appendChild(elem);
            });
            document.body.appendChild(row);
        },
        selectAnimal (animal, evt) {
            evt.target.style.backgroundImage = animal.image;
            animal.isFound = true;
        }

    }
})