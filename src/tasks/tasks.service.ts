import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interface/task.interface';
import { CreateTaskDto } from './dto/createTask.dto';

@Injectable()
export class TasksService {
  private readonly Tasks: Task[] = [];

  create(task: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.Tasks.length + 1,
      title: task.title,
      description: task?.description,
      completed: false,
    };
    this.Tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.Tasks;
  }

  findOne(id: number): Task | undefined {
    return this.Tasks.find((task) => task.id === id);
  }

  update(id: number, task: Task) {
    const index = this.Tasks.findIndex((t) => t.id === id);

    if (index === -1) throw new NotFoundException(`Tarea no existe`);

    const updatedTask = {
      ...this.Tasks[index],
      ...task,
    };
    this.Tasks[index] = updatedTask;
    return updatedTask;
  }

  changeStatus(id: number): Task {
    const task = this.Tasks.find((task) => task.id === id);

    if (!task) throw new NotFoundException(`Tarea no existe`);

    task.completed = !task.completed;
    return task;
  }

  delete(id: number) {
    const task = this.Tasks.find((task) => task.id === id);

    if (!task) throw new NotFoundException(`Tarea no existe`);

    const taskIndex = this.Tasks.findIndex((task) => task.id === id);
    this.Tasks.splice(taskIndex, 1);
  }
}
