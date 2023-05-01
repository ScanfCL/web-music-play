import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { PlaylistMusicService } from './playlist-music.service';
import { PlaylistMusic as PlaylistMusicModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class PlaylistMusicController {
  constructor(
    private readonly playlistMusicService: PlaylistMusicService,
    private prisma: PrismaService,
  ) {}

  @Get('playlist-music/:id')
  async getPlaylistMusicById(
    @Param('id') id: string,
  ): Promise<PlaylistMusicModel[]> {
    return this.playlistMusicService.playlistMusics({
      where: {
        playlistId: Number(id),
      },
    });
  }

  @Post('playlist-music')
  async createPlaylistMusic(
    @Body()
    playlistMusicData: {
      playlistId: number;
      musicId: number;
    },
  ): Promise<PlaylistMusicModel> {
    const foundMusicPlaylist = await this.prisma.playlistMusic.findFirst({
      where: {
        musicId: Number(playlistMusicData.musicId),
        playlistId: Number(playlistMusicData.playlistId),
      },
    });

    if (foundMusicPlaylist) {
      throw new BadRequestException('Music already in playlist');
    }

    return this.playlistMusicService.createPlaylistMusic({
      playlist: {
        connect: {
          id: Number(playlistMusicData.playlistId),
        },
      },
      music: {
        connect: {
          id: Number(playlistMusicData.musicId),
        },
      },
    });
  }

  @Post('playlist-music-delete')
  async deletePlaylistMusic(
    @Body() data: { musicId: number; playlistId: number },
  ): Promise<PlaylistMusicModel> {
    const { musicId, playlistId } = data;

    const foundMusicPlaylist = await this.prisma.playlistMusic.findFirst({
      where: {
        musicId: Number(musicId),
        playlistId: Number(playlistId),
      },
    });

    if (!foundMusicPlaylist) {
      throw new BadRequestException('Music not in playlist');
    }

    return this.playlistMusicService.deletePlaylistMusic({
      id: Number(foundMusicPlaylist.id),
    });
  }
}
