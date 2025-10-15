import { connectDB } from '../loaders/db';
import Movie from '../models/Movie';
import Series from '../models/Series';
import Season from '../models/Season';
import Episode from '../models/Episode';


async function run() {
await connectDB();
await Movie.deleteMany({});
await Series.deleteMany({});
await Season.deleteMany({});
await Episode.deleteMany({});


const m = await Movie.create({ title: 'Inception', genres: ['sci-fi'], durationMin: 148, releaseDate: new Date('2010-07-16') });
const s = await Series.create({ title: 'Mr. Robot', genres: ['drama'], status: 'ended' });
const sea = await Season.create({ seriesId: s._id, seasonNo: 1, episodes: 10 });
await Episode.create({ seriesId: s._id, seasonId: sea._id, epNo: 1, title: 'eps1.0_hellofriend.mov', durationMin: 65 });
console.log('Seed done', { m: m.title, s: s.title });
process.exit(0);
}


run();