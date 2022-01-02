import create from "zustand"
import produce from "immer";

const store = create(set => ({
    socket: null,
    updateSocket: ( val ) => set(produce(state => {
        state.socket = val;
    }))
}))

export default store;