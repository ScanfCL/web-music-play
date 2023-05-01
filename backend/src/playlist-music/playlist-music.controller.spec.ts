import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistMusicController } from './playlist-music.controller';

describe('PlaylistMusicController', () => {
  let controller: PlaylistMusicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistMusicController],
    }).compile();

    controller = module.get<PlaylistMusicController>(PlaylistMusicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
