import { getPageById, updatePage, deletePage } from '../../../models/Page'; // Adjust the path accordingly

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const page = await getPageById(id);
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }
        res.status(200).json(page);
    } else if (req.method === 'PUT') {
        const { title, slug, content } = req.body;
        const updatedPage = await updatePage(id, title, slug, content);
        res.status(200).json(updatedPage);
    } else if (req.method === 'DELETE') {
        await deletePage(id);
        res.status(204).end(); // No content to send back
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}