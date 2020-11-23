const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/download', async (req, res, next) => {
    console.log(req.query);

    const { url, type } = req.query;

    let title = 'title';

    await ytdl.getBasicInfo(url, { format: 'mp4' }).then((info) => {
        title = encodeURI(info.videoDetails.title);
    });

    if (type === 'video') {
        res.header('Content-Disposition', `attachment; filename=${title}.mp4`);
        ytdl(url, { format: 'mp4' }).pipe(res);
    } else if (type === 'mp3') {
        const audio = ytdl(url, {
            filter: 'audioonly',
            quality: 'highestaudio',
        });

        res.header('Content-Disposition', `attachment; filename=${title}.mp3`);

        ffmpeg(audio)
            .audioCodec('libmp3lame')
            .audioBitrate(128)
            .format('mp3')
            .on('error', (err) => console.log(err))
            .on('end', () => console.log('Finished'))
            .pipe(res, { end: true });
    }
});

module.exports = router;
