let todos = []; // localStorage 를 사용하기 위한 저장용 배열

// 요소 선택
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

// 삭제 버튼 생성 함수
function createDeleteButton(todoText, li) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.backgroundColor = "crimson";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "4px";
    deleteBtn.style.padding = "4px 8px";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        list.removeChild(li);
        // 삭제 시 localStorage에서도 제거
        todos = todos.filter(t => t !== todoText);
        localStorage.setItem("todos", JSON.stringify(todos));
    });

    return deleteBtn;
}

// 할 일 항목 생성 함수
function createTodoItem(todoText) {
    const li = document.createElement("li");
    const deleteBtn = createDeleteButton(todoText, li);

    li.append(todoText, deleteBtn);

    li.addEventListener('click', function() {
        li.classList.toggle("completed");
    });

    list.appendChild(li);
}

// 제출 이벤트 감지
form.addEventListener('submit', function (event) {
    event.preventDefault();  // form의 기본 동작(새로고침)을 막는다. 'submit'의 기본 동작은 페이지 새로고침인데, 그걸 막아서 JS에서만 실행되도록.

    const todoText = input.value.trim();  // 입력값의 앞뒤 공백 제거
    if (todoText === "") return; // 입력값이 비어있다면 함수 종료

    createTodoItem(todoText); // 항목 생성

    input.value = ""; // 입력값을 초기화한다.

    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
});

window.addEventListener("DOMContentLoaded", function () {
    const saved = localStorage.getItem("todos");
    if (saved) {
        todos = JSON.parse(saved);
        todos.forEach(todoText => {
            createTodoItem(todoText);
        });
    }
});
