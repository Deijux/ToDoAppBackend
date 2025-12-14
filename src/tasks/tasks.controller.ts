import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './interface/task.interface';
import { CreateTaskDto } from './dto/createTask.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/auth/interface/jwtPayload.interface';

interface reqCreate extends Request {
  user?: JwtPayload;
}

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: reqCreate): Promise<Task[]> {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException(
        'No se obtuvo el usuario al buscar tareas',
      );
    }
    return this.tasksService.findUserTasks(user.sub);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: reqCreate, @Body() task: CreateTaskDto) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException(
        'No se obtuvo el usuario al crear la tarea',
      );
    }
    return this.tasksService.create(task, user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() task: Task) {
    return this.tasksService.update(id, task);
  }

  @Patch('/status/:id')
  @HttpCode(HttpStatus.OK)
  changeStatus(@Param('id') id: string) {
    return this.tasksService.changeStatus(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
