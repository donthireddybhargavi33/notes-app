export const notesReducer = (state, {type, payload}) => {
switch (type) {
    case 'TITLE':
    return {
        ...state,
        title: payload
    };
    case 'TEXT':
    return {
        ...state,
        text: payload
    };
    case 'ADD_NOTE':
    return {
        ...state,
        notes: [...state.notes, { title: state.title, text: state.text, id: state.notes.length}],
        title: '',
        text: ''
    };
    case 'DELETE_NOTE':
    return {
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
    };
    
    case 'ARCHIVE_NOTE':
    return {
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
    };
    default:
    return state;
}
}