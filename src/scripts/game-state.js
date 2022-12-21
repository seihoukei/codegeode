import GameWorld from "./game-world.js"
import GameBlueprint from "./game-blueprint.js"

export default class GameState {
    constructor() {
        this.hardReset()
    }

    hardReset() {
        this.worlds = []
        this.autoStep = false
        this.autoReset = false
        this.lastSave = performance.now()
        this.paused = true
        this.betweenSteps = true
        this.dialog = ""
        this.hideMaxed = false
//        this.advanceOnSelect = true
        this.breakpoints = []
        this.blueprints = [
            new GameBlueprint(-1),
            new GameBlueprint(-1)
        ]
        this.resources = {
            minerals : 0,
            energy : 0,
        }
        this.purchases = {
//            steps : 24,
//            speed : 50,
//            speed : 20,
//            worlds : 2,
//            autoReset : 1,
//            autoStep : 1,
//            breakpoints : 1,
//            planning : 1,
//            blueprints : 5,
//            worlds : 3,
        }
        this.end = {}
        
        this.reset()
    }
    
    reset() {
        this.updateRules()
        this.step  = 0
        this.stepProgress = 0
        while (this.worlds.length < this.rules.worlds)
            this.worlds.push(new GameWorld(this.worlds[this.worlds.length - 1]?.blueprint ?? this.blueprints[0] ?? new GameBlueprint(-1)))
        
        for (let world of this.worlds)
            world.reset()
    }
    
    setDialog(dialog) {
        if (this.dialog === dialog)
            this.dialog = ""
        else
            this.dialog = dialog
    }
    
    finished() {
        return this.step >= this.rules.steps
    }
    
    running() {
        return !this.paused && !this.finished()
    }
    
    unpause() {
        if (this.paused && this.betweenSteps && !this.finished()) {
            this.paused = false
            this.startStep(this.step)
        }
    }
    
    toggleBreakpoint(step) {
        this.breakpoints[step] = !this.breakpoints[step]
        this.breakpoints.length = this.rules.steps
    }
    
    advance(delta) {
        let progress = this.stepProgress + delta / this.rules.stepTime
    
        while (progress > 1 && this.running()) {
            this.stepProgress = 1
            this.endStep()
            
            this.step++
            this.stepProgress = 0
            
            if (this.autoStep && !this.finished() && !this.breakpoints[this.step]) {
                this.startStep()
            } else {
                this.paused = true
                this.autoStep = false
                if (this.finished())
                    this.endLoop()
            }
            
            progress -= 1
        }
    
        if (this.running())
            this.stepProgress = progress
        
        if (this.lastSave < performance.now() - 15000)
            this.saveState("codegeode_autosave")
    }
    
    endStep() {
        for (let world of this.worlds) {
            world.endStep(this.step)
        }
        this.betweenSteps = true
    }
    
    startStep() {
        this.betweenSteps = false
        for (let world of this.worlds) {
            world.startStep(this.step)
        }
    }
    
    resetLoop() {
        this.endStep()
        for (let world of this.worlds) {
            world.end()
        }
        this.autoStep = false
        this.paused = true
        this.reset()
    }
    
    updateRules() {
        this.rules = {
            steps: 24 + (this.purchases.steps ?? 0),
            stepTime : 5000 * 0.9 ** (this.purchases.speed ?? 0),
            worlds : 1 + (this.purchases.worlds ?? 0),
            blueprints : 2 + (this.purchases.blueprints ?? 0),
            blueprintQuality : 1 + (this.purchases.quality ?? 0),
            geodeMulti : 1 + (this.purchases.geodeMulti ?? 0) * 0.2,
            canUsePlan : this.purchases.planning,
            canAutoStep : this.purchases.autoStep,
            canAutoReset : this.purchases.autoReset,
            canBreakpoint : this.purchases.breakpoints,
        }
    }
    
    endLoop() {
        this.end.geodes = 0
    
        for (let world of this.worlds) {
            world.end()
            this.end.geodes += world.resources.geode
        }
        this.end.minerals = 1 + this.end.geodes * this.rules.geodeMulti
        this.resources.minerals += this.end.minerals
        
        if (this.worlds.length > 1) {
            this.end.energy = this.worlds.reduce((v,x) => v * x.resources.geode, 1)
            this.resources.energy += this.end.energy
        }
        
        this.end.blueprints = 0
        for (let i = 0; i < this.rules.blueprints; i++) {
            const blueprint = this.blueprints[i] = this.blueprints[i] ?? new GameBlueprint(0)
            if (blueprint.locked || this.worlds.find(x => x.blueprint === blueprint))
                continue
            blueprint.roll(7 * Math.random() ** (5 / this.rules.blueprintQuality) | 0)
            this.end.blueprints += 1
        }
        
        if (this.rules.canAutoReset && this.autoReset) {
            this.reset()
            this.autoStep = true
            this.unpause()
        }
    }
    
    saveState(state="codegeode_customsave") {
        localStorage[state] = this.save()
        this.lastSave = performance.now()
    }
    
    save() {
        return btoa(JSON.stringify({
            data : this,
            time : Date.now()
        }))
    }
    
    toJSON() {
        return {
            ...this,
            worlds : this.worlds.map(x => x.save(this.blueprints)),
            blueprints : this.blueprints.map(x => x.save()),
        }
    }
    
    loadState(state="codegeode_customsave") {
        const save = localStorage[state]
        if (!save)
            return
        
        this.load(save)
    }
    
    load(save) {
        try {
            const json = atob(save)
            const data = JSON.parse(json)
    
            this.worlds.length = 0
            this.blueprints.length = 0
    
            this.hardReset()

            console.log(data)
        
            const blueprints = data.data.blueprints.map(data => new GameBlueprint().load(data))
            const worlds =  data.data.worlds.map(data => new GameWorld().load(data, blueprints))
        
        
            Object.assign(this, {
                ...data.data,
                blueprints, worlds
            })
            
            this.setDialog("")
    
            this.lastSave = performance.now()
            
            const delta = Date.now() - data.time
            if (delta > 0)
                this.advance(delta)
            
        } catch(e) {
            alert(`Failed to load: ${e}`)
            this.hardReset()
        
        }
    }
}
