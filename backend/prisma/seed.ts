import { Prisma, PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

const musics: Prisma.MusicCreateInput[] = [
  {
    title: 'อยู่ในสาย - Three Man Down ( Acoustics Live Session )',
    artist: 'ThreeManDown',
    album: '-',
    duration: 250,
    musicUrl:
      'https://www.youtube.com/watch?v=0PJXABkd9Vw&ab_channel=ThreeManDownOfficial',
    createdDate: new Date('05/21/2021'),
  },
  {
    title: 'คิด(แต่ไม่)ถึง x ฝนตกไหม - Three Man Down Live เพลงสามัญประจำบ้าน',
    artist: 'ThreeManDown',
    album: '-',
    duration: 250,
    musicUrl:
      'https://www.youtube.com/watch?v=aGXBiIMTIA4&ab_channel=ThreeManDownOfficial',
    createdDate: new Date('04/10/2020'),
  },
  {
    title: 'ถ้าเธอรักฉันจริง - Three Man Down |Official MV|',
    artist: 'ThreeManDown',
    album: '-',
    duration: 315,
    musicUrl: 'https://www.youtube.com/watch?v=JBAuRoIRAs8&ab_channel=GeneLab',
    createdDate: new Date('12/15/2020'),
  },
  {
    title: 'ปล่อยปาก - Atom ชนกันต์ [Official MV]',
    artist: 'Atom ชนกันต์',
    album: '-',
    duration: 312,
    musicUrl:
      'https://www.youtube.com/watch?v=R3lv0thFNrc&ab_channel=OfficialWhiteMusic',
    createdDate: new Date('05/13/2021'),
  },
  {
    title: 'มีปัญหาปรึกษาดาว - SERIOUS BACON [ Official Audio ]',
    artist: 'SERIOUS BACON',
    album: '-',
    duration: 238,
    musicUrl:
      'https://www.youtube.com/watch?v=O8sp-JThQCA&ab_channel=BOXXMUSIC',
    createdDate: new Date('04/26/2021'),
  },
  {
    title: 'ลืมได้แล้ว',
    artist: 'O-PAVEE',
    album: 'ลืมได้แล้ว - Single',
    duration: 250,
    musicUrl:
      'https://www.youtube.com/watch?v=QHWUiLrG2No&ab_channel=BOXXMUSIC',
    createdDate: new Date('06/25/2020'),
  },
  {
    title: 'เจ้าของที่ (My Favorite)',
    artist: 'Mirr',
    album: '-',
    duration: 282,
    musicUrl: 'https://www.youtube.com/watch?v=5xYlc4OBnPg',
    createdDate: new Date('03/10/2022'),
  },
  {
    title: 'แพ้ความอ่อนแอ',
    artist: 'Silly fools',
    album: '-',
    duration: 347,
    musicUrl:
      'https://www.youtube.com/watch?v=8ZuEUIaiJi0&ab_channel=MERECORDS',
    createdDate: new Date('10/20/2021'),
  },
  {
    title: 'ทิ้งไป',
    artist: 'Only Monday',
    album: '-',
    duration: 364,
    musicUrl: 'https://www.youtube.com/watch?v=5W_Z-WY6rXU&ab_channel=GeneLab',
    createdDate: new Date('05/17/2022'),
  },
  {
    title: 'รอยยิ้ม',
    artist: 'scrubb',
    album: '-',
    duration: 300,
    musicUrl:
      'https://www.youtube.com/watch?v=czvDyFfVoVU&ab_channel=TEROMUSIC',
    createdDate: new Date('01/06/2014'),
  },
];

export async function main() {
  // create two dummy articles
  const count = await prisma.music.count();

  if (count) return;

  const musicsResponse = await prisma.music.createMany({
    data: musics,
  });

  console.log({ music: musicsResponse });
}

// execute the main function
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     // close Prisma Client at the end
//     await prisma.$disconnect();
//   });
