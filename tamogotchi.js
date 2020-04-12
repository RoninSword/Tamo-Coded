//made a Tamogotchi class for conversion from ES5 to ES
//Michael Bradley 100549812
class Tamogotchi {
    constructor(tamoName) {
        this.petName;
        this.initialFood = 100;
        this.metabolismRate = 1000;
        this.alive = false;
        //adding the fetchData to link my json info
        this.fetchData();
        this.init = () => {
            this.petName = tamoName;
            var content = `Hi! I'm ${this.petName}`;
            document.getElementById('words').innerHTML = content;
            console.log(content);
            this.alive = true;
            this.hatch();

        }

    }


    resetFood() {
        this.food = this.initialFood;
    }



    die() {
        clearInterval(this.metabolism);
        document.getElementById('words').innerHTML = "I am Dead!"
        console.log("I am dead!");
        this.alive = false;
        TweenMax.killAll();
    }

    hatch() {
        this.resetFood();
        this.startMetabolism();
    }




    startMetabolism() {
        this.metabolism = setInterval(() => {
            this.food -= 1;
            console.log(`${this.food} until I starve`);
            let content = `${this.food} until I starve`;
            document.getElementById('Fword').innerHTML = content;
            if (this.food <= 0) {
                this.die();
            }
        }, this.metabolismRate);
    }

    drinkBeer() {
        if (this.food > 0) {
            console.log("Yum! Beer!");
            document.getElementById('words').innerHTML = "Yum! Beer!";
            document.getElementById('status').innerHTML = `Metabolism changed to 5000!`
            this.changeMetabolism(5000);
        } else {
            console.log("the dead do not drink beer!");
            alert("The dead do not drink beer!");
        }
    }

    drinkCoffee() {
        if (this.food > 0) {
            console.log("Yum! Coffee!");
            document.getElementById('words').innerHTML = "Yum! Coffee!";
            document.getElementById('status').innerHTML = `Metabolism changed to 500!`
            this.changeMetabolism(500);
        } else {
            console.log("the dead do not drink coffee!");
            alert("The dead do not drink coffee");
        }
    }



    changeMetabolism(newRate) {
        console.log("metabolism changed");
        clearInterval(this.metabolism);
        this.metabolismRate = newRate;
        this.startMetabolism();
    }

    eatFood() {
        if (this.food > 0) {
            const chosenFood = this.foods[Math.floor(Math.random() * this.foods.length)];
            const isPoisoned = Math.random() < chosenFood.foodPoisoning;
            if (isPoisoned == true) {
                this.food -= chosenFood.foodValue;
                console.log(`Yuck!  I just threw up ${chosenFood.foodValue} from eating ${chosenFood.foodName}`);
                document.getElementById('words').innerHTML = `Yuck!  I just threw up ${chosenFood.foodValue} from eating ${chosenFood.foodName}`;
                document.getElementById('status').innerHTML = "Food poisoning";
            } else {
                this.food += chosenFood.foodValue;
                console.log(`Woot!  I just got ${chosenFood.foodValue} from eating ${chosenFood.foodName}`);
                document.getElementById('words').innerHTML = `Woot!  I just got ${chosenFood.foodValue} from eating ${chosenFood.foodName}`;
                document.getElementById('status').innerHTML = "Fine";
            }
        }
    }

    speak(mood) {
        const moodyPhrases = this.sayings.filter(saying => saying.mood == mood);
        if (moodyPhrases.length > 0) {
            const moodyPhrase = moodyPhrases[Math.floor(Math.random() * moodyPhrases.length)];
            document.getElementById('words').innerHTML = moodyPhrase.saying;
            console.log(moodyPhrase.saying);
        } else {
            document.getElementById('words').innerHTML = "uh, what?"
            console.log("uh, what?");
        }
    }

    wooMe(compName) {
        let sentence = this.compliments[Math.floor(Math.random() * this.compliments.length)];
        let updatedSentence = sentence.replace(/bork/g, compName);
        console.log(updatedSentence);
        document.getElementById('words').innerHTML = updatedSentence;
    }

    //linking json for external data
    fetchData() {
        fetch('data/tamaData.json')
            .then(data => data.json())
            .then(data => {
                this.sayings = data.sayings;
                this.compliments = data.compliments;
                this.foods = data.foods;
            });
    }
}




