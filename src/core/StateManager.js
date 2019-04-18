export default class StateManager {

    static STATE = "something"
    
    /**
     * 
     * @param {Array<string>} states 
     */
    constructor(states) {
        this.states = states || []
        this.active = null
    }

    add(states) {
        states = states instanceof Array ? states : [states];
        this.states = this.states.concat(states);
    }

    exists(state) {
        return this.states.findIndex(state) > -1;
    }

    isActive(state) {
        return this.active === state;
    }

}
