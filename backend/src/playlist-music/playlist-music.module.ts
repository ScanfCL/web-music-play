import { Module } from '@nestjs/common';
import { PlaylistMusicController } from './playlist-music.controller';
import { PlaylistMusicService } from './playlist-music.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PlaylistMusicController],
  providers: [PlaylistMusicService, PrismaService],
})
export class PlaylistMusicModule {}
