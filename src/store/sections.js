export default {
    state: {
        sections: [],
        target: null
    },
    mutations: {
        updateSections(state, data) {
            state.sections.push(data)
            localStorage.sections = JSON.stringify(state.sections)
        },
        updateTarget(state, id) {
            state.target = id
            localStorage.sections = JSON.stringify(state.sections)
        },
        updateMessages(state, message) {
            state.sections.find(section => section.id === state.target).messages.push(message)
            localStorage.sections = JSON.stringify(state.sections)
        }
    },
    getters: {
        getSections(state) {
            return state.sections
        },
        getTarget(state) {
            return state.target
        },
        getTargetMessages(state) {
            if (!state.target) {
                return null
            }

            return state.sections.find(section => section.id === state.target).messages
        }
    },
    actions: {
        addSection({ state, commit }, sectionName) {
            if (sectionName.trim().length === 0) return
            if (state.sections.find(section => section.id === sectionName)) return
            commit("updateSections", { id: sectionName, messages: [] })
        },
        addMessage({ state, commit }, message) {
            if (message.trim().length === 0) return

            const messageCounter = state.sections.find(section => section.id === state.target).messages.length
            const dateOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric'
            }
            const data = {
                message,
                id: `Q${messageCounter + 1}`,
                dateCreated: new Date().toLocaleString("ru", dateOptions)
            }

            commit("updateMessages", data)
        },
        setTarget({ commit }, id) {
            commit("updateTarget", id)
        },
        uploadSectionsFromStorage({ state, commit }) {
            const storageSections = localStorage.sections

            if (storageSections) {
                const storageSectionsArray = JSON.parse(localStorage.sections)
                state.sections = storageSectionsArray
                state.target = storageSectionsArray[0].id
            } else {
                localStorage.sections = JSON.stringify([])
            }
        }
    }
}