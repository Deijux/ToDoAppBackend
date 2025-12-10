import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}
  private readonly Tasks: Task[] = [];

  async create(task: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return await createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`No se encontró la tarea con el ID: ${id} `);
    }
    return task;
  }

  async update(id: string, task: Task): Promise<Task | null> {
    await this.findOne(id);
    return await this.taskModel
      .findOneAndUpdate({ _id: id }, task, { new: true })
      .exec();
  }

  async changeStatus(id: string): Promise<Task | null> {
    const task = await this.findOne(id);
    return await this.taskModel
      .findOneAndUpdate(
        { _id: id },
        { completed: !task.completed },
        { new: true },
      )
      .exec();
  }

  async delete(id: string) {
    await this.findOne(id);

    await this.taskModel.deleteOne({ _id: id }).exec();
  }
}
