import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Todo } from './todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
    @Input() todo!: Todo;
    @Output() deleteTodoEvent = new EventEmitter<number>();
    @Output() editTodoEvent = new EventEmitter<Todo>();

    isEdit = false;
    todoForm!: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.todoForm = this.fb.group({
            editTodo: [this.todo.title]
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
            title: editTodo
        }
        this.editTodoEvent.emit(newTodo)
    }
}
