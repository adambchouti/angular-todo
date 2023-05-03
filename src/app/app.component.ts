import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from './model/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  idCounter = 1;
  todos: Array<Todo> = [];
  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.todoForm = this.fb.group({
        newTodo: ['']
    })
  }

  onSubmit() {
    const { newTodo } = this.todoForm.value;
    this.todos.push({
        id: this.idCounter,
        name: newTodo
    });
    this.idCounter++;
    this.todoForm.reset();
  }

  onDelete(todoId: number) {
    const filteredTodos = this.todos.filter(todo => todo.id !== todoId);
    this.todos = filteredTodos;
  }

  onEdit(editTodo: Todo) {
    this.todos = this.todos.map(todo => {
        if (todo.id === editTodo.id) {
            return editTodo;
        }
        return todo;
    });
  }
}
