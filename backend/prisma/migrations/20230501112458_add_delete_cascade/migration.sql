-- DropForeignKey
ALTER TABLE "PlaylistMusic" DROP CONSTRAINT "PlaylistMusic_musicId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistMusic" DROP CONSTRAINT "PlaylistMusic_playlistId_fkey";

-- AddForeignKey
ALTER TABLE "PlaylistMusic" ADD CONSTRAINT "PlaylistMusic_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistMusic" ADD CONSTRAINT "PlaylistMusic_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;
