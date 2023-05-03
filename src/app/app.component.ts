import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from './todo/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  idCounter = 1;
  todos: Map<number, Todo> = new Map();
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
    this.todos.set(this.idCounter, {id: this.idCounter, title: newTodo});
    this.idCounter++;
    this.todoForm.reset();
  }

  onDelete(todoId: number) {
    this.todos.delete(todoId);
  }

  onEdit(editTodo: Todo) {
    this.todos.set(editTodo.id, editTodo);
  }
}
