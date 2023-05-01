import { Injectable } from '@nestjs/common';
import { PlaylistMusic, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlaylistMusicService {
  constructor(private prisma: PrismaService) {}

  async playlistMusic(
    playlistMusicWhereUniqueInput: Prisma.PlaylistMusicWhereUniqueInput,
  ): Promise<PlaylistMusic | null> {
    return this.prisma.playlistMusic.findUnique({
      where: playlistMusicWhereUniqueInput,
    });
  }

  async playlistMusics(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlaylistMusicWhereUniqueInput;
    where?: Prisma.PlaylistMusicWhereInput;
    orderBy?: Prisma.PlaylistMusicOrderByWithRelationInput;
  }): Promise<PlaylistMusic[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.playlistMusic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        music: true,
      },
    });
  }

  async createPlaylistMusic(
    data: Prisma.PlaylistMusicCreateInput,
  ): Promise<PlaylistMusic> {
    return this.prisma.playlistMusic.create({
      data,
    });
  }

  async updatePlaylistMusic(params: {
    where: Prisma.PlaylistMusicWhereUniqueInput;
    data: Prisma.PlaylistMusicUpdateInput;
  }): Promise<PlaylistMusic> {
    const { data, where } = params;
    return this.prisma.playlistMusic.update({
      data,
      where,
    });
  }

  async deletePlaylistMusic(
    where: Prisma.PlaylistMusicWhereUniqueInput,
  ): Promise<PlaylistMusic> {
    return this.prisma.playlistMusic.delete({
      where,
    });
  }
}
