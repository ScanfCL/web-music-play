import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistModule } from './playlist/playlist.module';
import { MusicModule } from './music/music.module';
import { PlaylistMusicModule } from './playlist-music/playlist-music.module';

@Module({
  imports: [PlaylistModule, MusicModule, PlaylistMusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
