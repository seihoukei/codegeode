const PURCHASES = {
    autoStep: { //done
        name : "Autostep",
        description: "Game advances until paused or finished",
        cost : 1,
        scale : 0,
    },
    planning : { //done
        name : "Build plan",
        description : "Remember last used building directions",
        cost : 5,
        scale : 0,
        requires: {autoStep:1},
    },
    breakpoints : { //done
        name : "Breakpoints",
        description : "Click a step to make a stop right before it",
        cost : 5,
        scale : 0,
        requires: {autoStep:1},
    },
    autoReset : { //done
        name : "Autoreset",
        description : "Game resets automatically at the end of run",
        cost : 10,
        scale : 0,
        requires: {autoStep:1},
    },

    geodeMulti : { //done
        name : "Minerals per geode +0.2",
        description : "Additive minerals bonus",
        cost : 5,
        scale : 1.2,
        max : 100,
    },
    steps : { //done
        name : "Steps + 1",
        description: "One more step before the world ends",
        cost : 5,
        scale : 1.5,
        max : 24
    },
    speed : { //done
        name: "Step duration * 0.9",
        description: "Multiplicative step acceleration",
        cost : 2,
        scale : 1.5,
        max : 50,
    },
    blueprints : { //done
        name: "Blueprint slots +1",
        description : "More slots to roll, better chances",
        cost : 4,
        scale : 1.5,
        max : 9,
    },
    quality : { //done
        name: "Better blueprints",
        description : "Improves chances to get a good blueprint",
        cost : 10,
        scale : 5,
        max : 10,
    },
    worlds : { //done ?
        name: "Worlds + 1",
        description : "More worlds running in parallel",
        cost : 100,
        scale : 10,
        requires: {blueprints:4},
        max : 4,
    },
}

export default PURCHASES
