const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");

// localStorage se purane tasks load karo
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      save();
      render();
    });

    // task par click karne se done/undone
    li.addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      save();
      render();
    });

    li.append(span, delBtn);
    list.appendChild(li);
  });

  const pending = todos.filter((t) => !t.done).length;
  counter.textContent = `${pending} pending / ${todos.length} total`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  input.value = "";
  save();
  render();
});

render();
