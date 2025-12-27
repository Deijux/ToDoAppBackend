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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

interface reqCreate extends Request {
  user?: JwtPayload;
}

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all tasks of the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'List of user tasks returned successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - User not authenticated',
  })
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
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '66a12f8a8c9b123456789abc',
  })
  @ApiResponse({
    status: 200,
    description: 'Task found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - User not authenticated',
  })
  async create(
    @Req() req: reqCreate,
    @Body() task: CreateTaskDto,
  ): Promise<Task> {
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
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '66a12f8a8c9b123456789abc',
  })
  @ApiBody({})
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async update(@Param('id') id: string, @Body() task: Task) {
    return this.tasksService.update(id, task);
  }

  @Patch('/status/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle task completed status' })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '66a12f8a8c9b123456789abc',
  })
  @ApiResponse({
    status: 200,
    description: 'Task status updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async changeStatus(@Param('id') id: string) {
    return this.tasksService.changeStatus(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
