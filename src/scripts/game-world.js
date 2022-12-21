import RESOURCES from "../data/resources.js"
import GameBlueprint from "./game-blueprint.js"

export default class GameWorld {
    constructor(blueprint = new GameBlueprint(-1)) {
        this.usePlan = false
        this.betweenSteps = false
        this.nextBlueprint = null
        this.setBlueprint(blueprint)
        this.plan = []
        this.reset()
    }
    
    setBlueprint(blueprint) {
        this.blueprint = blueprint
        this.costs = this.blueprint.getCosts()
    }
    
    endStep(step) {
        for (let resource of RESOURCES) {
            this.resources[resource] += this.robots[resource]
        }
    
        if (this.current > -1)
            this.robots[RESOURCES[this.current]] += 1
    
        this.betweenSteps = true
    
        this.step = step + 1

        if (this.usePlan)
            this.setNext(this.plan[this.step] ?? this.next)
        else
            this.setNext(this.next)

    }
    
    setCurrent(next) {
        this.current = next
    
        if (this.current > -1)
            for (let resource of RESOURCES) {
                if (this.costs[RESOURCES[this.current]][resource] > this.resources[resource]) {
                    this.current = -1
                    break
                }
            }
    }
    
    setNext(next) {
        this.next = next
        if (this.betweenSteps) {
            this.setCurrent(next)
            this.setPlanStep(this.step, next)
        } else
            this.setPlanStep(this.step + 1, next)
    }
    
    startStep(step) {
        this.betweenSteps = false
        this.plan[step] = this.next
        this.setCurrent(this.next)
        
        if (this.usePlan) {
            this.setNext(this.plan[step + 1] ?? this.next)
        }
    
        if (this.current > -1) {
            for (let resource of RESOURCES) {
                this.resources[resource] -= this.costs[RESOURCES[this.current]][resource] ?? 0
            }
        }
    }
    
    setPlanStep(id, value) {
        if (this.plan[id] === value)
            return
        this.plan[id] = value
        
        if (this.usePlan) {
            if (this.betweenSteps && id === this.step || !this.betweenSteps && id === this.step + 1)
                this.setNext(value)
        }
    }
    
    advance(step, final) {
    
    }
    
    reset() {
        this.resources = {
            ore : 0,
            clay : 0,
            obsidian : 0,
            geode : 0,
        }
        this.robots = {
            ore : 1,
            clay : 0,
            obsidian : 0,
            geode : 0,
        }
        this.betweenSteps = true
        this.step = 0
        this.setNext(0)
    }
    
    end() {
        this.setBlueprint(this.nextBlueprint ?? this.blueprint)
        delete this.nextBlueprint
    }
    
    save(blueprints) {
        return {
            ...this,
            blueprint : blueprints.indexOf(this.blueprint),
            nextBlueprint : blueprints.indexOf(this.blueprint)
        }
    }
    
    load(data, blueprints) {
        Object.assign(this, data)
        this.blueprint = blueprints[this.blueprint]
        this.nextBlueprint = blueprints[this.nextBlueprint]
        return this
    }
}
