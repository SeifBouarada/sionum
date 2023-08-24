import { Error, Post } from '../../interfaces';
import * as Dropbox from 'dropbox';
import dotenv from "dotenv";
dotenv.config();

const dbx = new Dropbox.Dropbox({
    clientId: process.env.DROPBOX_CLIENT_ID,
    clientSecret: process.env.DROPBOX_CLIENT_SECRET,
    refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
});

export const getPosts = async (date: string, slug: string, category: string) => {
    try {
        let filename;
        if (slug) {
            filename = `${slug}.json`;
        } else if (date) {
            const currentDateTime = new Date(date as string);
            const currentYear = currentDateTime.getFullYear();
            const currentMonth = currentDateTime.getMonth() + 1;
            const currentDay = currentDateTime.getDate();
            if (category) {
                filename = `stories-${category}-${currentYear}-${currentMonth}-${currentDay}.json`;
            } else {
                filename = `stories-${currentYear}-${currentMonth}-${currentDay}.json`;
            }
        }

        const res: any = await dbx.filesDownload({path: `/${filename}`});
        const data = JSON.parse(res.result.fileBinary.toString() as string) as Post[];
        return data;
    } catch (error) {
        throw typeof error === 'object' ? JSON.stringify(error) : error;
    }
}