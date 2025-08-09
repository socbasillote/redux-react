    // --- Actions ---
    const ADD_NOTE = "ADD_NOTE";
    const REMOVE_NOTE = "REMOVE_NOTE";
    const LOAD_NOTES = "LOAD_NOTES";

    const addNote = (text) => ({ type: ADD_NOTE, payload: text });
    const removeNote = (index) => ({ type: REMOVE_NOTE, payload: index });
    const loadNotes = (notes) => ({ type: LOAD_NOTES, payload: notes });

    // --- Reducer ---
    const initialState = { notes: [] };

    function notesReducer(state = initialState, action) {
      switch (action.type) {
        case ADD_NOTE:
          return { ...state, notes: [...state.notes, action.payload] };
        case REMOVE_NOTE:
          return { ...state, notes: state.notes.filter((_, i) => i !== action.payload) };
        case LOAD_NOTES:
          return { ...state, notes: action.payload };
        default:
          return state;
      }
    }

    // --- Middleware: Save to localStorage ---
    const saveToLocalStorage = store => next => action => {
      const result = next(action); // pass action down
      localStorage.setItem("notesAppState", JSON.stringify(store.getState()));
      return result;
    };

    // --- Create Store ---
    const store = Redux.createStore(
      notesReducer,
      Redux.applyMiddleware(saveToLocalStorage)
    );

    // --- Load saved notes on start ---
    const savedState = localStorage.getItem("notesAppState");
    if (savedState) {
      store.dispatch(loadNotes(JSON.parse(savedState).notes));
    }

    // --- UI ---
    const noteInput = document.getElementById("noteInput");
    const addBtn = document.getElementById("addBtn");
    const notesList = document.getElementById("notesList");

    function render() {
      const { notes } = store.getState();
      notesList.innerHTML = "";
      notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${note}</span>
          <button data-index="${index}" class="bg-red-300">❌</button>
        `;
        li.className = 'pl-2 border rounded-md'
        notesList.appendChild(li);
      });
    }

    // Subscribe to store updates
    store.subscribe(render);
    render();

    // Add note
    addBtn.addEventListener("click", () => {
      if (noteInput.value.trim() !== "") {
        store.dispatch(addNote(noteInput.value.trim()));
        noteInput.value = "";
      }
    });

    // Delete note
    notesList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const index = e.target.getAttribute("data-index");
        store.dispatch(removeNote(Number(index)));
      }
    });

    