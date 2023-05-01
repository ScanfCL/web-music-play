import { Injectable } from '@nestjs/common';
import { Playlist, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) {}

  async playlist(
    playlistWhereUniqueInput: Prisma.PlaylistWhereUniqueInput,
  ): Promise<Playlist | null> {
    return this.prisma.playlist.findUnique({
      where: playlistWhereUniqueInput,
    });
  }

  async playlists(params: {
    page: number;
    perPage: number;
  }): Promise<Playlist[]> {
    const { page, perPage } = params;
    return this.prisma.playlist.findMany({
      orderBy: {
        id: 'asc',
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  async createPlaylist(data: Prisma.PlaylistCreateInput): Promise<Playlist> {
    return this.prisma.playlist.create({
      data,
    });
  }

  async updatePlaylist(params: {
    where: Prisma.PlaylistWhereUniqueInput;
    data: Prisma.PlaylistUpdateInput;
  }): Promise<Playlist> {
    const { data, where } = params;
    return this.prisma.playlist.update({
      data,
      where,
    });
  }

  async deletePlaylist(
    where: Prisma.PlaylistWhereUniqueInput,
  ): Promise<Playlist> {
    return this.prisma.playlist.delete({
      where,
    });
  }
}
