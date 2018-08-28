class Game {

    constructor() {
        this.images = [];
        this.numbers = [];
        this.account = 10.00;
        for (let i = 1; i < 7; i++) {
            this.images.push(`assets/slot${i}.png`);
        }

        document.getElementById('account').innerText = this.account.toFixed(2);
    }

    generateNumbers() {
        const numbers = [];
        for (let i = 0; i < 3; i++) {
            let image;
            image = this.images[this.generateRandom()];
            numbers.push(image);
        }
        this.numbers = numbers;
        return this;
    }

    play() {
        this.generateNumbers()
            .deactivateButton()
            .calculateAccount()
            .setImages()
            .setText()
            .setAccount()
            .activateButton();
    }

    spin() {
        this.interval = setInterval(() => {
            this.generateNumbers().setImages();
        }, 100);
    }

    stopSpin() {
        window.clearInterval(this.interval);
        this.play();
    }

    deactivateButton() {
        document.getElementById('play').disabled = true;
        return this;
    }

    activateButton() {
        if (this.account.toFixed(2) >= 0.20) {
            document.getElementById('play').disabled = false;
        }
        return this;
    }

    calculateAccount() {
        this.account -= 0.20;
        if (this.areEqual(this.numbers)) {
            this.account += 1;
        }
        console.log(this.account);

        return this;
    }

    setAccount() {
        document.getElementById('account').innerText = this.account.toFixed(2);
        return this;
    }

    setText() {
        if (this.areEqual(this.numbers)) {
            document.getElementById('win').innerText = 'Gewonnen';
        } else {
            document.getElementById('win').innerText = 'Leider nicht gewonnen';
        }
        return this;
    }

    setImages() {
        document.getElementById('image1').setAttribute('src', this.numbers[0]);
        setTimeout(() => document.getElementById('image2').setAttribute('src', this.numbers[1]), 33);
        setTimeout(() => document.getElementById('image3').setAttribute('src', this.numbers[2]), 66);
        return this;
    }

    generateRandom() {
        // random between 0 and 5
        return Math.floor(Math.random() * 5);
    }

    areEqual(numbers) {
        const len = numbers.length;
        for (let i = 1; i < len; i++) {
            if (numbers[i] === null || numbers[i] !== numbers[i - 1])
                return false;
        }
        if (numbers[0] === 5) {
            this.account += 20;
        }
        if (numbers[0] === 1) {
            this.account += 100;
        }
        return true;
    }
}

const game = new Game();
const play = document.getElementById('play');
// play.addEventListener('click', () => game.play());
play.addEventListener('mouseover', () => game.spin());
play.addEventListener('mouseleave', () => game.stopSpin());
