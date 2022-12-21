import BLUEPRINTS from "../data/blueprints.js"

export default class GameBlueprint {
    constructor(level) {
        this.roll(level)
        this.locked = false
    }
    
    roll(level = -1) {
        if (level === -1)
            this.data = [4,2,3,14,2,7] // AOC 2022 day 19 first example, level 1, 9 tops
        else {
            const levelBlueprints = BLUEPRINTS[Math.min(BLUEPRINTS.length - 1, level)]
            this.data = levelBlueprints[Math.random() * levelBlueprints.length | 0]
        }
    
        this.updateCosts()
    }
    
    updateCosts() {
        this.costs = {
            ore : {
                ore : this.data[0],
            },
            clay : {
                ore : this.data[1],
            },
            obsidian : {
                ore : this.data[2],
                clay : this.data[3],
            },
            geode : {
                ore : this.data[4],
                obsidian : this.data[5],
            }
        }
    }
    
    getCosts() {
        return this.costs
    }
    
    save() {
        return this.data
    }
    
    load(data) {
        this.data = data
        this.updateCosts()
        return this
    }
}
