import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { Music as MusicModel } from '@prisma/client';

@Controller()
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('music/:id')
  async getMusicById(@Param('id') id: string): Promise<MusicModel> {
    return this.musicService.music({ id: Number(id) });
  }

  @Get('musics')
  async getMusics(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search: string,
  ): Promise<MusicModel[]> {
    return this.musicService.musics({
      page: Number(page),
      perPage: Number(perPage),
      search,
    });
  }

  @Post('music')
  async createMusic(
    @Body()
    musicData: {
      title: string;
      artist: string;
      album: string;
      duration: number;
      musicUrl: string;
    },
  ): Promise<MusicModel> {
    return this.musicService.createMusic(musicData);
  }

  @Post('music-update')
  async updateMusic(
    @Body()
    musicData: {
      id: number;
      title: string;
      artist: string;
      album: string;
      duration: number;
      musicUrl: string;
    },
  ): Promise<MusicModel> {
    const { id, ...music } = musicData;

    return this.musicService.updateMusic({
      where: { id },
      data: music,
    });
  }

  @Delete('music/:id')
  async deleteMusic(@Param('id') id: string): Promise<MusicModel> {
    return this.musicService.deleteMusic({ id: Number(id) });
  }
}
