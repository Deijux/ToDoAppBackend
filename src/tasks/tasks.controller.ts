import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './interface/task.interface';
import { CreateTaskDto } from './dto/createTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @HttpCode(200)
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() task: CreateTaskDto) {
    return this.tasksService.create(task);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id', ParseIntPipe) id: number, @Body() task: Task) {
    return this.tasksService.update(id, task);
  }

  @Patch('/status/:id')
  @HttpCode(200)
  changeStatus(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.changeStatus(id);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }
}