window.onload = function () {
        //retrieve character 2 from the dom
        let char = document.getElementById('character').contentDocument;

        //declare character two variables
        //tie
        let char_tie = char.getElementById('Tie');
        //eyes, pupil and brow
        let char_EyeR_Full = char.getElementById('EyeR');
        let char_EyeL_Full = char.getElementById('EyeL');
        //pupils
        let char_PupilL = char.getElementById('PupilL');
        let char_PupilR = char.getElementById('PupilR');
        //dead eyes
        let char_deadL = char.getElementById('DeadL');
        let char_deadR = char.getElementById('DeadR');
        //brows
        let char_BrowR = char.getElementById('BrowR');
        let char_BrowL = char.getElementById('BrowL');
        //nose
        let char_nose = char.getElementById('Nose');
        //mouth
        let char_mouth = char.getElementById('Mouth');

        TweenMax.set(char_nose, {
            transformOrigin: "center center"
        })
        TweenMax.set(char_mouth, {
            transformOrigin: "center center"
        })
        TweenMax.set(char_EyeL_Full, {
            transformOrigin: "center center"
        })
        TweenMax.set(char_EyeR_Full, {
            transformOrigin: "center center"
        })
        TweenMax.set(char_BrowR, {
            transformOrigin: "center center"
        })
        TweenMax.set(char_BrowR, {
            transformOrigin: "center center"
        })

        TweenMax.set(char_tie, {
            transformOrigin: "center center"
        })


        var james = new Tamogotchi("James");




        document.getElementById('alive').onclick = function () {
           

            james.init();


            TweenMax.set(char_deadL, {
                opacity: 0
            })
            TweenMax.set(char_deadR, {
                opacity: 0
            })

            TweenMax.to(char_EyeL_Full, 2, {
                scaleY: 0,
                repeat: -1,
                yoyo: james.alive,
                rotation: 0
            })
            TweenMax.to(char_EyeR_Full, 1.5, {
                scaleY: 0,
                repeat: -1,
                yoyo: james.alive,
                rotation: 0
            })







        }

        document.getElementById('compliment').onclick = function () {

            var FName = document.getElementById('FirstName').value;
            james.wooMe(FName);

        }
        document.getElementById('beer').onclick = function () {
            james.drinkBeer();
        }
        document.getElementById('coffee').onclick = function () {
            james.drinkCoffee();
        }

        document.getElementById('food').onclick = function () {
            james.eatFood();
        }

        document.getElementById('speak').onclick = function () {
            if (document.getElementById('happy').checked == true) {
                james.speak("happy");
                Speaker("happy");
            } else if (document.getElementById('sad').checked == true) {
                james.speak("sad");
                Speaker("sad");
            } else if (document.getElementById('angry').checked == true) {
                james.speak("angry");
                Speaker("angry");
            } else {
                document.getElementById('neutral').checked == true;
                james.speak("neutral");
                Speaker("neutral");
            }
        }

        function Speaker(mood) {
            if (mood == "happy") {
                TweenMax.to(char_EyeL_Full, 1, {
                    rotation: 0,
                    fill: "none"
                })
                TweenMax.to(char_EyeR_Full, 1, {
                    rotation: 0,
                    fill: "none"
                })
                TweenMax.to(char_mouth, 0.4, {
                    scaleY: 1
                })
                TweenMax.to(char_mouth, 0.5, {
                    scaleY: 4,
                    repeat: 4,
                    yoyo: true,
                    delay: 1
                })
                TweenMax.to(char_mouth, 0.5, {
                    scaleY: 1,
                    delay: 3
                })
                TweenMax.to(char_nose, 1, {
                    rotation: 360
                })
                TweenMax.to(char_nose, 1, {
                    rotation: 0,
                    delay: 1.1
                })
                TweenMax.to(char_tie, 1, {
                    rotation: 360,

                })
                TweenMax.to(char_tie, 1, {
                    rotation: 0,
                    delay: 1.1
                })

            } else if (mood == "sad") {
                TweenMax.to(char_EyeL_Full, 1, {
                    rotation: -45
                })
                TweenMax.to(char_EyeR_Full, 1, {
                    rotation: 45
                })
                TweenMax.to(char_mouth, 0.5, {
                    scaleY: -2,
                    repeat: 4,
                    yoyo: true,
                    delay: 1
                })
                TweenMax.to(char_EyeL_Full, 2, {
                    attr: {
                        fill: "blue"
                    }
                })
                TweenMax.to(char_EyeR_Full, 2, {
                    attr: {
                        fill: "blue"
                    }
                })
            } else if (mood == "angry") {
                TweenMax.to(char_EyeL_Full, 1, {
                    rotation: 45
                })
                TweenMax.to(char_EyeR_Full, 1, {
                    rotation: -45
                })
            } else {
                TweenMax.to(char_EyeL_Full, 1, {
                    rotation: -90
                })
                TweenMax.to(char_EyeR_Full, 1, {
                    rotation: 90
                })
            }
        }

        function Deader() {
            TweenMax.set(char_EyeL_Full, {
                scaleY: 1,
                opacity: 0
            })
            TweenMax.set(char_EyeR_Full, {
                scaleY: 1,
                opacity: 0
            })

            TweenMax.set(char_deadL, {
                opacity: 1
            })
            TweenMax.set(char_deadR, {
                opacity: 1
            })

        }

    }