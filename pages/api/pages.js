import { createPage, getPages } from '../../models/Page'; // Adjust the path accordingly

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const pages = await getPages();
        res.status(200).json(pages);
    } else if (req.method === 'POST') {
        const { title, slug, content } = req.body;
        const newPage = await createPage(title, slug, content);
        res.status(201).json(newPage);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}