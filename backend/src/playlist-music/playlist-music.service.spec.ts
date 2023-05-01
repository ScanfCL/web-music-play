import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistMusicService } from './playlist-music.service';

describe('PlaylistMusicService', () => {
  let service: PlaylistMusicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistMusicService],
    }).compile();

    service = module.get<PlaylistMusicService>(PlaylistMusicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
