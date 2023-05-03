import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../model/todo';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
    @Input() todo: Todo = {id: 1, name: ''};
    @Output() deleteTodoEvent = new EventEmitter<number>();
    @Output() editTodoEvent = new EventEmitter<Todo>();

    isEdit = false;
    todoForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.todoForm = this.fb.group({
            editTodo: ['']
        })
    }

    onDeleteTodo() {
        this.deleteTodoEvent.emit(this.todo.id);
    }

    onEditTodo() {
        this.isEdit = !this.isEdit;
    }

    onSubmit() {
        const { editTodo } = this.todoForm.value;
        if (editTodo === '') {
            return;
        }
        this.onEditTodo();
        const newTodo = {
            id: this.todo.id,
            name: editTodo
        }
        this.editTodoEvent.emit(newTodo)
    }
}
